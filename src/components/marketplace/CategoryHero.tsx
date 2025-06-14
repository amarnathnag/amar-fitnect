
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Leaf, Heart, Award, Sparkles } from 'lucide-react';

const CategoryHero = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  const categoryInfo = {
    dairy: {
      title: 'Dairy & Alternatives',
      description: 'Fresh milk, yogurt, cheese and plant-based alternatives for daily nutrition',
      gradient: 'from-blue-400 to-cyan-300',
      icon: <Leaf className="h-8 w-8" />
    },
    bakery: {
      title: 'Bakery & Breads',
      description: 'Wholesome breads, cookies, and baked goods for every meal',
      gradient: 'from-amber-400 to-orange-300',
      icon: <Award className="h-8 w-8" />
    },
    oils: {
      title: 'Healthy Oils & Fats',
      description: 'Premium cooking oils and healthy fats for heart-healthy cooking',
      gradient: 'from-yellow-400 to-amber-300',
      icon: <Heart className="h-8 w-8" />
    },
    grains: {
      title: 'Grains & Cereals',
      description: 'Whole grains, cereals, and superfoods for sustained energy',
      gradient: 'from-green-400 to-emerald-300',
      icon: <Sparkles className="h-8 w-8" />
    }
  };

  const currentCategory = categoryInfo[category as keyof typeof categoryInfo];

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="relative container-custom py-16">
        <div className="max-w-4xl mx-auto text-center">
          {currentCategory ? (
            <div className="space-y-6">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${currentCategory.gradient} text-white shadow-lg`}>
                {currentCategory.icon}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {currentCategory.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {currentCategory.description}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                  <Leaf className="h-3 w-3 mr-1" />
                  Organic Options
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                  <Heart className="h-3 w-3 mr-1" />
                  Health Rated
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                  <Award className="h-3 w-3 mr-1" />
                  Premium Quality
                </Badge>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg">
                <Sparkles className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                  AmarHealth Marketplace
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Discover 100+ healthy products with AI-powered health insights. 
                  Shop smart, live healthy with our curated selection of premium groceries.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                  100+ Products
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                  AI Health Insights
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                  10+ Categories
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                  Premium Quality
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
