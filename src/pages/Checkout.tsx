
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const validateAddress = () => {
    if (!deliveryAddress.street.trim()) {
      toast({
        title: "Error",
        description: "Please enter street address",
        variant: "destructive",
      });
      return false;
    }
    if (!deliveryAddress.city.trim()) {
      toast({
        title: "Error",
        description: "Please enter city",
        variant: "destructive",
      });
      return false;
    }
    if (!deliveryAddress.state.trim()) {
      toast({
        title: "Error",
        description: "Please enter state",
        variant: "destructive",
      });
      return false;
    }
    if (!deliveryAddress.pincode.trim()) {
      toast({
        title: "Error",
        description: "Please enter pincode",
        variant: "destructive",
      });
      return false;
    }
    if (!deliveryAddress.phone.trim()) {
      toast({
        title: "Error",
        description: "Please enter phone number",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    console.log('Starting order placement...');
    
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to place order",
        variant: "destructive",
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        title: "Error",
        description: "Cart is empty",
        variant: "destructive",
      });
      return;
    }

    if (!validateAddress()) {
      return;
    }

    try {
      setLoading(true);
      console.log('Creating order with data:', {
        user_id: user.id,
        total_amount: cartTotal,
        delivery_address: deliveryAddress,
        status: 'pending'
      });

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          total_amount: cartTotal,
          delivery_address: deliveryAddress,
          status: 'pending'
        }])
        .select()
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw orderError;
      }

      console.log('Order created successfully:', order);

      // Create order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price_per_item: item.product.price
      }));

      console.log('Creating order items:', orderItems);

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Order items creation error:', itemsError);
        throw itemsError;
      }

      console.log('Order items created successfully');

      // Clear cart
      const { error: clearCartError } = await supabase
        .from('shopping_cart')
        .delete()
        .eq('user_id', user.id);

      if (clearCartError) {
        console.error('Clear cart error:', clearCartError);
        // Don't throw here as order is already created
      }

      toast({
        title: "Order Placed Successfully!",
        description: `Order #${order.id.slice(0, 8)} has been placed. You will receive a confirmation email once approved.`,
      });

      navigate('/profile');
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Please Login</h2>
            <p className="text-gray-600 mb-4">You need to be logged in to checkout</p>
            <Button onClick={() => navigate('/auth')}>Login</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="street">Street Address *</Label>
                  <Textarea
                    id="street"
                    value={deliveryAddress.street}
                    onChange={(e) => setDeliveryAddress(prev => ({...prev, street: e.target.value}))}
                    placeholder="Enter your full address"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress(prev => ({...prev, city: e.target.value}))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={deliveryAddress.state}
                      onChange={(e) => setDeliveryAddress(prev => ({...prev, state: e.target.value}))}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={deliveryAddress.pincode}
                      onChange={(e) => setDeliveryAddress(prev => ({...prev, pincode: e.target.value}))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={deliveryAddress.phone}
                      onChange={(e) => setDeliveryAddress(prev => ({...prev, phone: e.target.value}))}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handlePlaceOrder} 
                    disabled={loading || cart.length === 0}
                    className="w-full"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
