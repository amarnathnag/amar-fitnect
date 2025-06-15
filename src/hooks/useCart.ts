
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    image_urls: string[];
    stock_quantity: number;
  };
  quantity: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart([]);
      return;
    }

    try {
      console.log('🛒 Fetching cart for user:', user.id);
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
        .eq('user_id', user.id);

      if (error) throw error;

      const cartItems = data?.map(item => ({
        id: item.id,
        product: item.product as any,
        quantity: item.quantity
      })) || [];

      console.log('🛒 Cart fetched successfully:', cartItems.length, 'items');
      setCart(cartItems);
    } catch (error) {
      console.error('❌ Error fetching cart:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (product: any) => {
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

      // Check if item already exists in cart
      const existingItem = cart.find(item => item.product.id === product.id);
      console.log('🔍 Checking existing item:', existingItem ? 'Found' : 'Not found');

      if (existingItem) {
        // Update quantity if item exists
        console.log('📈 Updating quantity for existing item');
        await updateQuantity(product.id, existingItem.quantity + 1);
      } else {
        // Add new item to cart
        console.log('➕ Adding new item to cart');
        const { error } = await supabase
          .from('shopping_cart')
          .insert([{
            user_id: user.id,
            product_id: product.id,
            quantity: 1
          }]);

        if (error) throw error;

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
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return;

    try {
      console.log('🔄 Updating quantity:', productId, 'to', quantity);
      
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      const { error } = await supabase
        .from('shopping_cart')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      // Update local state immediately for better UX
      setCart(prevCart => 
        prevCart.map(item => 
          item.product.id === productId 
            ? { ...item, quantity }
            : item
        )
      );

      console.log('✅ Quantity updated successfully');
    } catch (error) {
      console.error('❌ Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;

    try {
      console.log('🗑️ Removing item from cart:', productId);
      
      const { error } = await supabase
        .from('shopping_cart')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      // Update local state immediately
      setCart(prevCart => prevCart.filter(item => item.product.id !== productId));

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
  };

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

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
