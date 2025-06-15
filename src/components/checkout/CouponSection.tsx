
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ticket, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CouponSectionProps {
  onCouponApply: (discount: number, couponCode: string) => void;
  onCouponRemove: () => void;
  appliedCoupon?: string;
  discount?: number;
}

const CouponSection: React.FC<CouponSectionProps> = ({
  onCouponApply,
  onCouponRemove,
  appliedCoupon,
  discount = 0
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock coupon data - in real app this would come from database
  const validCoupons = {
    'SAVE10': { discount: 10, type: 'percentage', minAmount: 500 },
    'FLAT50': { discount: 50, type: 'fixed', minAmount: 200 },
    'HEALTH20': { discount: 20, type: 'percentage', minAmount: 1000 },
    'WELCOME15': { discount: 15, type: 'percentage', minAmount: 300 }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const coupon = validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons];
      
      if (coupon) {
        onCouponApply(coupon.discount, couponCode.toUpperCase());
        toast({
          title: "Coupon Applied!",
          description: `You saved ${coupon.type === 'percentage' ? coupon.discount + '%' : '₹' + coupon.discount}`,
        });
        setCouponCode('');
      } else {
        toast({
          title: "Invalid Coupon",
          description: "The coupon code you entered is not valid",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  const handleRemoveCoupon = () => {
    onCouponRemove();
    toast({
      title: "Coupon Removed",
      description: "Coupon has been removed from your order",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ticket className="h-5 w-5" />
          Apply Coupon
        </CardTitle>
      </CardHeader>
      <CardContent>
        {appliedCoupon ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {appliedCoupon}
                </Badge>
                <span className="text-sm text-green-700">
                  Discount: ₹{discount}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveCoupon}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1"
              />
              <Button 
                onClick={handleApplyCoupon}
                disabled={loading || !couponCode.trim()}
                className="px-6"
              >
                {loading ? 'Applying...' : 'Apply'}
              </Button>
            </div>
            
            <div className="text-xs text-gray-500">
              <p className="font-medium mb-1">Available Coupons:</p>
              <div className="space-y-1">
                <p>• SAVE10 - 10% off on orders above ₹500</p>
                <p>• FLAT50 - ₹50 off on orders above ₹200</p>
                <p>• HEALTH20 - 20% off on orders above ₹1000</p>
                <p>• WELCOME15 - 15% off on orders above ₹300</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CouponSection;
