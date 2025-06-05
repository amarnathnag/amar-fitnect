
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Leaf, Heart } from 'lucide-react';
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
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const getHealthScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleCardClick = () => {
    navigate(`/marketplace/product/${product.id}`);
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent className="p-4" onClick={handleCardClick}>
        <div className="aspect-square mb-4 overflow-hidden rounded-lg">
          <img 
            src={product.image_urls?.[0] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge className={`text-xs ${getHealthScoreColor(product.health_score)}`}>
              Health Score: {product.health_score}/10
            </Badge>
            <div className="flex gap-1">
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
            </div>
          </div>
          
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{product.brand}</p>
          <p className="text-xs text-gray-500 line-clamp-2">{product.health_impact_summary}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">₹{product.price}</span>
            <span className="text-sm text-gray-500">
              {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          disabled={product.stock_quantity === 0}
          className="w-full"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
