
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Share2, Leaf, Award } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  health_score: number;
  subcategory: string;
  is_organic: boolean;
  is_vegan: boolean;
  stock_quantity: number;
  health_impact_summary: string;
  description?: string;
}

interface ProductInfoProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart }) => {
  const getHealthScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatPrice = (price: number) => {
    const displayPrice = price > 1000 ? price / 100 : price;
    return displayPrice.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">{product.brand}</p>
        <p className="text-sm text-gray-500">{product.subcategory}</p>
      </div>

      <div className="flex items-center gap-4">
        <Badge className={`text-lg px-3 py-1 ${getHealthScoreColor(product.health_score)}`}>
          <Award className="h-4 w-4 mr-1" />
          Health Score: {product.health_score}/10
        </Badge>
        
        <div className="flex gap-2">
          {product.is_organic && (
            <Badge variant="secondary">
              <Leaf className="h-3 w-3 mr-1" />
              Organic
            </Badge>
          )}
          {product.is_vegan && (
            <Badge variant="secondary">
              <Heart className="h-3 w-3 mr-1" />
              Vegan
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-bold text-primary">₹{formatPrice(product.price)}</div>
        <p className="text-sm text-gray-500">
          {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">{product.health_impact_summary}</p>
        {product.description && (
          <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button 
          onClick={onAddToCart}
          disabled={product.stock_quantity === 0}
          className="flex-1"
          size="lg"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
        <Button variant="outline" size="lg">
          <Heart className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="lg">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
