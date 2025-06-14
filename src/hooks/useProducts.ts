
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { productCategories } from '@/data/productCategories';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  health_score: number;
  image_urls: string[];
  health_impact_summary: string;
  is_organic: boolean;
  is_vegetarian: boolean;
  is_vegan: boolean;
  stock_quantity: number;
  category: string;
  subcategory: string;
  description?: string;
  user_rating?: number;
  review_count?: number;
}

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

// Map our application categories to database enum values
const categoryToDbMapping: Record<string, string> = {
  'dairy': 'food',
  'bakery': 'food',
  'beverages': 'food',
  'snacks': 'food',
  'grains': 'food',
  'oils': 'food',
  'spices': 'food',
  'frozen': 'food',
  'personal_care': 'wellness',
  'household': 'wellness',
  'supplements': 'supplements'
};

export const useProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      if (!isMounted) return;

      try {
        setLoading(true);
        
        console.log('Fetching products from Supabase with options:', options);
        
        // Build the query
        let query = supabase
          .from('products')
          .select('*')
          .eq('status', 'active');

        // Apply category filter using subcategory for more specific filtering
        if (options.category && options.category !== 'all' && options.category !== 'food') {
          // Use subcategory filtering which should match our app categories better
          query = query.eq('subcategory', options.category);
        }

        // Apply search filter
        if (options.search) {
          query = query.or(`name.ilike.%${options.search}%,brand.ilike.%${options.search}%,description.ilike.%${options.search}%`);
        }

        // Apply health score filters
        if (options.minHealthScore !== undefined) {
          query = query.gte('health_score', options.minHealthScore);
        }

        if (options.maxHealthScore !== undefined) {
          query = query.lte('health_score', options.maxHealthScore);
        }

        // Apply dietary preference filters
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
        const sortBy = options.sortBy || 'health_score';
        switch (sortBy) {
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
          throw error;
        }

        console.log('Fetched products from Supabase:', data?.length || 0);

        if (isMounted) {
          setProducts(data || []);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        if (isMounted) {
          toast({
            title: "Error",
            description: "Failed to fetch products",
            variant: "destructive",
          });
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const fetchCategories = async () => {
      if (isMounted) {
        setCategories(productCategories);
      }
    };

    fetchProducts();
    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [options.category, options.search, options.sortBy, options.minHealthScore, options.maxHealthScore, options.isOrganic, options.isVegetarian, options.isVegan, toast]);

  const refetch = () => {
    // Trigger re-fetch by updating a dependency - we can just call the effect again
    setLoading(true);
  };

  return {
    products,
    categories,
    loading,
    refetch
  };
};
