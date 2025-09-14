import { Product } from '@/types/product';

export const enhancedProducts: Product[] = [
  // Premium Organic Products
  {
    id: 'org-001',
    name: 'Premium Organic Quinoa',
    brand: 'Nature\'s Best',
    price: 599,
    health_score: 9.5,
    image_urls: ['/lovable-uploads/quinoa-premium.jpg'],
    health_impact_summary: 'Complete protein source with all essential amino acids, high in fiber and gluten-free',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 150,
    category: 'grains',
    subcategory: 'super_grains',
    description: 'Premium tri-color quinoa sourced from high-altitude farms in the Andes. Rich in protein, fiber, and essential nutrients.',
    user_rating: 4.8,
    review_count: 342,
    quantity_options: [
      { value: 500, unit: 'g', price: 599 },
      { value: 1000, unit: 'g', price: 1099 }
    ],
    allergens: [],
    ingredients: ['Organic Quinoa (Red, White, Black varieties)'],
    nutritional_info: {
      calories_per_100g: 368,
      protein: 14.1,
      carbs: 64.2,
      fat: 6.1,
      fiber: 7.0
    }
  },
  {
    id: 'org-002',
    name: 'Cold-Pressed Virgin Coconut Oil',
    brand: 'Pure Essence',
    price: 899,
    health_score: 9.2,
    image_urls: ['/lovable-uploads/coconut-oil.jpg'],
    health_impact_summary: 'Rich in MCTs for quick energy, antimicrobial properties, supports brain and heart health',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 200,
    category: 'oils',
    subcategory: 'cooking_oils',
    description: 'Premium cold-pressed virgin coconut oil extracted within 24 hours of harvest. No chemical processing.',
    user_rating: 4.9,
    review_count: 567,
    quantity_options: [
      { value: 500, unit: 'ml', price: 899 },
      { value: 1000, unit: 'ml', price: 1599 }
    ],
    allergens: [],
    ingredients: ['100% Pure Virgin Coconut Oil'],
    nutritional_info: {
      calories_per_100g: 862,
      saturated_fat: 82.5,
      mct_content: 65.0
    }
  },
  {
    id: 'sup-001',
    name: 'Premium Plant Protein Blend',
    brand: 'VitalLife',
    price: 2499,
    health_score: 9.4,
    image_urls: ['/lovable-uploads/plant-protein.jpg'],
    health_impact_summary: 'Complete amino acid profile from multiple plant sources, easily digestible, supports muscle growth',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 80,
    category: 'health_supplements',
    subcategory: 'protein_powders',
    description: 'Carefully crafted blend of pea, hemp, and brown rice protein with added digestive enzymes.',
    user_rating: 4.7,
    review_count: 234,
    quantity_options: [
      { value: 1000, unit: 'g', price: 2499 },
      { value: 2000, unit: 'g', price: 4299 }
    ],
    allergens: [],
    ingredients: ['Organic Pea Protein', 'Organic Hemp Protein', 'Organic Brown Rice Protein', 'Digestive Enzyme Blend'],
    nutritional_info: {
      protein_per_serving: 25,
      calories_per_serving: 120,
      amino_acid_score: 95
    }
  },
  // Premium Snacks
  {
    id: 'snk-001',
    name: 'Artisan Mixed Nuts & Seeds',
    brand: 'Gourmet Garden',
    price: 1299,
    health_score: 8.9,
    image_urls: ['/lovable-uploads/mixed-nuts.jpg'],
    health_impact_summary: 'Rich in healthy fats, protein, vitamin E, and minerals. Perfect for heart and brain health',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 120,
    category: 'healthy_snacks',
    subcategory: 'nuts_seeds',
    description: 'Premium selection of almonds, walnuts, cashews, pumpkin seeds, and sunflower seeds.',
    user_rating: 4.6,
    review_count: 189,
    quantity_options: [
      { value: 250, unit: 'g', price: 1299 },
      { value: 500, unit: 'g', price: 2199 }
    ],
    allergens: ['Tree Nuts'],
    ingredients: ['Organic Almonds', 'Organic Walnuts', 'Organic Cashews', 'Organic Pumpkin Seeds', 'Organic Sunflower Seeds'],
    nutritional_info: {
      calories_per_100g: 610,
      protein: 20.5,
      healthy_fats: 50.2,
      vitamin_e: 15.3
    }
  },
  // Dairy Alternatives
  {
    id: 'dai-001',
    name: 'Organic Almond Milk',
    brand: 'Fresh Valley',
    price: 349,
    health_score: 8.5,
    image_urls: ['/lovable-uploads/almond-milk.jpg'],
    health_impact_summary: 'Low calorie, lactose-free, fortified with vitamins D and B12, good source of vitamin E',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 300,
    category: 'dairy',
    subcategory: 'plant_milk',
    description: 'Creamy organic almond milk made from California almonds, fortified with essential vitamins.',
    user_rating: 4.4,
    review_count: 445,
    quantity_options: [
      { value: 1000, unit: 'ml', price: 349 }
    ],
    allergens: ['Tree Nuts'],
    ingredients: ['Organic Almonds', 'Water', 'Natural Stabilizers', 'Vitamin D3', 'Vitamin B12'],
    nutritional_info: {
      calories_per_100ml: 17,
      protein: 0.6,
      calcium: 120,
      vitamin_d: 1.1
    }
  },
  // Bakery Items
  {
    id: 'bak-001',
    name: 'Multigrain Sourdough Bread',
    brand: 'Artisan Bakehouse',
    price: 189,
    health_score: 8.3,
    image_urls: ['/lovable-uploads/sourdough-bread.jpg'],
    health_impact_summary: 'Fermented for better digestibility, high in fiber, contains probiotics, lower glycemic index',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 45,
    category: 'bakery',
    subcategory: 'artisan_bread',
    description: 'Traditionally fermented sourdough with organic grains, seeds, and ancient grains.',
    user_rating: 4.5,
    review_count: 167,
    quantity_options: [
      { value: 400, unit: 'g', price: 189 }
    ],
    allergens: ['Gluten', 'Sesame Seeds'],
    ingredients: ['Whole Wheat Flour', 'Sourdough Starter', 'Mixed Seeds', 'Sea Salt'],
    nutritional_info: {
      calories_per_100g: 247,
      protein: 8.5,
      fiber: 7.2,
      complex_carbs: 45.1
    }
  },
  // Premium Sweeteners
  {
    id: 'swe-001',
    name: 'Raw Manuka Honey',
    brand: 'Pure Hive',
    price: 2899,
    health_score: 8.7,
    image_urls: ['/lovable-uploads/manuka-honey.jpg'],
    health_impact_summary: 'Antibacterial properties, antioxidants, supports immune system, natural energy source',
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 60,
    category: 'sweeteners',
    subcategory: 'natural_honey',
    description: 'Authentic UMF 15+ Manuka honey from New Zealand, tested for purity and potency.',
    user_rating: 4.8,
    review_count: 98,
    quantity_options: [
      { value: 250, unit: 'g', price: 2899 },
      { value: 500, unit: 'g', price: 5199 }
    ],
    allergens: [],
    ingredients: ['100% Pure Manuka Honey'],
    nutritional_info: {
      calories_per_100g: 304,
      natural_sugars: 82.4,
      umf_rating: 15,
      antioxidants: 'High'
    }
  },
  // Special Collections
  {
    id: 'spc-001',
    name: 'Himalayan Pink Salt',
    brand: 'Mountain Pure',
    price: 299,
    health_score: 8.1,
    image_urls: ['/lovable-uploads/himalayan-salt.jpg'],
    health_impact_summary: 'Rich in trace minerals, less processed than table salt, supports electrolyte balance',
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 250,
    category: 'special_collections',
    subcategory: 'gourmet_salts',
    description: 'Hand-mined pink salt from ancient sea beds in the Himalayan mountains.',
    user_rating: 4.3,
    review_count: 156,
    quantity_options: [
      { value: 500, unit: 'g', price: 299 },
      { value: 1000, unit: 'g', price: 499 }
    ],
    allergens: [],
    ingredients: ['100% Pure Himalayan Pink Salt'],
    nutritional_info: {
      sodium_per_gram: 590,
      trace_minerals: 84,
      iron_content: 38.9
    }
  }
];

