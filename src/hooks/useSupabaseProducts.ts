
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Product, UseProductsOptions } from '@/types/product';
import { categoryToDbMapping, convertDbProductToProduct } from '@/utils/productMapping';

export const useSupabaseProducts = (options: UseProductsOptions) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      if (!isMounted) return;

      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching products from Supabase with options:', options);
        
        // Build the query
        let query = supabase
          .from('products')
          .select('*')
          .eq('status', 'active');

        // Apply category filter with enhanced search support
        if (options.enhancedSearch) {
          // Use the enhanced search category
          const category = options.enhancedSearch.category;
          const enumCategories = ['supplements', 'food', 'fitness_gear', 'wellness'] as const;
          if (enumCategories.includes(category as any)) {
            query = query.eq('category', category as 'supplements' | 'food' | 'fitness_gear' | 'wellness');
          }
        } else if (options.category && options.category !== 'all') {
          const dbCategory = categoryToDbMapping[options.category];
          
          console.log('Category filter:', options.category, 'DB Category:', dbCategory);
          
          if (dbCategory) {
            query = query.eq('category', dbCategory);
          } else {
            const enumCategories = ['supplements', 'food', 'fitness_gear', 'wellness'];
            if (enumCategories.includes(options.category)) {
              query = query.eq('category', options.category as 'supplements' | 'food' | 'fitness_gear' | 'wellness');
            } else {
              query = query.eq('subcategory', options.category);
            }
          }
        }

        // Apply search filter - skip if using enhanced search (handled client-side)
        if (options.search && !options.enhancedSearch) {
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

        console.log('Fetched products from Supabase:', data?.length || 0, 'products');

        if (isMounted) {
          const convertedProducts = data ? data.map(convertDbProductToProduct) : [];
          setProducts(convertedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        if (isMounted) {
          setError('Failed to fetch products from database');
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [options.category, options.search, options.sortBy, options.minHealthScore, options.maxHealthScore, options.isOrganic, options.isVegetarian, options.isVegan, options.enhancedSearch, toast]);

  return {
    products,
    loading,
    error
  };
};
