import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { marketplaceCategories, CategoryData } from '@/data/marketplaceCategories';
import { ArrowRight, Star, TrendingUp, Zap, Crown } from 'lucide-react';

interface EnhancedCategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
}

const EnhancedCategoryGrid: React.FC<EnhancedCategoryGridProps> = ({ onCategorySelect }) => {
  const featuredCategories = marketplaceCategories.slice(0, 3);
  const regularCategories = marketplaceCategories.slice(3);

  const quickStats = [
    { icon: Star, label: 'Premium Categories', value: '25+', gradient: 'from-yellow-500 to-orange-500' },
    { icon: TrendingUp, label: 'Best Sellers', value: '50K+', gradient: 'from-green-500 to-emerald-500' },
    { icon: Zap, label: 'Flash Deals', value: 'Daily', gradient: 'from-purple-500 to-pink-500' },
    { icon: Crown, label: 'Premium Members', value: '10K+', gradient: 'from-blue-500 to-cyan-500' }
  ];

  return (
    <div className="py-8 space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
            <Star className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Premium Categories
          </h2>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore our curated collection of premium health products, each category designed to support your wellness journey
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="group bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${stat.gradient} p-2.5 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                <stat.icon className="h-7 w-7 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Featured Categories */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Categories</h3>
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2">
            ⭐ Most Popular
          </Badge>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {featuredCategories.map((category: CategoryData) => {
            const IconComponent = category.icon;
            
            return (
              <Card 
                key={category.id}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
                onClick={() => onCategorySelect(category.id)}
              >
                <CardContent className="p-0">
                  {/* Hero Image */}
                  <div className="relative h-32 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{
                        backgroundImage: `url(${category.image})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-900 font-medium">Featured</Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center bg-white/95 dark:bg-gray-800/95 shadow-lg`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <Button variant="ghost" className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      Explore Category
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* All Categories Grid */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">All Categories</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {regularCategories.map((category: CategoryData) => {
            const IconComponent = category.icon;
            
            return (
              <Card 
                key={category.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-white/90 backdrop-blur-sm dark:bg-gray-800/90"
                onClick={() => onCategorySelect(category.id)}
              >
                <CardContent className="p-4 text-center">
                  {/* Category Image Background */}
                  <div className="relative mb-3 overflow-hidden rounded-2xl">
                    <div 
                      className="w-full h-16 bg-cover bg-center bg-gray-100 dark:bg-gray-700 rounded-2xl relative transform group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundImage: `url(${category.image})`,
                      }}
                    >
                      {/* Overlay with icon */}
                      <div className="absolute inset-0 bg-black/20 dark:bg-black/40 rounded-2xl flex items-center justify-center">
                        <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-white/95 dark:bg-gray-800/95 shadow-lg`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h4>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Premium Subscription CTA */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl p-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative">
          <Crown className="h-12 w-12 mx-auto mb-4 opacity-90" />
          <h3 className="text-2xl font-bold mb-2">Unlock Premium Categories</h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Get access to exclusive premium products, AI recommendations, and personalized health insights
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Upgrade to Premium
            <Crown className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCategoryGrid;