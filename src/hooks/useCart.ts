
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
    console.log('🛒 Fetching cart, user:', user ? 'authenticated' : 'guest');
    
    if (!user) {
      // Load guest cart from localStorage
      const guestCart = CartService.getGuestCart();
      console.log('📦 Guest cart loaded:', guestCart.length, 'items');
      updateCartState(guestCart);
      return;
    }

    try {
      setLoading(true);
      const cartItems = await CartService.fetchCartItems(user.id);
      console.log('📦 User cart loaded:', cartItems.length, 'items');
      updateCartState(cartItems);
    } catch (error) {
      console.error('❌ Error fetching cart:', error);
      updateCartState([]);
    } finally {
      setLoading(false);
    }
  }, [user, updateCartState, setLoading]);

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

  console.log('🛒 Cart summary - Items:', cart.length, 'Total: ₹', cartTotal, 'Count:', cartCount);

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
