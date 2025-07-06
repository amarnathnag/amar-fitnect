
import { CartItem } from '@/types/cart';

export const calculateCartTotal = (cart: CartItem[]): number => {
  const total = cart.reduce((total, item) => {
    // Ensure we're working with proper numbers and handle price conversion
    const price = typeof item.product.price === 'string' ? parseFloat(item.product.price) : item.product.price;
    const quantity = typeof item.quantity === 'string' ? parseInt(item.quantity) : item.quantity;
    
    // Convert price from paise to rupees if it's a large number (> 1000)
    const actualPrice = price > 1000 ? price / 100 : price;
    
    return total + (actualPrice * quantity);
  }, 0);
  
  console.log('💰 Raw cart total calculated:', total);
  return Math.round(total * 100) / 100; // Round to 2 decimal places
};

export const calculateCartCount = (cart: CartItem[]): number => {
  const count = cart.reduce((count, item) => {
    const quantity = typeof item.quantity === 'string' ? parseInt(item.quantity) : item.quantity;
    return count + quantity;
  }, 0);
  console.log('🔢 Cart count calculated:', count);
  return count;
};

export const findExistingCartItem = (cart: CartItem[], productId: string): CartItem | undefined => {
  return cart.find(item => item.product.id === productId);
};

export const formatPrice = (price: number): string => {
  // Convert from paise to rupees if price is in paise format (> 1000)
  const displayPrice = price > 1000 ? price / 100 : price;
  return displayPrice.toFixed(2);
};
