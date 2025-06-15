
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { useToast } from '@/hooks/use-toast';
import OrderSummary from '@/components/checkout/OrderSummary';
import DeliveryAddressForm from '@/components/checkout/DeliveryAddressForm';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import CheckoutAlert from '@/components/checkout/CheckoutAlert';
import CheckoutActions from '@/components/checkout/CheckoutActions';
import CheckoutErrorState from '@/components/checkout/CheckoutErrorState';
import CouponSection from '@/components/checkout/CouponSection';
import { useCheckoutValidation } from '@/components/checkout/CheckoutValidation';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const { toast } = useToast();
  const { validateAddress } = useCheckoutValidation();
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  // Early returns for error states
  if (!user) {
    return (
      <CheckoutErrorState
        title="Login Required"
        message="You need to be logged in to proceed with checkout"
        buttonText="Login to Continue"
        onButtonClick={() => navigate('/auth')}
      />
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <CheckoutErrorState
        title="Cart is Empty"
        message="Add some healthy products to your cart before checkout"
        buttonText="Continue Shopping"
        onButtonClick={() => navigate('/marketplace')}
      />
    );
  }

  const finalTotal = Math.max(0, cartTotal - couponDiscount);

  const handleCouponApply = (discount: number, couponCode: string) => {
    setCouponDiscount(discount);
    setAppliedCoupon(couponCode);
  };

  const handleCouponRemove = () => {
    setCouponDiscount(0);
    setAppliedCoupon('');
  };

  const handlePlaceOrder = async () => {
    console.log('🚀 Starting order placement process...');
    
    if (!validateAddress(deliveryAddress)) {
      return;
    }

    try {
      setLoading(true);
      console.log('📋 Order data preparation:', {
        user_id: user.id,
        total_amount: finalTotal,
        delivery_address: deliveryAddress,
        cart_items: cart.length,
        coupon_discount: couponDiscount
      });

      const order = await createOrder({
        total_amount: finalTotal,
        delivery_address: deliveryAddress,
        cart: cart,
        coupon_discount: couponDiscount
      });

      console.log('✅ Order placed successfully:', order.id);

      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Order #${order.id.slice(0, 8)} has been confirmed. You can track it in your profile.`,
      });

      // Navigate to profile orders tab
      navigate('/profile?tab=orders');
    } catch (error) {
      console.error('❌ Order placement failed:', error);
      toast({
        title: "Order Failed",
        description: "Unable to place your order. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          <CheckoutHeader />
          <CheckoutAlert />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Address & Coupon */}
            <div className="space-y-6">
              <DeliveryAddressForm 
                deliveryAddress={deliveryAddress}
                setDeliveryAddress={setDeliveryAddress}
              />
              
              <CouponSection
                onCouponApply={handleCouponApply}
                onCouponRemove={handleCouponRemove}
                appliedCoupon={appliedCoupon}
                discount={couponDiscount}
              />
            </div>

            {/* Right Column - Order Summary & Actions */}
            <div className="space-y-6">
              <OrderSummary 
                cart={cart} 
                cartTotal={cartTotal}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                couponDiscount={couponDiscount}
                appliedCoupon={appliedCoupon}
              />
              
              <CheckoutActions
                onPlaceOrder={handlePlaceOrder}
                loading={loading}
                cartLength={cart.length}
                cartTotal={finalTotal}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
