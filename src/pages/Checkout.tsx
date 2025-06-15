
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { useToast } from '@/hooks/use-toast';
import OrderSummary from '@/components/checkout/OrderSummary';
import DeliveryAddressForm from '@/components/checkout/DeliveryAddressForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to proceed with checkout</p>
            <Button onClick={() => navigate('/auth')} size="lg">
              Login to Continue
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Add some healthy products to your cart before checkout</p>
            <Button onClick={() => navigate('/marketplace')} size="lg">
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const validateAddress = () => {
    const requiredFields = [
      { field: 'street', label: 'Street Address' },
      { field: 'city', label: 'City' },
      { field: 'state', label: 'State' },
      { field: 'pincode', label: 'Pincode' },
      { field: 'phone', label: 'Phone Number' }
    ];

    for (const { field, label } of requiredFields) {
      if (!deliveryAddress[field as keyof typeof deliveryAddress].trim()) {
        toast({
          title: "Missing Information",
          description: `Please enter ${label}`,
          variant: "destructive",
        });
        return false;
      }
    }

    // Validate pincode format
    if (!/^\d{6}$/.test(deliveryAddress.pincode)) {
      toast({
        title: "Invalid Pincode",
        description: "Please enter a valid 6-digit pincode",
        variant: "destructive",
      });
      return false;
    }

    // Validate phone format
    if (!/^\d{10}$/.test(deliveryAddress.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    console.log('🚀 Starting order placement process...');
    
    if (!validateAddress()) {
      return;
    }

    try {
      setLoading(true);
      console.log('📋 Order data preparation:', {
        user_id: user.id,
        total_amount: cartTotal,
        delivery_address: deliveryAddress,
        cart_items: cart.length
      });

      const order = await createOrder({
        total_amount: cartTotal,
        delivery_address: deliveryAddress,
        cart: cart
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

  const formatPrice = (price: number) => {
    const displayPrice = price > 1000 ? price / 100 : price;
    return displayPrice.toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-gray-600">Review your order and complete your purchase</p>
          </div>

          {/* Success Alert */}
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              All items are in stock and ready for delivery. FREE delivery on this order!
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Delivery Address Form */}
            <DeliveryAddressForm 
              deliveryAddress={deliveryAddress}
              setDeliveryAddress={setDeliveryAddress}
            />

            {/* Order Summary */}
            <div className="space-y-6">
              <OrderSummary cart={cart} cartTotal={cartTotal} />
              
              {/* Place Order Button */}
              <Button 
                onClick={handlePlaceOrder} 
                disabled={loading || cart.length === 0}
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
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
