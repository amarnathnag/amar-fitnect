
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  health_score: number;
  image_urls: string[];
  health_impact_summary: string;
  is_organic: boolean;
  is_vegetarian: boolean;
  is_vegan: boolean;
  stock_quantity: number;
  description?: string;
  user_rating?: number;
  review_count?: number;
  category?: string;
  subcategory?: string;
}

interface CategorySectionProps {
  title: string;
  description: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  title, 
  description, 
  products, 
  onAddToCart 
}) => {
  if (products.length === 0) return null;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySection;
