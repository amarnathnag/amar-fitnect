
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
    if (!user?.id) {
      console.log('No authenticated user found, cannot fetch orders');
      setOrders([]);
      return;
    }

    try {
      setLoading(true);
      console.log('🔍 Fetching orders for user:', user.id);

      // First, fetch orders without any joins
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('❌ Error fetching orders:', ordersError);
        // Don't show error for no orders found
        if (ordersError.code !== 'PGRST116') {
          toast({
            title: "Error",
            description: "Failed to fetch your orders. Please try again.",
            variant: "destructive",
          });
        }
        setOrders([]);
        return;
      }

      console.log('✅ Orders fetched:', ordersData?.length || 0);

      if (!ordersData || ordersData.length === 0) {
        setOrders([]);
        return;
      }

      // Fetch order items for each order
      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          try {
            // Get order items
            const { data: itemsData, error: itemsError } = await supabase
              .from('order_items')
              .select('*')
              .eq('order_id', order.id);

            if (itemsError) {
              console.error('❌ Error fetching order items:', itemsError);
              return {
                ...order,
                order_items: []
              };
            }

            // Get product details for each item
            const itemsWithProducts = await Promise.all(
              (itemsData || []).map(async (item) => {
                try {
                  const { data: productData, error: productError } = await supabase
                    .from('products')
                    .select('id, name, brand, image_urls')
                    .eq('id', item.product_id)
                    .single();

                  if (productError) {
                    console.error('❌ Error fetching product:', productError);
                    return {
                      ...item,
                      product: {
                        id: item.product_id,
                        name: 'Product not found',
                        brand: 'Unknown',
                        image_urls: []
                      }
                    };
                  }

                  return {
                    ...item,
                    product: productData || {
                      id: item.product_id,
                      name: 'Product not found',
                      brand: 'Unknown',
                      image_urls: []
                    }
                  };
                } catch (error) {
                  console.error('❌ Error processing product:', error);
                  return {
                    ...item,
                    product: {
                      id: item.product_id,
                      name: 'Product not found',
                      brand: 'Unknown',
                      image_urls: []
                    }
                  };
                }
              })
            );

            return {
              ...order,
              order_items: itemsWithProducts
            };
          } catch (error) {
            console.error('❌ Error processing order:', error);
            return {
              ...order,
              order_items: []
            };
          }
        })
      );

      console.log('✅ Orders with items fetched successfully:', ordersWithItems.length);
      setOrders(ordersWithItems);
    } catch (error) {
      console.error('❌ Failed to fetch orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: {
    total_amount: number;
    delivery_address: any;
    cart: any[];
    coupon_discount?: number;
  }) => {
    if (!user?.id) {
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
    if (user?.id) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user?.id]);

  return {
    orders,
    loading,
    fetchOrders,
    createOrder,
    refetch: fetchOrders
  };
};
