
import { CartItem } from '@/types/cart';

export const calculateCartTotal = (cart: CartItem[]): number => {
  if (!cart || cart.length === 0) {
    console.log('💰 Empty cart, total: 0');
    return 0;
  }

  const total = cart.reduce((total, item) => {
    if (!item || !item.product) {
      console.warn('⚠️ Invalid cart item found');
      return total;
    }

    // Ensure we're working with proper numbers
    const price = typeof item.product.price === 'string' ? parseFloat(item.product.price) : item.product.price;
    const quantity = typeof item.quantity === 'string' ? parseInt(item.quantity) : item.quantity;
    
    // Validate numbers
    if (isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0) {
      console.warn('⚠️ Invalid price or quantity:', { price, quantity });
      return total;
    }
    
    // Price is already in rupees, no conversion needed
    const itemTotal = price * quantity;
    console.log(`💰 Item: ${item.product.name}, Price: ₹${price}, Qty: ${quantity}, Total: ₹${itemTotal}`);
    
    return total + itemTotal;
  }, 0);
  
  console.log('💰 Cart total calculated:', total);
  return Math.round(total * 100) / 100; // Round to 2 decimal places
};

export const calculateCartCount = (cart: CartItem[]): number => {
  if (!cart || cart.length === 0) {
    return 0;
  }

  const count = cart.reduce((count, item) => {
    if (!item) return count;
    
    const quantity = typeof item.quantity === 'string' ? parseInt(item.quantity) : item.quantity;
    return count + (isNaN(quantity) ? 0 : quantity);
  }, 0);
  
  console.log('🔢 Cart count calculated:', count);
  return count;
};

export const findExistingCartItem = (cart: CartItem[], productId: string): CartItem | undefined => {
  if (!cart || !productId) return undefined;
  return cart.find(item => item?.product?.id === productId);
};

export const formatPrice = (price: number): string => {
  if (isNaN(price) || price < 0) {
    return '0.00';
  }
  
  // Price is already in rupees format
  return price.toFixed(2);
};
