
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

// Expanded dummy data with more products and categories
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
  },
  {
    id: '4',
    name: 'Organic Almonds',
    brand: 'NutriNuts',
    price: 1299,
    health_score: 8,
    image_urls: ['/placeholder.svg'],
    health_impact_summary: 'Rich in healthy fats and vitamin E for heart health',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 40,
    category: 'nuts',
    subcategory: 'tree_nuts'
  },
  {
    id: '5',
    name: 'Greek Yogurt',
    brand: 'DairyFresh',
    price: 299,
    health_score: 7,
    image_urls: ['/placeholder.svg'],
    health_impact_summary: 'High protein probiotics for digestive health',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 25,
    category: 'dairy',
    subcategory: 'yogurt'
  },
  {
    id: '6',
    name: 'Organic Spinach',
    brand: 'GreenLeaf',
    price: 199,
    health_score: 9,
    image_urls: ['/placeholder.svg'],
    health_impact_summary: 'Packed with iron and vitamins for energy',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 60,
    category: 'vegetables',
    subcategory: 'leafy_greens'
  },
  {
    id: '7',
    name: 'Wild Salmon',
    brand: 'OceanFresh',
    price: 1899,
    health_score: 8,
    image_urls: ['/placeholder.svg'],
    health_impact_summary: 'Omega-3 fatty acids for brain and heart health',
    is_organic: false,
    is_vegetarian: false,
    is_vegan: false,
    stock_quantity: 20,
    category: 'seafood',
    subcategory: 'fish'
  },
  {
    id: '8',
    name: 'Organic Blueberries',
    brand: 'BerryBest',
    price: 699,
    health_score: 9,
    image_urls: ['/placeholder.svg'],
    health_impact_summary: 'Antioxidants for brain health and anti-aging',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 35,
    category: 'fruits',
    subcategory: 'berries'
  },
  {
    id: '9',
    name: 'Whey Protein',
    brand: 'FitPower',
    price: 3499,
    health_score: 8,
    image_urls: ['/placeholder.svg'],
    health_impact_summary: 'Fast-absorbing protein for muscle recovery',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 45,
    category: 'supplements',
    subcategory: 'protein'
  },
  {
    id: '10',
    name: 'Coconut Oil',
    brand: 'TropicalGold',
    price: 799,
    health_score: 7,
    image_urls: ['/placeholder.svg'],
    health_impact_summary: 'Healthy fats for cooking and skin health',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 55,
    category: 'oils',
    subcategory: 'cooking_oils'
  }
];

const dummyCategories = ['supplements', 'grains', 'nuts', 'dairy', 'vegetables', 'seafood', 'fruits', 'oils'];

export const useProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      if (!isMounted) return;

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
          // Filter dummy data based on options
          let filteredProducts = [...dummyProducts];
          
          if (options.category) {
            filteredProducts = filteredProducts.filter(p => p.category === options.category);
          }
          
          if (options.search) {
            const searchLower = options.search.toLowerCase();
            filteredProducts = filteredProducts.filter(p => 
              p.name.toLowerCase().includes(searchLower) || 
              p.brand.toLowerCase().includes(searchLower)
            );
          }

          if (isMounted) {
            setProducts(filteredProducts);
            toast({
              title: "Using Demo Data",
              description: "Showing sample products (database connection issue)",
              variant: "default",
            });
          }
          return;
        }

        if (isMounted) {
          setProducts(data || dummyProducts);
        }
      } catch (error) {
        console.error('Error:', error);
        if (isMounted) {
          setProducts(dummyProducts);
          toast({
            title: "Using Demo Data",
            description: "Showing sample products",
            variant: "default",
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
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
          if (isMounted) {
            setCategories(dummyCategories);
          }
          return;
        }

        const uniqueCategories = [...new Set(data?.map(item => item.category) || [])];
        if (isMounted) {
          setCategories(uniqueCategories.length > 0 ? uniqueCategories : dummyCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        if (isMounted) {
          setCategories(dummyCategories);
        }
      }
    };

    fetchProducts();
    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [options.category, options.search, options.sortBy, options.minHealthScore, options.maxHealthScore, options.isOrganic, options.isVegetarian, options.isVegan]);

  return {
    products,
    categories,
    loading,
    refetch: () => {
      // Trigger re-fetch by updating a dependency
    }
  };
};
