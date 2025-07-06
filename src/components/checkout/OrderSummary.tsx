
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatPrice } from '@/utils/cartCalculations';

interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    image_urls: string[];
  };
  quantity: number;
}

interface OrderSummaryProps {
  cart: CartItem[];
  cartTotal: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  couponDiscount?: number;
  appliedCoupon?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  cart, 
  cartTotal, 
  onUpdateQuantity, 
  onRemoveItem,
  couponDiscount = 0,
  appliedCoupon
}) => {
  const finalTotal = Math.max(0, cartTotal - couponDiscount);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem(productId);
    } else {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Order Summary
          <Badge variant="secondary">{cart.length} items</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-start p-3 border rounded-lg">
              <div className="flex gap-3 flex-1">
                <img
                  src={item.product.image_urls?.[0] || '/placeholder.svg'}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-2">{item.product.name}</p>
                  <p className="text-xs text-gray-500">{item.product.brand}</p>
                  <p className="text-sm font-semibold text-green-600">
                    ₹{formatPrice(item.product.price)} each
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                    className="h-6 w-6 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <Badge variant="secondary" className="px-2 py-1 min-w-[2rem] text-center">
                    {item.quantity}
                  </Badge>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveItem(item.product.id)}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700 ml-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                
                <p className="font-semibold text-sm">
                  ₹{formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal ({cart.length} items):</span>
              <span>₹{formatPrice(cartTotal)}</span>
            </div>
            
            {appliedCoupon && couponDiscount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Coupon discount ({appliedCoupon}):</span>
                <span>-₹{formatPrice(couponDiscount)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-sm">
              <span>Delivery charges:</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Taxes:</span>
              <span>Included</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-green-600">₹{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
