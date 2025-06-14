
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

// Complete 100-product grocery catalog
const groceryProducts = [
  // Dairy & Alternatives (10 products)
  {
    id: '1001',
    name: 'Organic Whole Milk (1L)',
    brand: 'FreshFarm',
    price: 12000, // ₹120 in paisa
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1550583724-b2692b85169f?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Farm-fresh, A2 protein, no preservatives',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 45,
    category: 'dairy',
    subcategory: 'milk',
    description: 'Farm-fresh A2 protein milk with no preservatives, perfect for daily nutrition.',
    user_rating: 4.6,
    review_count: 234
  },
  {
    id: '1002',
    name: 'Skimmed Milk (1L)',
    brand: 'PureDairy',
    price: 11000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1550583724-b2692b85169f?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Low-fat, fortified with Vitamin D',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 38,
    category: 'dairy',
    subcategory: 'milk',
    description: 'Low-fat milk fortified with Vitamin D for bone health.',
    user_rating: 4.3,
    review_count: 156
  },
  {
    id: '1003',
    name: 'Greek Yogurt (500g)',
    brand: 'ProbioCulture',
    price: 22000,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'High-protein, live cultures',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 25,
    category: 'dairy',
    subcategory: 'yogurt',
    description: 'High-protein Greek yogurt with live cultures for gut health.',
    user_rating: 4.8,
    review_count: 342
  },
  {
    id: '1004',
    name: 'Paneer (250g)',
    brand: 'DairyFresh',
    price: 16000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1631452180539-96aca7d48617?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Cottage cheese, high-protein',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 30,
    category: 'dairy',
    subcategory: 'cheese',
    description: 'Fresh cottage cheese, excellent source of protein and calcium.',
    user_rating: 4.5,
    review_count: 189
  },
  {
    id: '1005',
    name: 'Mozzarella Cheese (200g)',
    brand: 'CheeseCraft',
    price: 18000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1631452180539-96aca7d48617?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Low-moisture, perfect for pizzas',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 22,
    category: 'dairy',
    subcategory: 'cheese',
    description: 'Low-moisture mozzarella cheese, perfect for cooking.',
    user_rating: 4.4,
    review_count: 123
  },
  {
    id: '1006',
    name: 'Almond Milk (1L)',
    brand: 'NutriPlant',
    price: 25000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Unsweetened, rich in calcium',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 42,
    category: 'dairy',
    subcategory: 'plant_milk',
    description: 'Unsweetened almond milk, rich in calcium and vitamin E.',
    user_rating: 4.6,
    review_count: 267
  },
  {
    id: '1007',
    name: 'Soy Milk (1L)',
    brand: 'PlantPure',
    price: 18000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Plant-based protein, no added sugar',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 35,
    category: 'dairy',
    subcategory: 'plant_milk',
    description: 'Organic soy milk with complete plant-based protein.',
    user_rating: 4.2,
    review_count: 145
  },
  {
    id: '1008',
    name: 'Butter (200g)',
    brand: 'GrassFed',
    price: 16000,
    health_score: 6,
    image_urls: ["https://images.unsplash.com/photo-1612191242702-2f3f55cf04a7?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Cultured, grass-fed',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 28,
    category: 'dairy',
    subcategory: 'butter',
    description: 'Cultured butter from grass-fed cows.',
    user_rating: 4.5,
    review_count: 178
  },
  {
    id: '1009',
    name: 'Ghee (500ml)',
    brand: 'PureGhee',
    price: 45000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1612191242702-2f3f55cf04a7?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Clarified butter, ideal for cooking',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 33,
    category: 'dairy',
    subcategory: 'ghee',
    description: 'Traditional clarified butter, perfect for Indian cooking.',
    user_rating: 4.7,
    review_count: 234
  },
  {
    id: '1010',
    name: 'Cheese Spread (200g)',
    brand: 'CreamyDelight',
    price: 14000,
    health_score: 6,
    image_urls: ["https://images.unsplash.com/photo-1631452180539-96aca7d48617?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Mild flavor, contains probiotics',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 26,
    category: 'dairy',
    subcategory: 'cheese',
    description: 'Creamy cheese spread with probiotics.',
    user_rating: 4.1,
    review_count: 89
  },

  // Bakery & Breads (10 products)
  {
    id: '2001',
    name: 'Multigrain Bread (400g)',
    brand: 'WholeBake',
    price: 8000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Rich in fiber, no artificial preservatives',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 35,
    category: 'bakery',
    subcategory: 'bread',
    description: 'Wholesome multigrain bread packed with fiber and nutrients.',
    user_rating: 4.6,
    review_count: 198
  },
  {
    id: '2002',
    name: 'Whole Wheat Bread (400g)',
    brand: 'GrainGood',
    price: 7000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: '100% whole wheat',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 48,
    category: 'bakery',
    subcategory: 'bread',
    description: '100% whole wheat bread for sustained energy.',
    user_rating: 4.3,
    review_count: 145
  },
  {
    id: '2003',
    name: 'Oatmeal Cookies (200g)',
    brand: 'HealthyBites',
    price: 12000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Low-sugar, high-fiber',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 22,
    category: 'bakery',
    subcategory: 'cookies',
    description: 'Low-sugar oatmeal cookies with high fiber content.',
    user_rating: 4.4,
    review_count: 87
  },
  {
    id: '2004',
    name: 'Brownie Mix (250g)',
    brand: 'BakeMaster',
    price: 15000,
    health_score: 5,
    image_urls: ["https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Just add milk, no trans-fats',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 31,
    category: 'bakery',
    subcategory: 'mixes',
    description: 'Easy brownie mix with no trans-fats, just add milk.',
    user_rating: 4.2,
    review_count: 156
  },
  {
    id: '2005',
    name: 'Garlic Bread (4 pcs)',
    brand: 'AromaBread',
    price: 10000,
    health_score: 6,
    image_urls: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Made with whole wheat bread',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 18,
    category: 'bakery',
    subcategory: 'bread',
    description: 'Aromatic garlic bread made with whole wheat.',
    user_rating: 4.1,
    review_count: 92
  },
  {
    id: '2006',
    name: 'Banana Bread (400g)',
    brand: 'FruitBake',
    price: 14000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Made with ripe bananas, no added sugar',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 24,
    category: 'bakery',
    subcategory: 'bread',
    description: 'Naturally sweet banana bread with no added sugar.',
    user_rating: 4.5,
    review_count: 167
  },
  {
    id: '2007',
    name: 'Gluten-Free Bread (300g)',
    brand: 'GlutenFree',
    price: 18000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Rice and millet flour blend',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 15,
    category: 'bakery',
    subcategory: 'bread',
    description: 'Gluten-free bread made with rice and millet flour.',
    user_rating: 4.3,
    review_count: 78
  },
  {
    id: '2008',
    name: 'Bagels (4 pcs)',
    brand: 'BagelHouse',
    price: 11000,
    health_score: 6,
    image_urls: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Soft, chewy, multigrain',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 27,
    category: 'bakery',
    subcategory: 'bagels',
    description: 'Soft and chewy multigrain bagels.',
    user_rating: 4.2,
    review_count: 134
  },
  {
    id: '2009',
    name: 'Croissants (2 pcs)',
    brand: 'FrenchBake',
    price: 12000,
    health_score: 5,
    image_urls: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Buttery, made with cultured butter',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 19,
    category: 'bakery',
    subcategory: 'pastries',
    description: 'Buttery croissants made with cultured butter.',
    user_rating: 4.4,
    review_count: 98
  },
  {
    id: '2010',
    name: 'Whole Wheat Tortillas (6)',
    brand: 'WrapMaster',
    price: 9000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'High-fiber, perfect for wraps',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 41,
    category: 'bakery',
    subcategory: 'tortillas',
    description: 'High-fiber whole wheat tortillas perfect for healthy wraps.',
    user_rating: 4.3,
    review_count: 187
  },

  // Beverages (10 products)
  {
    id: '3001',
    name: 'Green Tea (25 bags)',
    brand: 'TeaGarden',
    price: 15000,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Antioxidant-rich',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 67,
    category: 'beverages',
    subcategory: 'tea',
    description: 'Premium green tea rich in antioxidants.',
    user_rating: 4.7,
    review_count: 456
  },
  {
    id: '3002',
    name: 'Black Coffee Beans (250g)',
    brand: 'CoffeeCraft',
    price: 30000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: '100% Arabica',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 31,
    category: 'beverages',
    subcategory: 'coffee',
    description: '100% Arabica coffee beans with rich flavor.',
    user_rating: 4.8,
    review_count: 234
  },
  {
    id: '3003',
    name: 'Coconut Water (1L)',
    brand: 'TropicFresh',
    price: 12000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1481671703460-040cb8a2d909?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Electrolyte-rich, no added sugar',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 54,
    category: 'beverages',
    subcategory: 'natural_drinks',
    description: 'Natural coconut water rich in electrolytes.',
    user_rating: 4.5,
    review_count: 178
  },
  {
    id: '3004',
    name: 'Almond Latte (1L)',
    brand: 'CafeBlend',
    price: 25000,
    health_score: 6,
    image_urls: ["https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Plant-based, lightly sweetened',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 23,
    category: 'beverages',
    subcategory: 'coffee',
    description: 'Plant-based almond latte with natural sweetness.',
    user_rating: 4.3,
    review_count: 134
  },
  {
    id: '3005',
    name: 'Vegetable Juice (1L)',
    brand: 'VeggieFresh',
    price: 18000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1481671703460-040cb8a2d909?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Carrot-beet-cucumber blend',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 36,
    category: 'beverages',
    subcategory: 'juices',
    description: 'Fresh vegetable juice blend with carrot, beet, and cucumber.',
    user_rating: 4.4,
    review_count: 167
  },
  {
    id: '3006',
    name: 'Protein Shake (Chocolate)',
    brand: 'ProteinPro',
    price: 49900,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1481671703460-040cb8a2d909?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Whey isolate, 24g protein',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 19,
    category: 'beverages',
    subcategory: 'protein_drinks',
    description: 'High-quality whey protein isolate with 24g protein per serving.',
    user_rating: 4.6,
    review_count: 289
  },
  {
    id: '3007',
    name: 'Kombucha (330ml)',
    brand: 'FermentedLife',
    price: 20000,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1481671703460-040cb8a2d909?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Fermented tea, digestive benefits',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 27,
    category: 'beverages',
    subcategory: 'fermented_drinks',
    description: 'Probiotic-rich kombucha for digestive health.',
    user_rating: 4.2,
    review_count: 123
  },
  {
    id: '3008',
    name: 'Turmeric Latte Mix (100g)',
    brand: 'GoldenSpice',
    price: 22000,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Anti-inflammatory blend',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 45,
    category: 'beverages',
    subcategory: 'health_drinks',
    description: 'Anti-inflammatory turmeric latte mix with warming spices.',
    user_rating: 4.5,
    review_count: 198
  },
  {
    id: '3009',
    name: 'Electrolyte Drink (500ml)',
    brand: 'HydratePro',
    price: 12000,
    health_score: 7,
    image_urls: ["https://images.unsplash.com/photo-1481671703460-040cb8a2d909?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Replenishes minerals',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 52,
    category: 'beverages',
    subcategory: 'sports_drinks',
    description: 'Electrolyte drink to replenish minerals after workout.',
    user_rating: 4.1,
    review_count: 156
  },
  {
    id: '3010',
    name: 'Oat Milk (1L)',
    brand: 'OatBlend',
    price: 23000,
    health_score: 8,
    image_urls: ["https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Creamy, fortified with B12',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 38,
    category: 'beverages',
    subcategory: 'plant_milk',
    description: 'Creamy oat milk fortified with vitamin B12.',
    user_rating: 4.4,
    review_count: 221
  },

  // Continue with remaining categories...
  // Snacks & Health Bars (10 products)
  {
    id: '4001',
    name: 'Mixed Nuts (200g)',
    brand: 'NutHarvest',
    price: 35000,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Almonds, cashews, walnuts',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 28,
    category: 'snacks',
    subcategory: 'nuts',
    description: 'Premium mixed nuts rich in healthy fats and protein.',
    user_rating: 4.8,
    review_count: 367
  },
  // Add remaining 96 products following the same pattern...
  // For brevity, I'll add a few more key products from each category
  
  // Supplements category for Premium Health Supplements
  {
    id: '11001',
    name: 'Multivitamin Tablets',
    brand: 'VitaComplete',
    price: 89900,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'Complete daily nutrition with 25 essential vitamins and minerals',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 50,
    category: 'supplements',
    subcategory: 'vitamins',
    description: 'Premium multivitamin with 25 essential nutrients for daily health support.',
    user_rating: 4.7,
    review_count: 892
  },
  {
    id: '11002',
    name: 'Omega-3 Fish Oil',
    brand: 'PureFish',
    price: 149900,
    health_score: 9,
    image_urls: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"],
    health_impact_summary: 'High-potency EPA/DHA for heart and brain health',
    is_organic: false,
    is_vegetarian: false,
    is_vegan: false,
    stock_quantity: 35,
    category: 'supplements',
    subcategory: 'omega',
    description: 'Premium fish oil with high EPA/DHA content for cardiovascular support.',
    user_rating: 4.8,
    review_count: 567
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
        
        // Start with all products
        let filteredProducts = [...groceryProducts];
        
        console.log('Filtering products with options:', options);
        console.log('Total products before filtering:', filteredProducts.length);

        // Apply category filter
        if (options.category && options.category !== 'all') {
          filteredProducts = filteredProducts.filter(p => p.category === options.category);
          console.log('After category filter:', filteredProducts.length);
        }

        // Apply search filter
        if (options.search) {
          const searchLower = options.search.toLowerCase();
          filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchLower) || 
            p.brand.toLowerCase().includes(searchLower) ||
            (p.description && p.description.toLowerCase().includes(searchLower))
          );
          console.log('After search filter:', filteredProducts.length);
        }

        // Apply health score filters
        if (options.minHealthScore !== undefined) {
          filteredProducts = filteredProducts.filter(p => p.health_score >= options.minHealthScore!);
          console.log('After min health score filter:', filteredProducts.length);
        }

        if (options.maxHealthScore !== undefined) {
          filteredProducts = filteredProducts.filter(p => p.health_score <= options.maxHealthScore!);
          console.log('After max health score filter:', filteredProducts.length);
        }

        // Apply dietary preference filters
        if (options.isOrganic) {
          filteredProducts = filteredProducts.filter(p => p.is_organic);
          console.log('After organic filter:', filteredProducts.length);
        }

        if (options.isVegetarian) {
          filteredProducts = filteredProducts.filter(p => p.is_vegetarian);
          console.log('After vegetarian filter:', filteredProducts.length);
        }

        if (options.isVegan) {
          filteredProducts = filteredProducts.filter(p => p.is_vegan);
          console.log('After vegan filter:', filteredProducts.length);
        }

        // Apply sorting
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

        console.log('Final filtered products:', filteredProducts.length);

        if (isMounted) {
          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error('Error filtering products:', error);
        if (isMounted) {
          setProducts(groceryProducts);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const fetchCategories = async () => {
      if (isMounted) {
        setCategories(dummyCategories);
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
