
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Leaf, Heart, Star, Award, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuantityOption {
  value: number;
  unit: string;
  price: number;
}

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
  quantity_options?: QuantityOption[];
  warnings?: string[];
  allergens?: string[];
}

interface EnhancedProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: QuantityOption) => void;
}

const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const [selectedQuantity, setSelectedQuantity] = useState<QuantityOption>(
    product.quantity_options?.[0] || { value: 1, unit: 'unit', price: product.price }
  );

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
      supplements: 'Supplements',
      protein: 'Protein',
      breakfast: 'Breakfast',
      sweeteners: 'Natural Sweeteners'
    };
    return labels[category] || category;
  };

  const handleCardClick = () => {
    navigate(`/marketplace/product/${product.id}`);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedQuantity);
  };

  const handleQuantityChange = (value: string) => {
    const option = product.quantity_options?.find(opt => opt.value.toString() === value);
    if (option) {
      setSelectedQuantity(option);
    }
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

          {product.subcategory && (
            <Badge variant="outline" className="text-xs">
              {getCategoryLabel(product.subcategory)}
            </Badge>
          )}
          
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{product.brand}</p>
          </div>

          {/* Warnings */}
          {product.warnings && product.warnings.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.warnings.slice(0, 2).map((warning, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {warning.length > 20 ? `${warning.substring(0, 20)}...` : warning}
                </Badge>
              ))}
            </div>
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

          {/* Quantity Selector */}
          {product.quantity_options && product.quantity_options.length > 1 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity:</label>
              <Select value={selectedQuantity.value.toString()} onValueChange={handleQuantityChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.quantity_options.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.unit} - ₹{option.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-2xl font-bold text-primary">₹{selectedQuantity.price}</span>
              {selectedQuantity.unit !== 'unit' && (
                <span className="text-sm text-gray-500 ml-1">({selectedQuantity.unit})</span>
              )}
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
          {product.stock_quantity === 0 ? 'Out of Stock' : `Add ${selectedQuantity.unit} to Cart`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EnhancedProductCard;
