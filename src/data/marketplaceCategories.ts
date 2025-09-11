import { Apple, Cake, Coffee, Drumstick, Beef, Wheat, Cookie, Coffee as Beverage, Snowflake, IceCream, Globe, Baby, User, Sparkles, Heart, Zap, Trash, Home, BookOpen, Heart as Pet } from 'lucide-react';

export interface CategoryData {
  id: string;
  name: string;
  icon: any;
  image: string;
  description: string;
  color: string;
}

export const marketplaceCategories: CategoryData[] = [
  {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    icon: Apple,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400',
    description: 'Fresh organic fruits and vegetables',
    color: 'bg-green-100 text-green-700'
  },
  {
    id: 'bakery-dairy',
    name: 'Bakery, Cakes & Dairy',
    icon: Cake,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400',
    description: 'Fresh bakery items and dairy products',
    color: 'bg-yellow-100 text-yellow-700'
  },
  {
    id: 'breakfast',
    name: 'Breakfast & More',
    icon: Coffee,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
    description: 'Start your day right with healthy breakfast options',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    id: 'meat-fish',
    name: 'Eggs, Meat & Fish',
    icon: Drumstick,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400',
    description: 'Fresh protein sources for a healthy diet',
    color: 'bg-red-100 text-red-700'
  },
  {
    id: 'masalas-oils',
    name: 'Masalas, Oils & Dry Fruits',
    icon: Beef,
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400',
    description: 'Spices, cooking oils and nutritious dry fruits',
    color: 'bg-amber-100 text-amber-700'
  },
  {
    id: 'atta-rice-dals',
    name: 'Atta, Rice, Dals & Sugar',
    icon: Wheat,
    image: 'https://images.unsplash.com/photo-1556909045-f7c04b9b35a7?w=400',
    description: 'Essential grains and staples',
    color: 'bg-lime-100 text-lime-700'
  },
  {
    id: 'chips-biscuits',
    name: 'Chips, Biscuits & Namkeen',
    icon: Cookie,
    image: 'https://images.unsplash.com/photo-1600490036275-39770bc871fb?w=400',
    description: 'Healthy snacks and treats',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    id: 'beverages',
    name: 'Hot & Cold Beverages',
    icon: Beverage,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
    description: 'Refreshing drinks and beverages',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'frozen-foods',
    name: 'Instant & Frozen Foods',
    icon: Snowflake,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    description: 'Quick and convenient meal options',
    color: 'bg-cyan-100 text-cyan-700'
  },
  {
    id: 'chocolates-ice-cream',
    name: 'Chocolates & Ice Creams',
    icon: IceCream,
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400',
    description: 'Sweet treats and desserts',
    color: 'bg-pink-100 text-pink-700'
  },
  {
    id: 'gourmet-world-food',
    name: 'Gourmet & World Food',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    description: 'International cuisines and gourmet items',
    color: 'bg-indigo-100 text-indigo-700'
  },
  {
    id: 'baby-care',
    name: 'Baby Care',
    icon: Baby,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
    description: 'Everything for your little ones',
    color: 'bg-rose-100 text-rose-700'
  },
  {
    id: 'mens-grooming',
    name: "Men's Grooming",
    icon: User,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    description: 'Grooming essentials for men',
    color: 'bg-slate-100 text-slate-700'
  },
  {
    id: 'bath-body-hair',
    name: 'Bath, Body & Hair',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    description: 'Personal care and beauty products',
    color: 'bg-emerald-100 text-emerald-700'
  },
  {
    id: 'beauty-cosmetics',
    name: 'Beauty & Cosmetics',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
    description: 'Beauty and cosmetic products',
    color: 'bg-fuchsia-100 text-fuchsia-700'
  },
  {
    id: 'health-hygiene',
    name: 'Health & Hygiene',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    description: 'Health supplements and hygiene products',
    color: 'bg-teal-100 text-teal-700'
  },
  {
    id: 'detergents-cleaning',
    name: 'Detergents & Cleaning',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400',
    description: 'Cleaning supplies and detergents',
    color: 'bg-sky-100 text-sky-700'
  },
  {
    id: 'kitchen-homeware',
    name: 'Kitchen, Pooja & Homeware',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
    description: 'Kitchen essentials and home items',
    color: 'bg-violet-100 text-violet-700'
  },
  {
    id: 'stationery-games',
    name: 'Stationery & Games',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    description: 'Office supplies and entertainment',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    id: 'pet-store',
    name: 'Pet Store',
    icon: Pet,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
    description: 'Everything for your furry friends',
    color: 'bg-green-100 text-green-700'
  }
];

