
import React from 'react';
import EnhancedProductCard from './EnhancedProductCard';
import { Skeleton } from '@/components/ui/skeleton';

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
  category: string;
  subcategory: string;
  quantity_options?: Array<{
    value: number;
    unit: string;
    price: number;
  }>;
  warnings?: string[];
  allergens?: string[];
}

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product, quantityOption?: any) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading, onAddToCart }) => {
  console.log('ProductGrid - Loading:', loading, 'Products count:', products.length);
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Try adjusting your filters or search terms
        </p>
        <div className="text-sm text-gray-500">
          <p>Debugging info:</p>
          <p>• Loading state: {loading ? 'true' : 'false'}</p>
          <p>• Products array length: {products.length}</p>
          <p>• Current URL filters may be filtering out all products</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <EnhancedProductCard 
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
