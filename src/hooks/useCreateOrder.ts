import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useCreateOrder = () => {
  const { toast } = useToast();

  const createOrder = useCallback(async (orderData: {
    total_amount: number;
    delivery_address: any;
    cart: any[];
    coupon_discount?: number;
  }) => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session?.user?.id) {
      throw new Error('User not authenticated');
    }

    try {
      const userId = sessionData.session.user.id;
      console.log('📝 Creating order:', orderData);

      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: userId,
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
        .eq('user_id', userId);

      if (clearCartError) {
        console.error('⚠️ Warning: Failed to clear cart:', clearCartError);
      }

      return order;
    } catch (error) {
      console.error('❌ Error creating order:', error);
      throw error;
    }
  }, [toast]);

  return { createOrder };
};