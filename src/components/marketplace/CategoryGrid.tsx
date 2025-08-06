import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { marketplaceCategories, CategoryData } from '@/data/marketplaceCategories';

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  return (
    <div className="py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Shop by Category
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Browse through our wide range of categories to find exactly what you need
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {marketplaceCategories.map((category: CategoryData) => {
          const IconComponent = category.icon;
          
          return (
            <Card 
              key={category.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800"
              onClick={() => onCategorySelect(category.id)}
            >
              <CardContent className="p-4 text-center">
                {/* Category Image Background */}
                <div className="relative mb-3 overflow-hidden rounded-2xl">
                  <div 
                    className="w-full h-20 bg-cover bg-center bg-gray-100 dark:bg-gray-700 rounded-2xl relative"
                    style={{
                      backgroundImage: `url(${category.image})`,
                    }}
                  >
                    {/* Overlay with icon */}
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40 rounded-2xl flex items-center justify-center">
                      <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-white/90 dark:bg-gray-800/90`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white leading-tight mb-1">
                  {category.name}
                </h3>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Quick Stats */}
      <div className="mt-12 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-600">20+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-600">1000+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-600">Fast</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Delivery</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4">
            <div className="text-2xl font-bold text-orange-600">Fresh</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Quality</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;