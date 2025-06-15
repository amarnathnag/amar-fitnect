
import { useState, useCallback } from 'react';
import { CartItem } from '@/types/cart';
import { calculateCartTotal, calculateCartCount } from '@/utils/cartCalculations';

export const useCartState = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const updateCartState = useCallback((newCart: CartItem[]) => {
    console.log('🔄 Updating cart state with', newCart.length, 'items');
    setCart(newCart);
  }, []);

  const updateItemQuantityInState = useCallback((productId: string, quantity: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  }, []);

  const removeItemFromState = useCallback((productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  }, []);

  const cartTotal = calculateCartTotal(cart);
  const cartCount = calculateCartCount(cart);

  return {
    cart,
    loading,
    setLoading,
    updateCartState,
    updateItemQuantityInState,
    removeItemFromState,
    cartTotal,
    cartCount
  };
};
