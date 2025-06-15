
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Milk, Cookie, Droplet, Wheat, Apple, Leaf, Package, Heart } from 'lucide-react';

interface FeaturedCategoriesProps {
  onCategorySelect: (category: string) => void;
}

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 'dairy',
      name: 'Dairy & Alternatives',
      description: 'Fresh milk, yogurt, cheese and plant-based alternatives',
      icon: <Milk className="h-8 w-8" />,
      gradient: 'from-blue-400 to-cyan-300',
      productCount: '25+ Products',
      featured: ['Organic Milk', 'Greek Yogurt', 'Almond Milk']
    },
    {
      id: 'bakery',
      name: 'Bakery & Breads',
      description: 'Wholesome breads, cookies, and baked goods',
      icon: <Cookie className="h-8 w-8" />,
      gradient: 'from-amber-400 to-orange-300',
      productCount: '30+ Products',
      featured: ['Whole Wheat Bread', 'Multigrain Cookies', 'Sourdough']
    },
    {
      id: 'oils',
      name: 'Healthy Oils',
      description: 'Premium cooking oils and healthy fats',
      icon: <Droplet className="h-8 w-8" />,
      gradient: 'from-yellow-400 to-amber-300',
      productCount: '15+ Products',
      featured: ['Olive Oil', 'Coconut Oil', 'Avocado Oil']
    },
    {
      id: 'grains',
      name: 'Grains & Cereals',
      description: 'Whole grains, cereals, and superfoods',
      icon: <Wheat className="h-8 w-8" />,
      gradient: 'from-green-400 to-emerald-300',
      productCount: '20+ Products',
      featured: ['Quinoa', 'Oats', 'Brown Rice']
    },
    {
      id: 'healthy_snacks',
      name: 'Healthy Snacks',
      description: 'Nutritious snacks and energy bars',
      icon: <Apple className="h-8 w-8" />,
      gradient: 'from-red-400 to-pink-300',
      productCount: '18+ Products',
      featured: ['Protein Bars', 'Nuts', 'Dried Fruits']
    },
    {
      id: 'health_supplements',
      name: 'Health Supplements',
      description: 'Vitamins, minerals, and wellness products',
      icon: <Heart className="h-8 w-8" />,
      gradient: 'from-purple-400 to-indigo-300',
      productCount: '12+ Products',
      featured: ['Multivitamins', 'Protein Powder', 'Omega-3']
    },
    {
      id: 'grocery',
      name: 'Grocery Essentials',
      description: 'Daily cooking essentials and pantry staples',
      icon: <Package className="h-8 w-8" />,
      gradient: 'from-emerald-400 to-teal-300',
      productCount: '10+ Products',
      featured: ['Desi Ghee', 'Turmeric Powder', 'Chakki Atta']
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    console.log('📂 Category button clicked:', categoryId);
    console.log('🔗 Triggering category selection...');
    
    // Call the parent callback to handle category selection
    onCategorySelect(categoryId);
  };

  const handleSpecialCollectionClick = (collectionType: string) => {
    console.log('⭐ Special collection clicked:', collectionType);
    console.log('🔗 Triggering special collection selection...');
    
    // Call the parent callback to handle special collection selection
    onCategorySelect(collectionType);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Shop by Category
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore our comprehensive collection of healthy products, organized by category for easy shopping
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Category Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${category.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>

                {/* Category Info */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {category.description}
                  </p>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300">
                    {category.productCount}
                  </Badge>
                </div>

                {/* Featured Products */}
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Featured:</p>
                  <div className="flex flex-wrap gap-1">
                    {category.featured.map((product, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Browse Button */}
                <Button 
                  onClick={() => handleCategoryClick(category.id)}
                  className="w-full group-hover:bg-primary/90 transition-colors"
                >
                  Browse {category.name}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Special Collections Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-gray-200 dark:border-gray-600">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg">
            <Leaf className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Special Collections
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Discover curated collections for specific dietary needs and health goals
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Button variant="outline" onClick={() => handleSpecialCollectionClick('organic')} className="bg-white/80 backdrop-blur-sm">
              <Leaf className="h-4 w-4 mr-2" />
              Organic Only
            </Button>
            <Button variant="outline" onClick={() => handleSpecialCollectionClick('vegan')} className="bg-white/80 backdrop-blur-sm">
              <Heart className="h-4 w-4 mr-2" />
              Vegan Products
            </Button>
            <Button variant="outline" onClick={() => handleSpecialCollectionClick('premium')} className="bg-white/80 backdrop-blur-sm">
              <Package className="h-4 w-4 mr-2" />
              Premium Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
