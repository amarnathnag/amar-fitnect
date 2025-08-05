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
    image: 'photo-1618160702438-9b02ab6515c9',
    description: 'Fresh organic fruits and vegetables',
    color: 'bg-green-100 text-green-700'
  },
  {
    id: 'bakery-dairy',
    name: 'Bakery, Cakes & Dairy',
    icon: Cake,
    image: 'photo-1465146344425-f00d5f5c8f07',
    description: 'Fresh bakery items and dairy products',
    color: 'bg-yellow-100 text-yellow-700'
  },
  {
    id: 'breakfast',
    name: 'Breakfast & More',
    icon: Coffee,
    image: 'photo-1506744038136-46273834b3fb',
    description: 'Start your day right with healthy breakfast options',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    id: 'meat-fish',
    name: 'Eggs, Meat & Fish',
    icon: Drumstick,
    image: 'photo-1582562124811-c09040d0a901',
    description: 'Fresh protein sources for a healthy diet',
    color: 'bg-red-100 text-red-700'
  },
  {
    id: 'masalas-oils',
    name: 'Masalas, Oils & Dry Fruits',
    icon: Beef,
    image: 'photo-1501854140801-50d01698950b',
    description: 'Spices, cooking oils and nutritious dry fruits',
    color: 'bg-amber-100 text-amber-700'
  },
  {
    id: 'atta-rice-dals',
    name: 'Atta, Rice, Dals & Sugar',
    icon: Wheat,
    image: 'photo-1618160702438-9b02ab6515c9',
    description: 'Essential grains and staples',
    color: 'bg-lime-100 text-lime-700'
  },
  {
    id: 'chips-biscuits',
    name: 'Chips, Biscuits & Namkeen',
    icon: Cookie,
    image: 'photo-1465146344425-f00d5f5c8f07',
    description: 'Healthy snacks and treats',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    id: 'beverages',
    name: 'Hot & Cold Beverages',
    icon: Beverage,
    image: 'photo-1506744038136-46273834b3fb',
    description: 'Refreshing drinks and beverages',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'frozen-foods',
    name: 'Instant & Frozen Foods',
    icon: Snowflake,
    image: 'photo-1582562124811-c09040d0a901',
    description: 'Quick and convenient meal options',
    color: 'bg-cyan-100 text-cyan-700'
  },
  {
    id: 'chocolates-ice-cream',
    name: 'Chocolates & Ice Creams',
    icon: IceCream,
    image: 'photo-1501854140801-50d01698950b',
    description: 'Sweet treats and desserts',
    color: 'bg-pink-100 text-pink-700'
  },
  {
    id: 'gourmet-world-food',
    name: 'Gourmet & World Food',
    icon: Globe,
    image: 'photo-1618160702438-9b02ab6515c9',
    description: 'International cuisines and gourmet items',
    color: 'bg-indigo-100 text-indigo-700'
  },
  {
    id: 'baby-care',
    name: 'Baby Care',
    icon: Baby,
    image: 'photo-1465146344425-f00d5f5c8f07',
    description: 'Everything for your little ones',
    color: 'bg-rose-100 text-rose-700'
  },
  {
    id: 'mens-grooming',
    name: "Men's Grooming",
    icon: User,
    image: 'photo-1506744038136-46273834b3fb',
    description: 'Grooming essentials for men',
    color: 'bg-slate-100 text-slate-700'
  },
  {
    id: 'bath-body-hair',
    name: 'Bath, Body & Hair',
    icon: Sparkles,
    image: 'photo-1582562124811-c09040d0a901',
    description: 'Personal care and beauty products',
    color: 'bg-emerald-100 text-emerald-700'
  },
  {
    id: 'beauty-cosmetics',
    name: 'Beauty & Cosmetics',
    icon: Heart,
    image: 'photo-1501854140801-50d01698950b',
    description: 'Beauty and cosmetic products',
    color: 'bg-fuchsia-100 text-fuchsia-700'
  },
  {
    id: 'health-hygiene',
    name: 'Health & Hygiene',
    icon: Heart,
    image: 'photo-1618160702438-9b02ab6515c9',
    description: 'Health supplements and hygiene products',
    color: 'bg-teal-100 text-teal-700'
  },
  {
    id: 'detergents-cleaning',
    name: 'Detergents & Cleaning',
    icon: Zap,
    image: 'photo-1465146344425-f00d5f5c8f07',
    description: 'Cleaning supplies and detergents',
    color: 'bg-sky-100 text-sky-700'
  },
  {
    id: 'kitchen-homeware',
    name: 'Kitchen, Pooja & Homeware',
    icon: Home,
    image: 'photo-1506744038136-46273834b3fb',
    description: 'Kitchen essentials and home items',
    color: 'bg-violet-100 text-violet-700'
  },
  {
    id: 'stationery-games',
    name: 'Stationery & Games',
    icon: BookOpen,
    image: 'photo-1582562124811-c09040d0a901',
    description: 'Office supplies and entertainment',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    id: 'pet-store',
    name: 'Pet Store',
    icon: Pet,
    image: 'photo-1501854140801-50d01698950b',
    description: 'Everything for your furry friends',
    color: 'bg-green-100 text-green-700'
  }
];

export const categoryMapping: Record<string, string> = {
  'fruits-vegetables': 'grocery',
  'bakery-dairy': 'dairy',
  'breakfast': 'breakfast',
  'meat-fish': 'protein',
  'masalas-oils': 'oils',
  'atta-rice-dals': 'grains',
  'chips-biscuits': 'healthy_snacks',
  'beverages': 'grocery',
  'frozen-foods': 'grocery',
  'chocolates-ice-cream': 'healthy_snacks',
  'gourmet-world-food': 'premium',
  'baby-care': 'grocery',
  'mens-grooming': 'grocery',
  'bath-body-hair': 'grocery',
  'beauty-cosmetics': 'grocery',
  'health-hygiene': 'health_supplements',
  'detergents-cleaning': 'grocery',
  'kitchen-homeware': 'grocery',
  'stationery-games': 'grocery',
  'pet-store': 'grocery'
};