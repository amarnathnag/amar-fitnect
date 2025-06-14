
import React from 'react';
import EnhancedProductCard from './EnhancedProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, Search } from 'lucide-react';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 dark:bg-gray-800/80 dark:border-gray-700">
            <Skeleton className="h-48 w-full rounded-xl mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-6">
          <Search className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          No products found
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
        </p>
        
        {/* Debugging info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            <p className="font-medium mb-2">Debug Info:</p>
            <p>• Loading: {loading ? 'true' : 'false'}</p>
            <p>• Products count: {products.length}</p>
            <p>• Check if filters are too restrictive</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <EnhancedProductCard 
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {/* Load More Section */}
      {products.length > 0 && (
        <div className="text-center pt-8">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Package className="h-4 w-4" />
            Showing {products.length} products
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
