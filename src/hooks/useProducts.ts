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

// Expanded dummy data with more products and detailed information
const dummyProducts = [
  {
    id: '1',
    name: 'Organic Whey Protein Powder',
    brand: 'HealthyLife',
    price: 2999,
    health_score: 9,
    image_urls: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'High-quality protein supports muscle building, recovery, and weight management',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 50,
    category: 'supplements',
    subcategory: 'protein',
    description: 'Premium organic whey protein isolate with 25g protein per serving. Perfect for post-workout recovery and muscle building.',
    user_rating: 4.8,
    review_count: 1250
  },
  {
    id: '2',
    name: 'Fresh Organic Quinoa',
    brand: 'OrganicFarms',
    price: 599,
    health_score: 9,
    image_urls: [
      "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'Complete protein grain with all essential amino acids and fiber',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 30,
    category: 'grains',
    subcategory: 'whole_grains',
    description: 'Premium organic quinoa from Peru. Rich in protein, fiber, and minerals. Gluten-free superfood.',
    user_rating: 4.7,
    review_count: 890
  },
  {
    id: '3',
    name: 'Vitamin D3 + K2 Capsules',
    brand: 'WellnessPro',
    price: 899,
    health_score: 9,
    image_urls: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'Essential for bone health, immune system, and calcium absorption',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 75,
    category: 'supplements',
    subcategory: 'vitamins',
    description: '5000 IU Vitamin D3 with K2 for optimal calcium absorption and bone health.',
    user_rating: 4.6,
    review_count: 650
  },
  {
    id: '4',
    name: 'Raw Organic Almonds',
    brand: 'NutriNuts',
    price: 1299,
    health_score: 8,
    image_urls: [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'Rich in healthy fats, vitamin E, magnesium for heart and brain health',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 40,
    category: 'nuts',
    subcategory: 'tree_nuts',
    description: 'Premium raw organic almonds. High in protein, healthy fats, and antioxidants.',
    user_rating: 4.5,
    review_count: 420
  },
  {
    id: '5',
    name: 'Greek Yogurt Probiotic',
    brand: 'DairyFresh',
    price: 299,
    health_score: 7,
    image_urls: [
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'High protein probiotics for digestive health and muscle recovery',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 25,
    category: 'dairy',
    subcategory: 'yogurt',
    description: 'Thick Greek yogurt with live probiotics. 20g protein per serving.',
    user_rating: 4.3,
    review_count: 280
  },
  {
    id: '6',
    name: 'Baby Spinach Organic',
    brand: 'GreenLeaf',
    price: 199,
    health_score: 10,
    image_urls: [
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'Packed with iron, folate, vitamins A, C, K for energy and immunity',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 60,
    category: 'vegetables',
    subcategory: 'leafy_greens',
    description: 'Fresh organic baby spinach leaves. Perfect for salads and smoothies.',
    user_rating: 4.4,
    review_count: 150
  },
  {
    id: '7',
    name: 'Wild Caught Salmon Fillet',
    brand: 'OceanFresh',
    price: 1899,
    health_score: 9,
    image_urls: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'High in omega-3 fatty acids for brain, heart, and joint health',
    is_organic: false,
    is_vegetarian: false,
    is_vegan: false,
    stock_quantity: 20,
    category: 'seafood',
    subcategory: 'fish',
    description: 'Premium wild-caught Atlantic salmon. Rich in omega-3s and protein.',
    user_rating: 4.8,
    review_count: 320
  },
  {
    id: '8',
    name: 'Organic Blueberries',
    brand: 'BerryBest',
    price: 699,
    health_score: 9,
    image_urls: [
      "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'Powerful antioxidants for brain health, memory, and anti-aging',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 35,
    category: 'fruits',
    subcategory: 'berries',
    description: 'Fresh organic blueberries packed with antioxidants and vitamin C.',
    user_rating: 4.6,
    review_count: 180
  },
  {
    id: '9',
    name: 'Premium Whey Isolate',
    brand: 'FitPower',
    price: 3499,
    health_score: 8,
    image_urls: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'Fast-absorbing protein for muscle recovery and lean mass building',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 45,
    category: 'supplements',
    subcategory: 'protein',
    description: 'Ultra-pure whey protein isolate with 28g protein per serving. Zero sugar.',
    user_rating: 4.7,
    review_count: 890
  },
  {
    id: '10',
    name: 'Virgin Coconut Oil',
    brand: 'TropicalGold',
    price: 799,
    health_score: 7,
    image_urls: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'Medium-chain triglycerides for energy and healthy cooking',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 55,
    category: 'oils',
    subcategory: 'cooking_oils',
    description: 'Extra virgin coconut oil. Perfect for cooking and skincare.',
    user_rating: 4.4,
    review_count: 210
  },
  {
    id: '11',
    name: 'Organic Chia Seeds',
    brand: 'SuperSeeds',
    price: 899,
    health_score: 9,
    image_urls: [
      "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'High in omega-3s, fiber, and protein for sustained energy',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 40,
    category: 'seeds',
    subcategory: 'superfood_seeds',
    description: 'Premium organic chia seeds rich in omega-3s, fiber, and antioxidants.',
    user_rating: 4.5,
    review_count: 340
  },
  {
    id: '12',
    name: 'Grass-Fed Beef Protein',
    brand: 'PureMeat',
    price: 3299,
    health_score: 8,
    image_urls: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'Clean protein from grass-fed cattle for muscle building',
    is_organic: true,
    is_vegetarian: false,
    is_vegan: false,
    stock_quantity: 30,
    category: 'supplements',
    subcategory: 'protein',
    description: 'Grass-fed beef protein isolate. Paleo-friendly and rich in amino acids.',
    user_rating: 4.6,
    review_count: 156
  },
  {
    id: '13',
    name: 'Probiotic Complex 50 Billion',
    brand: 'GutHealth',
    price: 2199,
    health_score: 9,
    image_urls: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'Supports digestive health, immunity, and gut microbiome',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 65,
    category: 'supplements',
    subcategory: 'probiotics',
    description: '50 billion CFU multi-strain probiotic for optimal gut health.',
    user_rating: 4.7,
    review_count: 420
  },
  {
    id: '14',
    name: 'Organic Avocados',
    brand: 'FreshFarms',
    price: 499,
    health_score: 8,
    image_urls: [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'Healthy monounsaturated fats for heart health and satiety',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 25,
    category: 'fruits',
    subcategory: 'tropical_fruits',
    description: 'Fresh organic Hass avocados. Rich in healthy fats and fiber.',
    user_rating: 4.3,
    review_count: 95
  },
  {
    id: '15',
    name: 'Magnesium Glycinate 400mg',
    brand: 'MineralMax',
    price: 1599,
    health_score: 8,
    image_urls: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
    ],
    health_impact_summary: 'Supports muscle function, sleep quality, and nervous system',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 50,
    category: 'supplements',
    subcategory: 'minerals',
    description: 'High-absorption magnesium glycinate for better sleep and muscle recovery.',
    user_rating: 4.5,
    review_count: 380
  }
];

const dummyCategories = ['supplements', 'grains', 'nuts', 'dairy', 'vegetables', 'seafood', 'fruits', 'oils', 'seeds'];

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
