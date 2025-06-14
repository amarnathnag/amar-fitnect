
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Leaf, Heart, Star, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const getHealthScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-700 bg-green-100 border-green-200';
    if (score >= 7) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 5) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      dairy: 'Dairy',
      bakery: 'Bakery',
      beverages: 'Beverages',
      snacks: 'Snacks',
      grains: 'Grains',
      oils: 'Oils',
      spices: 'Spices',
      frozen: 'Frozen',
      personal_care: 'Personal Care',
      household: 'Household',
      supplements: 'Supplements'
    };
    return labels[category] || category;
  };

  const handleCardClick = () => {
    navigate(`/marketplace/product/${product.id}`);
  };

  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Adding to cart:', product.name);
    onAddToCart();
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] h-full flex flex-col">
      <CardContent className="p-4 flex-grow" onClick={handleCardClick}>
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
          <img 
            src={product.image_urls?.[0] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge className={`text-xs font-semibold ${getHealthScoreColor(product.health_score)}`}>
              <Award className="h-3 w-3 mr-1" />
              Health Score: {product.health_score}/10
            </Badge>
            {product.user_rating && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{product.user_rating}</span>
                <span className="text-xs text-gray-500">({product.review_count})</span>
              </div>
            )}
          </div>

          {product.category && (
            <Badge variant="outline" className="text-xs">
              {getCategoryLabel(product.category)}
            </Badge>
          )}
          
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{product.brand}</p>
          </div>

          {product.description && (
            <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
          )}
          
          <p className="text-xs text-gray-600 line-clamp-2 font-medium">{product.health_impact_summary}</p>
          
          <div className="flex flex-wrap gap-1">
            {product.is_organic && (
              <Badge variant="secondary" className="text-xs">
                <Leaf className="h-3 w-3 mr-1" />
                Organic
              </Badge>
            )}
            {product.is_vegan && (
              <Badge variant="secondary" className="text-xs">
                <Heart className="h-3 w-3 mr-1" />
                Vegan
              </Badge>
            )}
            {product.is_vegetarian && !product.is_vegan && (
              <Badge variant="outline" className="text-xs">
                Vegetarian
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-2xl font-bold text-primary">₹{formatPrice(product.price)}</span>
            </div>
            <div className="text-right">
              <span className={`text-sm font-medium ${product.stock_quantity > 10 ? 'text-green-600' : product.stock_quantity > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCartClick}
          disabled={product.stock_quantity === 0}
          className="w-full"
          variant={product.stock_quantity === 0 ? "secondary" : "default"}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
