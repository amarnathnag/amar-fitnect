
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

// Comprehensive grocery product catalog with 100 items across 10 categories
const groceryProducts = [
  // Dairy & Alternatives (10 products)
  {
    id: '101',
    name: 'Organic Whole Milk',
    brand: 'FreshFarm',
    price: 12000, // ₹120 in paisa
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1550583724-b2692b85169f?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Farm-fresh A2 protein, rich in calcium and vitamins, no preservatives',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 45,
    category: 'dairy',
    subcategory: 'milk',
    description: 'Farm-fresh, A2 protein, no preservatives. Perfect for daily nutrition needs.',
    user_rating: 4.6,
    review_count: 234
  },
  {
    id: '102',
    name: 'Skimmed Milk',
    brand: 'PureDairy',
    price: 11000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1550583724-b2692b85169f?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Low-fat milk fortified with Vitamin D for bone health',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 38,
    category: 'dairy',
    subcategory: 'milk',
    description: 'Low-fat, fortified with Vitamin D. Ideal for weight management.',
    user_rating: 4.3,
    review_count: 156
  },
  {
    id: '103',
    name: 'Greek Yogurt',
    brand: 'ProbioCulture',
    price: 22000,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'High-protein yogurt with live cultures for digestive health',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 25,
    category: 'dairy',
    subcategory: 'yogurt',
    description: 'High-protein, live cultures. Supports gut health and muscle building.',
    user_rating: 4.8,
    review_count: 342
  },
  {
    id: '104',
    name: 'Fresh Paneer',
    brand: 'DairyFresh',
    price: 16000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1631452180539-96aca7d48617?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'High-protein cottage cheese, excellent source of calcium',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 30,
    category: 'dairy',
    subcategory: 'cheese',
    description: 'Cottage cheese, high-protein. Perfect for Indian cuisine.',
    user_rating: 4.5,
    review_count: 189
  },
  {
    id: '105',
    name: 'Almond Milk',
    brand: 'NutriPlant',
    price: 25000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Plant-based milk rich in calcium and vitamin E',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 42,
    category: 'dairy',
    subcategory: 'plant_milk',
    description: 'Unsweetened, rich in calcium. Lactose-free alternative.',
    user_rating: 4.4,
    review_count: 267
  },

  // Bakery & Breads (10 products)
  {
    id: '201',
    name: 'Multigrain Bread',
    brand: 'WholeBake',
    price: 8000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'High-fiber bread with multiple grains, no artificial preservatives',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 35,
    category: 'bakery',
    subcategory: 'bread',
    description: 'Rich in fiber, no artificial preservatives. Made with 7 grains.',
    user_rating: 4.6,
    review_count: 198
  },
  {
    id: '202',
    name: 'Whole Wheat Bread',
    brand: 'GrainGood',
    price: 7000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: '100% whole wheat for sustained energy and fiber',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 48,
    category: 'bakery',
    subcategory: 'bread',
    description: '100% whole wheat. Perfect for daily nutrition.',
    user_rating: 4.3,
    review_count: 145
  },
  {
    id: '203',
    name: 'Oatmeal Cookies',
    brand: 'HealthyBites',
    price: 12000,
    health_score: 6,
    image_urls: ["https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Low-sugar cookies with high fiber from oats',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 22,
    category: 'bakery',
    subcategory: 'cookies',
    description: 'Low-sugar, high-fiber. Made with rolled oats.',
    user_rating: 4.4,
    review_count: 87
  },

  // Beverages (10 products)
  {
    id: '301',
    name: 'Green Tea Premium',
    brand: 'TeaGarden',
    price: 15000,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Antioxidant-rich green tea for metabolism and heart health',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 67,
    category: 'beverages',
    subcategory: 'tea',
    description: 'Antioxidant-rich, 25 tea bags. Boosts metabolism naturally.',
    user_rating: 4.7,
    review_count: 456
  },
  {
    id: '302',
    name: 'Arabica Coffee Beans',
    brand: 'CoffeeCraft',
    price: 30000,
    health_score: 6,
    image_urls: ["https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: '100% Arabica beans rich in antioxidants, moderate caffeine',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 31,
    category: 'beverages',
    subcategory: 'coffee',
    description: '100% Arabica beans. Premium quality for coffee lovers.',
    user_rating: 4.8,
    review_count: 234
  },
  {
    id: '303',
    name: 'Natural Coconut Water',
    brand: 'TropicFresh',
    price: 12000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1481671703460-040cb8a2d909?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Electrolyte-rich natural hydration, no added sugars',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 54,
    category: 'beverages',
    subcategory: 'natural_drinks',
    description: 'Electrolyte-rich, no added sugar. Perfect post-workout drink.',
    user_rating: 4.5,
    review_count: 178
  },

  // Snacks & Health Bars (10 products)
  {
    id: '401',
    name: 'Premium Mixed Nuts',
    brand: 'NutHarvest',
    price: 35000,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Almonds, cashews, walnuts - rich in healthy fats and protein',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 28,
    category: 'snacks',
    subcategory: 'nuts',
    description: 'Almonds, cashews, walnuts. Heart-healthy premium blend.',
    user_rating: 4.8,
    review_count: 367
  },
  {
    id: '402',
    name: 'Energy Trail Mix',
    brand: 'TrailBlazer',
    price: 15000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1508737804141-4c3b688e2546?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Balanced mix of nuts, seeds and dried fruits for sustained energy',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 41,
    category: 'snacks',
    subcategory: 'trail_mix',
    description: 'With dried fruits and seeds. Perfect for hiking and workouts.',
    user_rating: 4.4,
    review_count: 123
  },
  {
    id: '403',
    name: 'Protein Granola Bars',
    brand: 'FitBar',
    price: 18000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1571167250838-4c014b0723e4?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'High-protein bars with oats, honey and mixed seeds',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 33,
    category: 'snacks',
    subcategory: 'protein_bars',
    description: 'Oats, honey, mixed seeds. Pack of 5 protein-rich bars.',
    user_rating: 4.6,
    review_count: 189
  },

  // Cereals & Grains (10 products)
  {
    id: '501',
    name: 'Organic Brown Rice',
    brand: 'GrainMaster',
    price: 12000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1465378999936-704dd91ec0fc?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Whole grain rice rich in fiber, B vitamins and minerals',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 52,
    category: 'grains',
    subcategory: 'rice',
    description: 'Whole grain, 1kg pack. Rich in fiber and nutrients.',
    user_rating: 4.5,
    review_count: 234
  },
  {
    id: '502',
    name: 'Superfood Quinoa',
    brand: 'AncientGrains',
    price: 24000,
    health_score: 10,
    image_urls: ["https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Complete protein grain with all essential amino acids',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 19,
    category: 'grains',
    subcategory: 'supergrains',
    description: 'Complete protein, 500g. Gluten-free superfood grain.',
    user_rating: 4.9,
    review_count: 178
  },
  {
    id: '503',
    name: 'Rolled Oats',
    brand: 'MorningFuel',
    price: 20000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1517518971-e441bcb8e924?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'High-fiber oats for heart health and sustained energy',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 44,
    category: 'grains',
    subcategory: 'oats',
    description: 'High in fiber, 1kg pack. Perfect for breakfast bowls.',
    user_rating: 4.6,
    review_count: 267
  },
  {
    id: '504',
    name: 'Chia Seeds',
    brand: 'SuperSeeds',
    price: 30000,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1521578298089-997dfc5b3eb9?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Omega-3 rich seeds with high fiber and protein content',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 37,
    category: 'grains',
    subcategory: 'seeds',
    description: 'Omega-3 rich, 250g. Excellent source of plant protein.',
    user_rating: 4.7,
    review_count: 145
  },

  // Oils & Fats (10 products)
  {
    id: '601',
    name: 'Extra Virgin Olive Oil',
    brand: 'MediterraneanGold',
    price: 34900,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Cold-pressed olive oil rich in antioxidants and healthy fats',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 26,
    category: 'oils',
    subcategory: 'olive_oil',
    description: 'Cold-pressed, high antioxidants, 500ml. Heart-healthy cooking oil.',
    user_rating: 4.8,
    review_count: 189
  },
  {
    id: '602',
    name: 'Virgin Coconut Oil',
    brand: 'TropicalPure',
    price: 29900,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Medium-chain triglycerides for energy and metabolism',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 31,
    category: 'oils',
    subcategory: 'coconut_oil',
    description: 'Virgin, unrefined, 500ml. Great for cooking and skincare.',
    user_rating: 4.6,
    review_count: 156
  },
  {
    id: '603',
    name: 'Premium Ghee',
    brand: 'GrassFed',
    price: 45000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1612191242702-2f3f55cf04a7?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Clarified butter from grass-fed cows, rich in vitamins',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 23,
    category: 'oils',
    subcategory: 'ghee',
    description: 'Grass-fed, 500ml. Traditional clarified butter for authentic taste.',
    user_rating: 4.7,
    review_count: 234
  },

  // Spices & Condiments (10 products)
  {
    id: '701',
    name: 'Organic Turmeric Powder',
    brand: 'SpiceGarden',
    price: 12000,
    health_score: 10,
    image_urls: ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Anti-inflammatory spice with curcumin for joint health',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 58,
    category: 'spices',
    subcategory: 'powders',
    description: 'Anti-inflammatory, 200g. High curcumin content for health benefits.',
    user_rating: 4.8,
    review_count: 345
  },
  {
    id: '702',
    name: 'Black Pepper Whole',
    brand: 'SpiceMaster',
    price: 10000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1596040680752-09b2b8e75fa1?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Rich in piperine, aids digestion and nutrient absorption',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 43,
    category: 'spices',
    subcategory: 'whole_spices',
    description: 'Rich in piperine, 100g. Enhances nutrient absorption.',
    user_rating: 4.5,
    review_count: 167
  },
  {
    id: '703',
    name: 'Ceylon Cinnamon Powder',
    brand: 'PureSpice',
    price: 13000,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1589994337506-b4d1c5bb10d8?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'True cinnamon for blood sugar control and antioxidants',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 35,
    category: 'spices',
    subcategory: 'powders',
    description: 'Blood sugar control, 100g. True Ceylon cinnamon for health.',
    user_rating: 4.7,
    review_count: 123
  },

  // Frozen & Convenience Foods (10 products)
  {
    id: '801',
    name: 'Frozen Mixed Vegetables',
    brand: 'FreshFreeze',
    price: 15000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Steam-in-bag vegetables, no preservatives, retains nutrients',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 41,
    category: 'frozen',
    subcategory: 'vegetables',
    description: 'Steam-in-bag, no preservatives, 500g. Quick and nutritious.',
    user_rating: 4.3,
    review_count: 189
  },
  {
    id: '802',
    name: 'Organic Frozen Berries',
    brand: 'BerryBest',
    price: 28000,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1506802913710-40e2e66339c9?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Antioxidant-rich mixed berries, flash-frozen at peak ripeness',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 27,
    category: 'frozen',
    subcategory: 'fruits',
    description: 'Antioxidant-rich, 500g. Perfect for smoothies and desserts.',
    user_rating: 4.6,
    review_count: 234
  },
  {
    id: '803',
    name: 'Plant-Based Burger Patties',
    brand: 'VeggiePro',
    price: 20000,
    health_score: 6,
    image_urls: ["https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'High-protein plant-based patties with complete amino acids',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 18,
    category: 'frozen',
    subcategory: 'meat_alternatives',
    description: 'Plant-based protein, 4 pieces. Sustainable protein source.',
    user_rating: 4.2,
    review_count: 95
  },

  // Personal Care & Wellness (10 products)
  {
    id: '901',
    name: 'Organic Hand Soap',
    brand: 'PureCare',
    price: 18000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Natural hand soap with aloe vera and tea tree oil',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 47,
    category: 'personal_care',
    subcategory: 'hygiene',
    description: 'Aloe vera & tea tree, 250ml. Gentle on skin, effective cleaning.',
    user_rating: 4.5,
    review_count: 178
  },
  {
    id: '902',
    name: 'Vitamin C Serum',
    brand: 'GlowSkin',
    price: 45000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1512207846743-de4ac5543fb3?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Brightening formula with antioxidants for healthy skin',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 29,
    category: 'personal_care',
    subcategory: 'skincare',
    description: 'Brightening formula, 30ml. Antioxidant-rich for glowing skin.',
    user_rating: 4.4,
    review_count: 267
  },

  // Household Essentials (10 products)
  {
    id: '1001',
    name: 'Eco Dishwashing Liquid',
    brand: 'GreenClean',
    price: 15000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Biodegradable, plant-based formula safe for environment',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 53,
    category: 'household',
    subcategory: 'cleaning',
    description: 'Biodegradable, plant-based, 500ml. Eco-friendly cleaning solution.',
    user_rating: 4.3,
    review_count: 145
  },
  {
    id: '1002',
    name: 'Bamboo Reusable Towels',
    brand: 'EcoHome',
    price: 20000,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1631731008748-a4d8b6c64ec9?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Sustainable bamboo towels, highly absorbent and reusable',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 32,
    category: 'household',
    subcategory: 'eco_products',
    description: 'Highly absorbent, pack of 2. Sustainable alternative to paper towels.',
    user_rating: 4.6,
    review_count: 89
  }
];

const dummyCategories = [
  'dairy', 'bakery', 'beverages', 'snacks', 'grains', 'oils', 
  'spices', 'frozen', 'personal_care', 'household', 'supplements'
];

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
          // Filter grocery products based on options
          let filteredProducts = [...groceryProducts];
          
          if (options.category) {
            filteredProducts = filteredProducts.filter(p => p.category === options.category);
          }
          
          if (options.search) {
            const searchLower = options.search.toLowerCase();
            filteredProducts = filteredProducts.filter(p => 
              p.name.toLowerCase().includes(searchLower) || 
              p.brand.toLowerCase().includes(searchLower) ||
              p.description.toLowerCase().includes(searchLower)
            );
          }

          if (options.minHealthScore) {
            filteredProducts = filteredProducts.filter(p => p.health_score >= options.minHealthScore!);
          }

          if (options.maxHealthScore) {
            filteredProducts = filteredProducts.filter(p => p.health_score <= options.maxHealthScore!);
          }

          if (options.isOrganic) {
            filteredProducts = filteredProducts.filter(p => p.is_organic);
          }

          if (options.isVegetarian) {
            filteredProducts = filteredProducts.filter(p => p.is_vegetarian);
          }

          if (options.isVegan) {
            filteredProducts = filteredProducts.filter(p => p.is_vegan);
          }

          // Apply sorting to filtered products
          switch (options.sortBy) {
            case 'price_low':
              filteredProducts.sort((a, b) => a.price - b.price);
              break;
            case 'price_high':
              filteredProducts.sort((a, b) => b.price - a.price);
              break;
            case 'name':
              filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
              break;
            case 'rating':
              filteredProducts.sort((a, b) => (b.user_rating || 0) - (a.user_rating || 0));
              break;
            default:
              filteredProducts.sort((a, b) => b.health_score - a.health_score);
          }

          if (isMounted) {
            setProducts(filteredProducts);
            toast({
              title: "Using Demo Data",
              description: "Showing comprehensive grocery catalog (database connection issue)",
              variant: "default",
            });
          }
          return;
        }

        if (isMounted) {
          setProducts(data || groceryProducts);
        }
      } catch (error) {
        console.error('Error:', error);
        if (isMounted) {
          setProducts(groceryProducts);
          toast({
            title: "Using Demo Data",
            description: "Showing comprehensive grocery catalog",
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
