
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
    console.log('🛒 Adding product to cart:', product.name);
    
    if (!user) {
      console.log('❌ User not logged in');
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const existingItem = findExistingCartItem(cart, product.id);
      console.log('🔍 Checking existing item:', existingItem ? 'Found' : 'Not found');

      if (existingItem) {
        console.log('📈 Updating quantity for existing item');
        await updateQuantity(product.id, existingItem.quantity + 1);
      } else {
        console.log('➕ Adding new item to cart');
        await CartService.addItemToCart(user.id, product.id, 1);
        await fetchCart();
        console.log('✅ Product added to cart successfully');
        toast({
          title: "Added to Cart",
          description: `${product.name} added to cart`,
        });
      }
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, cart, setLoading, fetchCart, toast]);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    if (!user) return;

    try {
      console.log('🔄 Updating quantity:', productId, 'to', quantity);
      
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      await CartService.updateItemQuantity(user.id, productId, quantity);
      updateItemQuantityInState(productId, quantity);
      console.log('✅ Quantity updated successfully');
    } catch (error) {
      console.error('❌ Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  }, [user, updateItemQuantityInState, toast]);

  const removeFromCart = useCallback(async (productId: string) => {
    if (!user) return;

    try {
      console.log('🗑️ Removing item from cart:', productId);
      
      await CartService.removeItemFromCart(user.id, productId);
      removeItemFromState(productId);

      console.log('✅ Item removed from cart successfully');
      toast({
        title: "Removed from Cart",
        description: "Item removed from cart",
      });
    } catch (error) {
      console.error('❌ Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item",
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
