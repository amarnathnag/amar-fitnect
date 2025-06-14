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

// Updated dummy data: images set according to product description.
const dummyProducts = [
  {
    id: '1',
    name: 'Organic Protein Powder',
    brand: 'HealthyLife',
    price: 2999,
    health_score: 9,
    image_urls: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" // protein powder and supplements on table
    ],
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
    image_urls: [
      "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=400&q=80" // image of healthy grains/seeds
    ],
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
    image_urls: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80" // vitamin supplements/softgels
    ],
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
    image_urls: [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80" // almonds in a bowl
    ],
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
    image_urls: [
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&q=80" // yogurt bowl with spoon
    ],
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
    image_urls: [
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&q=80" // spinach leaves
    ],
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
    image_urls: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" // salmon fish, prepared dish
    ],
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
    image_urls: [
      "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=400&q=80" // blueberries close up
    ],
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
    image_urls: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80" // protein shaker and whey powder
    ],
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
    image_urls: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80" // coconut oil in glass jar & coconuts
    ],
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
