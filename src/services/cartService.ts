
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

    if (error) {
      console.error('❌ Error fetching cart:', error);
      return [];
    }

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
    
    // Check if item already exists
    const { data: existingItem } = await supabase
      .from('shopping_cart')
      .select('id, quantity')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (existingItem) {
      // Update existing item quantity
      const { error } = await supabase
        .from('shopping_cart')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id);
      
      if (error) throw error;
    } else {
      // Insert new item
      const { error } = await supabase
        .from('shopping_cart')
        .insert([{
          user_id: userId,
          product_id: productId,
          quantity
        }]);
      
      if (error) throw error;
    }
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

  // Allow guest cart management using localStorage
  static getGuestCart(): CartItem[] {
    try {
      const guestCart = localStorage.getItem('guestCart');
      return guestCart ? JSON.parse(guestCart) : [];
    } catch {
      return [];
    }
  }

  static setGuestCart(cart: CartItem[]): void {
    try {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    } catch (error) {
      console.error('❌ Error saving guest cart:', error);
    }
  }

  static addItemToGuestCart(product: any, quantity: number = 1): void {
    const guestCart = this.getGuestCart();
    const existingItem = guestCart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      guestCart.push({
        id: `guest-${Date.now()}`,
        product,
        quantity
      });
    }

    this.setGuestCart(guestCart);
  }

  static updateGuestCartQuantity(productId: string, quantity: number): void {
    const guestCart = this.getGuestCart();
    const itemIndex = guestCart.findIndex(item => item.product.id === productId);

    if (itemIndex !== -1) {
      if (quantity <= 0) {
        guestCart.splice(itemIndex, 1);
      } else {
        guestCart[itemIndex].quantity = quantity;
      }
      this.setGuestCart(guestCart);
    }
  }

  static removeItemFromGuestCart(productId: string): void {
    const guestCart = this.getGuestCart();
    const filteredCart = guestCart.filter(item => item.product.id !== productId);
    this.setGuestCart(filteredCart);
  }

  static clearGuestCart(): void {
    localStorage.removeItem('guestCart');
  }
}
