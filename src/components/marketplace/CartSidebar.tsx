
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  total: number;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  total
}) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log('🛒 Proceeding to checkout with', cart.length, 'items');
    onClose();
    navigate('/checkout');
  };

  const handleQuantityIncrease = (productId: string, currentQuantity: number) => {
    console.log('➕ Increasing quantity for product:', productId);
    onUpdateQuantity(productId, currentQuantity + 1);
  };

  const handleQuantityDecrease = (productId: string, currentQuantity: number) => {
    console.log('➖ Decreasing quantity for product:', productId);
    if (currentQuantity > 1) {
      onUpdateQuantity(productId, currentQuantity - 1);
    }
  };

  const handleRemoveItem = (productId: string) => {
    console.log('🗑️ Removing item from cart:', productId);
    onRemoveItem(productId);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-96 flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({cart.length})
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-auto py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-8 py-8">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm">Add some products to get started!</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 border rounded-lg bg-white shadow-sm">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={item.product.image_urls?.[0] || '/placeholder.svg'}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-gray-500 mb-1">{item.product.brand}</p>
                    <p className="font-semibold text-sm text-green-600">
                      ₹{formatPrice(item.product.price)}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityDecrease(item.product.id, item.quantity)}
                          className="h-6 w-6 p-0"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <Badge variant="secondary" className="px-2 py-1">
                          {item.quantity}
                        </Badge>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityIncrease(item.product.id, item.quantity)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="text-right mt-1">
                      <span className="text-xs text-gray-500">
                        Subtotal: ₹{formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="border-t pt-4 space-y-4 bg-gray-50 p-4 rounded-t-lg">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Items ({cart.length}):</span>
                  <span>₹{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Delivery:</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total:</span>
                    <span className="font-bold text-xl text-green-600">
                      ₹{formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleCheckout} 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                Proceed to Checkout
              </Button>
              
              <Button 
                variant="outline" 
                onClick={onClose}
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
