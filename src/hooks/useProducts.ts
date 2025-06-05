
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UseProductsOptions {
  category?: string;
  search?: string;
  sortBy?: string;
  minHealthScore?: number;
  maxHealthScore?: number;
  isOrganic?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [options]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('products')
        .select('*')
        .eq('status', 'approved');

      // Apply filters
      if (options.category) {
        query = query.eq('category', options.category);
      }

      if (options.search) {
        query = query.or(`name.ilike.%${options.search}%,brand.ilike.%${options.search}%,description.ilike.%${options.search}%`);
      }

      if (options.minHealthScore) {
        query = query.gte('health_score', options.minHealthScore);
      }

      if (options.maxHealthScore) {
        query = query.lte('health_score', options.maxHealthScore);
      }

      if (options.isOrganic) {
        query = query.eq('is_organic', true);
      }

      if (options.isVegetarian) {
        query = query.eq('is_vegetarian', true);
      }

      if (options.isVegan) {
        query = query.eq('is_vegan', true);
      }

      // Apply sorting
      switch (options.sortBy) {
        case 'price_low':
          query = query.order('price', { ascending: true });
          break;
        case 'price_high':
          query = query.order('price', { ascending: false });
          break;
        case 'name':
          query = query.order('name', { ascending: true });
          break;
        case 'rating':
          query = query.order('user_rating', { ascending: false });
          break;
        default:
          query = query.order('health_score', { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to fetch products",
          variant: "destructive",
        });
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('category')
        .eq('status', 'approved');

      if (error) throw error;

      const uniqueCategories = [...new Set(data?.map(item => item.category) || [])];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return {
    products,
    categories,
    loading,
    refetch: fetchProducts
  };
};
