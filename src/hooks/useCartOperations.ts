
import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CartService } from '@/services/cartService';
import { findExistingCartItem } from '@/utils/cartCalculations';
import { CartItem } from '@/types/cart';

interface UseCartOperationsProps {
  cart: CartItem[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  updateCartState: (cart: CartItem[]) => void;
  updateItemQuantityInState: (productId: string, quantity: number) => void;
  removeItemFromState: (productId: string) => void;
  fetchCart: () => Promise<void>;
}

export const useCartOperations = ({
  cart,
  loading,
  setLoading,
  updateCartState,
  updateItemQuantityInState,
  removeItemFromState,
  fetchCart
}: UseCartOperationsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const addToCart = useCallback(async (product: any) => {
    if (!product || !product.id) {
      console.error('❌ Invalid product data');
      toast({
        title: "Error",
        description: "Invalid product data",
        variant: "destructive",
      });
      return;
    }

    console.log('🛒 Adding product to cart:', product.name);
    
    try {
      setLoading(true);

      if (!user) {
        // Handle guest cart
        console.log('👤 Adding to guest cart');
        CartService.addItemToGuestCart(product, 1);
        await fetchCart();
        
        toast({
          title: "Added to Cart! 🛒",
          description: `${product.name} added to cart`,
        });
        return;
      }

      // Check if item already exists in cart
      const existingItem = findExistingCartItem(cart, product.id);
      
      if (existingItem) {
        console.log('📈 Item exists, updating quantity');
        await updateQuantity(product.id, existingItem.quantity + 1);
      } else {
        console.log('➕ Adding new item to cart');
        await CartService.addItemToCart(user.id, product.id, 1);
        await fetchCart();
        
        toast({
          title: "Added to Cart! 🛒",
          description: `${product.name} added to cart`,
        });
      }
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, cart, setLoading, fetchCart, toast]);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    if (!productId || quantity < 0) {
      console.error('❌ Invalid update parameters');
      return;
    }

    try {
      console.log('🔄 Updating quantity:', productId, 'to', quantity);
      
      if (quantity === 0) {
        await removeFromCart(productId);
        return;
      }

      if (!user) {
        // Handle guest cart
        CartService.updateGuestCartQuantity(productId, quantity);
        updateItemQuantityInState(productId, quantity);
        return;
      }

      await CartService.updateItemQuantity(user.id, productId, quantity);
      updateItemQuantityInState(productId, quantity);
      
      console.log('✅ Quantity updated successfully');
    } catch (error) {
      console.error('❌ Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
      });
    }
  }, [user, updateItemQuantityInState, removeFromCart, toast]);

  const removeFromCart = useCallback(async (productId: string) => {
    if (!productId) {
      console.error('❌ Invalid product ID for removal');
      return;
    }

    try {
      console.log('🗑️ Removing item from cart:', productId);
      
      if (!user) {
        // Handle guest cart
        CartService.removeItemFromGuestCart(productId);
      } else {
        await CartService.removeItemFromCart(user.id, productId);
      }
      
      removeItemFromState(productId);

      toast({
        title: "Removed from Cart",
        description: "Item removed successfully",
      });
      
      console.log('✅ Item removed successfully');
    } catch (error) {
      console.error('❌ Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      });
    }
  }, [user, removeItemFromState, toast]);

  return {
    addToCart,
    updateQuantity,
    removeFromCart
  };
};