export const categoryMapping: Record<string, string> = {
  'fruits-vegetables': 'food',
  'bakery-dairy': 'food', 
  'breakfast': 'food',
  'meat-fish': 'food',
  'masalas-oils': 'food',
  'atta-rice-dals': 'food',
  'chips-biscuits': 'food',
  'beverages': 'food',
  'frozen-foods': 'food',
  'chocolates-ice-cream': 'food',
  'gourmet-world-food': 'food',
  'baby-care': 'wellness',
  'mens-grooming': 'wellness',
  'bath-body-hair': 'wellness',
  'beauty-cosmetics': 'wellness',
  'health-hygiene': 'supplements',
  'detergents-cleaning': 'wellness',
  'kitchen-homeware': 'fitness_gear',
  'stationery-games': 'fitness_gear',
  'pet-store': 'wellness'
};

// Enhanced category mapping for better product filtering
export const enhancedCategoryMapping: Record<string, { 
  primary: string; 
  subcategories: string[];
  searchTerms: string[];
}> = {
  'fruits-vegetables': {
    primary: 'food',
    subcategories: ['fruits', 'vegetables', 'leafy-greens', 'organic'],
    searchTerms: ['fruit', 'vegetable', 'organic', 'fresh', 'spinach', 'avocado', 'tomato']
  },
  'bakery-dairy': {
    primary: 'food',
    subcategories: ['bread', 'dairy', 'bakery', 'milk'],
    searchTerms: ['bread', 'milk', 'yogurt', 'cheese', 'dairy', 'bakery', 'sourdough']
  },
  'breakfast': {
    primary: 'food',
    subcategories: ['cereals', 'spreads', 'oats'],
    searchTerms: ['breakfast', 'oats', 'cereal', 'morning', 'butter', 'quinoa']
  },
  'meat-fish': {
    primary: 'food',
    subcategories: ['eggs', 'fish', 'meat'],
    searchTerms: ['egg', 'fish', 'salmon', 'protein', 'meat']
  },
  'masalas-oils': {
    primary: 'food',
    subcategories: ['oils', 'spices', 'dry-fruits'],
    searchTerms: ['oil', 'spice', 'masala', 'turmeric', 'coconut', 'olive']
  },
  'atta-rice-dals': {
    primary: 'food',
    subcategories: ['grains', 'rice', 'dal', 'flour'],
    searchTerms: ['rice', 'grain', 'quinoa', 'atta', 'dal', 'brown', 'basmati']
  },
  'chips-biscuits': {
    primary: 'food',
    subcategories: ['chips', 'biscuits', 'snacks', 'energy-bars'],
    searchTerms: ['chip', 'snack', 'biscuit', 'healthy', 'energy', 'multigrain']
  },
  'beverages': {
    primary: 'food',
    subcategories: ['tea', 'juices', 'drinks'],
    searchTerms: ['tea', 'juice', 'drink', 'beverage', 'green', 'cold-pressed']
  },
  'frozen-foods': {
    primary: 'food',
    subcategories: ['frozen', 'ready-to-eat'],
    searchTerms: ['frozen', 'instant', 'ready']
  },
  'chocolates-ice-cream': {
    primary: 'food',
    subcategories: ['chocolate', 'ice-cream', 'desserts'],
    searchTerms: ['chocolate', 'dessert', 'sweet', 'ice', 'dark', 'cocoa']
  },
  'gourmet-world-food': {
    primary: 'food',
    subcategories: ['gourmet', 'international'],
    searchTerms: ['gourmet', 'premium', 'international']
  },
  'baby-care': {
    primary: 'wellness',
    subcategories: ['baby-food', 'baby-care'],
    searchTerms: ['baby', 'infant', 'care']
  },
  'mens-grooming': {
    primary: 'wellness',
    subcategories: ['grooming', 'mens-care'],
    searchTerms: ['men', 'grooming', 'shave']
  },
  'bath-body-hair': {
    primary: 'wellness',
    subcategories: ['bath', 'body-care', 'hair-care', 'skincare'],
    searchTerms: ['bath', 'body', 'hair', 'soap', 'face', 'mask', 'herbal']
  },
  'beauty-cosmetics': {
    primary: 'wellness',
    subcategories: ['cosmetics', 'beauty', 'aromatherapy'],
    searchTerms: ['beauty', 'cosmetic', 'makeup', 'essential', 'oil']
  },
  'health-hygiene': {
    primary: 'supplements',
    subcategories: ['vitamins', 'supplements', 'probiotics', 'protein'],
    searchTerms: ['vitamin', 'supplement', 'health', 'probiotic', 'omega', 'whey']
  },
  'detergents-cleaning': {
    primary: 'wellness',
    subcategories: ['cleaning', 'detergent'],
    searchTerms: ['clean', 'detergent', 'wash']
  },
  'kitchen-homeware': {
    primary: 'fitness_gear',
    subcategories: ['kitchen', 'homeware'],
    searchTerms: ['kitchen', 'home', 'utensil']
  },
  'stationery-games': {
    primary: 'fitness_gear',
    subcategories: ['stationery', 'games', 'yoga', 'resistance'],
    searchTerms: ['stationery', 'game', 'book', 'yoga', 'mat', 'resistance', 'bands']
  },
  'pet-store': {
    primary: 'wellness',
    subcategories: ['pet-food', 'pet-care'],
    searchTerms: ['pet', 'dog', 'cat', 'animal']
  }
};