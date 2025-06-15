
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_per_item: number;
  product: {
    id: string;
    name: string;
    brand: string;
    image_urls: string[];
  };
}

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  delivery_address: any;
  status: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchOrders = async () => {
    if (!user) {
      console.log('No user found, cannot fetch orders');
      return;
    }

    try {
      setLoading(true);
      console.log('🔍 Fetching orders for user:', user.id);

      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          user_id,
          total_amount,
          delivery_address,
          status,
          created_at,
          updated_at,
          order_items (
            id,
            order_id,
            product_id,
            quantity,
            price_per_item,
            product:product_id (
              id,
              name,
              brand,
              image_urls
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching orders:', error);
        throw error;
      }

      console.log('✅ Orders fetched successfully:', data?.length || 0, 'orders');
      setOrders(data || []);
    } catch (error) {
      console.error('❌ Failed to fetch orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your orders. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: {
    total_amount: number;
    delivery_address: any;
    cart: any[];
  }) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      console.log('📝 Creating order:', orderData);

      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          total_amount: orderData.total_amount,
          delivery_address: orderData.delivery_address,
          status: 'pending'
        }])
        .select()
        .single();

      if (orderError) {
        console.error('❌ Order creation error:', orderError);
        throw orderError;
      }

      console.log('✅ Order created:', order);

      // Create order items
      const orderItems = orderData.cart.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price_per_item: item.product.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('❌ Order items creation error:', itemsError);
        throw itemsError;
      }

      console.log('✅ Order items created successfully');

      // Clear the cart
      const { error: clearCartError } = await supabase
        .from('shopping_cart')
        .delete()
        .eq('user_id', user.id);

      if (clearCartError) {
        console.error('⚠️ Warning: Failed to clear cart:', clearCartError);
        // Don't throw here as order is already created
      }

      // Refresh orders
      await fetchOrders();

      return order;
    } catch (error) {
      console.error('❌ Error creating order:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  return {
    orders,
    loading,
    fetchOrders,
    createOrder,
    refetch: fetchOrders
  };
};
