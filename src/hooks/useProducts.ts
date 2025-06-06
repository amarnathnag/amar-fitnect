
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

// Fallback dummy data when Supabase fails
const dummyProducts = [
  {
    id: '1',
    name: 'Organic Protein Powder',
    brand: 'HealthyLife',
    price: 2999,
    health_score: 9,
    image_urls: ['/placeholder.svg'],
    health_impact_summary: 'High protein content supports muscle building and recovery',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 50,
    category: 'supplements',
    subcategory: 'protein'
  },
  {
    id: '2',
    name: 'Fresh Quinoa',
    brand: 'OrganicFarms',
    price: 599,
    health_score: 8,
    image_urls: ['/placeholder.svg'],
    health_impact_summary: 'Complete protein grain with essential amino acids',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 30,
    category: 'grains',
    subcategory: 'whole_grains'
  },
  {
    id: '3',
    name: 'Vitamin D3 Supplements',
    brand: 'WellnessPro',
    price: 899,
    health_score: 9,
    image_urls: ['/placeholder.svg'],
    health_impact_summary: 'Essential for bone health and immune system support',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 75,
    category: 'supplements',
    subcategory: 'vitamins'
  }
];

const dummyCategories = ['supplements', 'grains', 'fruits', 'vegetables', 'dairy'];

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
        .eq('status', 'active');

      // Apply filters
      if (options.category) {
        query = query.eq('category', options.category as any);
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
        // Use dummy data as fallback
        setProducts(dummyProducts);
        toast({
          title: "Using Demo Data",
          description: "Showing sample products (database connection issue)",
          variant: "default",
        });
        return;
      }

      setProducts(data || dummyProducts);
    } catch (error) {
      console.error('Error:', error);
      // Use dummy data as fallback
      setProducts(dummyProducts);
      toast({
        title: "Using Demo Data",
        description: "Showing sample products",
        variant: "default",
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
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching categories:', error);
        setCategories(dummyCategories);
        return;
      }

      const uniqueCategories = [...new Set(data?.map(item => item.category) || [])];
      setCategories(uniqueCategories.length > 0 ? uniqueCategories : dummyCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories(dummyCategories);
    }
  };

  return {
    products,
    categories,
    loading,
    refetch: fetchProducts
  };
};
