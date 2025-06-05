
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) return;

    try {
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

      setCart(data?.map(item => ({
        id: item.id,
        product: item.product as any,
        quantity: item.quantity
      })) || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (product: any) => {
    if (!user) {
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

      if (existingItem) {
        await updateQuantity(product.id, existingItem.quantity + 1);
      } else {
        const { error } = await supabase
          .from('shopping_cart')
          .insert([{
            user_id: user.id,
            product_id: product.id,
            quantity: 1
          }]);

        if (error) throw error;

        await fetchCart();
        toast({
          title: "Added to Cart",
          description: `${product.name} added to cart`,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
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

      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
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
      const { error } = await supabase
        .from('shopping_cart')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      await fetchCart();
      toast({
        title: "Removed from Cart",
        description: "Item removed from cart",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

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
