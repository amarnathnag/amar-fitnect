
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { productCategories } from '@/data/productCategories';
import { sampleProducts } from '@/data/sampleProducts';

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
  quantity_options?: Array<{
    value: number;
    unit: string;
    price: number;
  }>;
  warnings?: string[];
  allergens?: string[];
  ingredients?: string[];
  nutritional_info?: Record<string, any>;
  // Database-specific fields (optional for sample data)
  admin_notes?: string;
  auto_health_score?: number;
  created_at?: string;
  updated_at?: string;
  manual_override?: boolean;
  seller_id?: string;
  status?: string;
  workflow_status?: string;
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

const categoryToDbMapping: Record<string, 'supplements' | 'food' | 'fitness_gear' | 'wellness'> = {
  'dairy': 'food',
  'bakery': 'food',
  'beverages': 'food',
  'snacks': 'food',
  'grains': 'food',
  'oils': 'food',
  'spices': 'food',
  'frozen': 'food',
  'protein': 'food',
  'breakfast': 'food',
  'sweeteners': 'food',
  'personal_care': 'wellness',
  'household': 'wellness',
  'supplements': 'supplements'
};

// Helper function to convert database products to our Product interface
const convertDbProductToProduct = (dbProduct: any): Product => {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    brand: dbProduct.brand,
    price: Number(dbProduct.price),
    health_score: dbProduct.health_score,
    image_urls: Array.isArray(dbProduct.image_urls) ? dbProduct.image_urls : [],
    health_impact_summary: dbProduct.health_impact_summary || '',
    is_organic: dbProduct.is_organic || false,
    is_vegetarian: dbProduct.is_vegetarian || false,
    is_vegan: dbProduct.is_vegan || false,
    stock_quantity: dbProduct.stock_quantity || 0,
    category: dbProduct.category,
    subcategory: dbProduct.subcategory || '',
    description: dbProduct.description,
    user_rating: dbProduct.user_rating ? Number(dbProduct.user_rating) : undefined,
    review_count: dbProduct.review_count,
    allergens: Array.isArray(dbProduct.allergens) ? dbProduct.allergens : [],
    ingredients: Array.isArray(dbProduct.ingredients) ? dbProduct.ingredients : [],
    nutritional_info: typeof dbProduct.nutritional_info === 'object' ? dbProduct.nutritional_info : undefined,
    admin_notes: dbProduct.admin_notes,
    auto_health_score: dbProduct.auto_health_score,
    created_at: dbProduct.created_at,
    updated_at: dbProduct.updated_at,
    manual_override: dbProduct.manual_override,
    seller_id: dbProduct.seller_id,
    status: dbProduct.status,
    workflow_status: dbProduct.workflow_status
  };
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

        // Apply category filter
        if (options.category && options.category !== 'all') {
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

        console.log('Fetched products from Supabase:', data?.length || 0, 'products');

        // If no products in database, use sample data for demo
        let productsToUse: Product[] = [];
        
        if (data && data.length > 0) {
          // Convert database products to our Product interface
          productsToUse = data.map(convertDbProductToProduct);
        } else {
          console.log('No products in database, using sample data');
          productsToUse = sampleProducts.filter(product => {
            // Apply the same filters to sample data
            if (options.category && options.category !== 'all' && options.category !== product.subcategory) {
              return false;
            }
            if (options.search) {
              const searchLower = options.search.toLowerCase();
              if (!product.name.toLowerCase().includes(searchLower) && 
                  !product.brand.toLowerCase().includes(searchLower) &&
                  !product.description?.toLowerCase().includes(searchLower)) {
                return false;
              }
            }
            if (options.minHealthScore && product.health_score < options.minHealthScore) {
              return false;
            }
            if (options.maxHealthScore && product.health_score > options.maxHealthScore) {
              return false;
            }
            if (options.isOrganic && !product.is_organic) {
              return false;
            }
            if (options.isVegetarian && !product.is_vegetarian) {
              return false;
            }
            if (options.isVegan && !product.is_vegan) {
              return false;
            }
            return true;
          });

          // Apply sorting to sample data
          switch (sortBy) {
            case 'price_low':
              productsToUse.sort((a, b) => a.price - b.price);
              break;
            case 'price_high':
              productsToUse.sort((a, b) => b.price - a.price);
              break;
            case 'name':
              productsToUse.sort((a, b) => a.name.localeCompare(b.name));
              break;
            default:
              productsToUse.sort((a, b) => b.health_score - a.health_score);
          }
        }

        if (isMounted) {
          setProducts(productsToUse);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        if (isMounted) {
          // On error, fall back to sample data
          console.log('Error fetching from database, using sample data as fallback');
          setProducts(sampleProducts);
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
    setLoading(true);
  };

  return {
    products,
    categories,
    loading,
    refetch
  };
};
