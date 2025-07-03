import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface BuyNowButtonProps {
  product: any;
  variant?: 'buy-now' | 'add-to-cart';
  className?: string;
}

const BuyNowButton: React.FC<BuyNowButtonProps> = ({ 
  product, 
  variant = 'add-to-cart',
  className = '' 
}) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBuyNow = async () => {
    try {
      await addToCart(product);
      navigate('/checkout');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product);
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  if (variant === 'buy-now') {
    return (
      <Button 
        onClick={handleBuyNow}
        className={`w-full bg-orange-500 hover:bg-orange-600 text-white ${className}`}
        size="sm"
      >
        <Zap className="h-4 w-4 mr-2" />
        Buy Now
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleAddToCart}
      variant="outline"
      className={`w-full ${className}`}
      size="sm"
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Add to Cart
    </Button>
  );
};

export default BuyNowButton;