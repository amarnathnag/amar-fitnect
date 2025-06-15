
import { useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { CartService } from '@/services/cartService';
import { useCartState } from '@/hooks/useCartState';
import { useCartOperations } from '@/hooks/useCartOperations';
import { UseCartReturn } from '@/types/cart';

export const useCart = (): UseCartReturn => {
  const { user } = useAuth();
  const {
    cart,
    loading,
    setLoading,
    updateCartState,
    updateItemQuantityInState,
    removeItemFromState,
    cartTotal,
    cartCount
  } = useCartState();

  const fetchCart = useCallback(async () => {
    if (!user) {
      updateCartState([]);
      return;
    }

    try {
      const cartItems = await CartService.fetchCartItems(user.id);
      updateCartState(cartItems);
    } catch (error) {
      console.error('❌ Error fetching cart:', error);
      updateCartState([]);
    }
  }, [user, updateCartState]);

  const { addToCart, updateQuantity, removeFromCart } = useCartOperations({
    cart,
    loading,
    setLoading,
    updateCartState,
    updateItemQuantityInState,
    removeItemFromState,
    fetchCart
  });

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  console.log('🛒 Cart stats - Total:', cartTotal, 'Count:', cartCount);

  return {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    refetch: fetchCart
  };
};
