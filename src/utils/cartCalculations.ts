
import { CartItem } from '@/types/cart';

export const calculateCartTotal = (cart: CartItem[]): number => {
  const total = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  console.log('💰 Cart total calculated:', total);
  return total;
};

export const calculateCartCount = (cart: CartItem[]): number => {
  const count = cart.reduce((count, item) => count + item.quantity, 0);
  console.log('🔢 Cart count calculated:', count);
  return count;
};

export const findExistingCartItem = (cart: CartItem[], productId: string): CartItem | undefined => {
  return cart.find(item => item.product.id === productId);
};
