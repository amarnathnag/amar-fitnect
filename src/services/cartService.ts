
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types/cart';

export class CartService {
  static async fetchCartItems(userId: string): Promise<CartItem[]> {
    console.log('🛒 Fetching cart for user:', userId);
    
    const { data, error } = await supabase
      .from('shopping_cart')
      .select(`
        id,
        quantity,
        product:product_id (
          id,
          name,
          brand,
          price,
          image_urls,
          stock_quantity
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;

    const cartItems = data?.map(item => ({
      id: item.id,
      product: item.product as any,
      quantity: item.quantity
    })) || [];

    console.log('🛒 Cart fetched successfully:', cartItems.length, 'items');
    return cartItems;
  }

  static async addItemToCart(userId: string, productId: string, quantity: number = 1): Promise<void> {
    console.log('➕ Adding new item to cart');
    
    const { error } = await supabase
      .from('shopping_cart')
      .insert([{
        user_id: userId,
        product_id: productId,
        quantity
      }]);

    if (error) throw error;
  }

  static async updateItemQuantity(userId: string, productId: string, quantity: number): Promise<void> {
    console.log('🔄 Updating quantity:', productId, 'to', quantity);
    
    const { error } = await supabase
      .from('shopping_cart')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) throw error;
  }

  static async removeItemFromCart(userId: string, productId: string): Promise<void> {
    console.log('🗑️ Removing item from cart:', productId);
    
    const { error } = await supabase
      .from('shopping_cart')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) throw error;
  }
}
