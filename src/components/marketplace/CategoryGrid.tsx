import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { marketplaceCategories, CategoryData } from '@/data/marketplaceCategories';

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  return (
    <div className="py-8">
      <div className="mb-8">
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
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80"
              onClick={() => onCategorySelect(category.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="relative mb-3">
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                </div>
                
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white leading-tight">
                  {category.name}
                </h3>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;