
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, cartTotal }) => {
  const formatPrice = (price: number) => {
    const displayPrice = price > 1000 ? price / 100 : price;
    return displayPrice.toFixed(2);
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
              <div className="flex gap-3">
                <img
                  src={item.product.image_urls?.[0] || '/placeholder.svg'}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium text-sm">{item.product.name}</p>
                  <p className="text-xs text-gray-500">{item.product.brand}</p>
                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹{formatPrice(item.product.price * item.quantity)}</p>
                <p className="text-xs text-gray-500">₹{formatPrice(item.product.price)} each</p>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal ({cart.length} items):</span>
              <span>₹{formatPrice(cartTotal)}</span>
            </div>
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
                <span className="text-green-600">₹{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
