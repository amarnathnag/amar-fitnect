
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface CheckoutActionsProps {
  onPlaceOrder: () => void;
  loading: boolean;
  cartLength: number;
  cartTotal: number;
}

const CheckoutActions: React.FC<CheckoutActionsProps> = ({
  onPlaceOrder,
  loading,
  cartLength,
  cartTotal
}) => {
  const formatPrice = (price: number) => {
    const displayPrice = price > 1000 ? price / 100 : price;
    return displayPrice.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <Button 
        onClick={onPlaceOrder} 
        disabled={loading || cartLength === 0}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        size="lg"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Placing Order...
          </>
        ) : (
          <>
            <CheckCircle className="h-4 w-4 mr-2" />
            Place Order - ₹{formatPrice(cartTotal)}
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        By placing this order, you agree to our terms and conditions. 
        You will receive order confirmation via email.
      </p>
    </div>
  );
};

export default CheckoutActions;
