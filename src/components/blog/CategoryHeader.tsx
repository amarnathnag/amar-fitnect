import React from 'react';
import nutritionImage from '@/assets/blog-nutrition-category.jpg';
import fitnessImage from '@/assets/blog-fitness-category.jpg';
import diabetesImage from '@/assets/blog-diabetes-category.jpg';
import womensHealthImage from '@/assets/blog-womens-health-category.jpg';
import businessImage from '@/assets/blog-business-category.jpg';
import mentalHealthImage from '@/assets/blog-mental-health-category.jpg';

const categoryImages: Record<string, string> = {
  'Nutrition': nutritionImage,
  'Fitness': fitnessImage,
  'Diabetes': diabetesImage,
  "Women's Health": womensHealthImage,
  'Business': businessImage,
  'Mental Health': mentalHealthImage,
};

interface CategoryHeaderProps {
  category?: string;
}

const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  if (!category || !categoryImages[category]) return null;

  return (
    <div className="relative h-48 rounded-lg overflow-hidden mb-8">
      <img 
        src={categoryImages[category]} 
        alt={`${category} category`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
        <div className="text-white p-6">
          <h2 className="text-3xl font-bold mb-2">{category}</h2>
          <p className="text-lg opacity-90">Expert insights and practical advice</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;