// Premium product categories with enhanced descriptions
export const premiumCategories = [
  {
    id: 'premium_organic',
    name: 'Premium Organic',
    description: 'Certified organic products with the highest quality standards',
    icon: '🌿',
    color: 'emerald',
    productCount: 450
  },
  {
    id: 'superfoods',
    name: 'Superfoods',
    description: 'Nutrient-dense foods with exceptional health benefits',
    icon: '⭐',
    color: 'purple',
    productCount: 180
  },
  {
    id: 'artisan_crafted',
    name: 'Artisan Crafted',
    description: 'Handcrafted products made with traditional methods',
    icon: '👨‍🍳',
    color: 'orange',
    productCount: 95
  },
  {
    id: 'functional_foods',
    name: 'Functional Foods',
    description: 'Foods designed to provide specific health benefits',
    icon: '🧬',
    color: 'blue',
    productCount: 220
  }
];

export const healthTrends = [
  {
    name: 'Plant-Based Nutrition',
    growth: '+35%',
    description: 'Growing demand for plant-based alternatives'
  },
  {
    name: 'Functional Foods',
    growth: '+28%',
    description: 'Foods with added health benefits'
  },
  {
    name: 'Organic Products',
    growth: '+22%',
    description: 'Certified organic and natural products'
  },
  {
    name: 'Keto & Low-Carb',
    growth: '+19%',
    description: 'Low-carb and ketogenic diet products'
  }
];