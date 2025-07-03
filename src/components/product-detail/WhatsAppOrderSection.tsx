
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WhatsAppOrderSectionProps {
  product: any;
  quantity: number;
  totalPrice: number;
}

const WhatsAppOrderSection: React.FC<WhatsAppOrderSectionProps> = ({
  product,
  quantity,
  totalPrice
}) => {
  const { toast } = useToast();
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const whatsappNumber = "9883810559";

  const formatPrice = (price: number) => {
    const displayPrice = price > 1000 ? price / 100 : price;
    return displayPrice.toFixed(2);
  };

  const handleWhatsAppOrder = () => {
    // Create order message
    let message = `🛒 *New Order Request*\n\n`;
    message += `📦 *Product Details:*\n`;
    message += `Product: ${product.name}\n`;
    message += `Brand: ${product.brand}\n`;
    message += `Quantity: ${quantity}\n`;
    message += `Price per item: ₹${formatPrice(product.price)}\n`;
    message += `Total Amount: ₹${formatPrice(totalPrice)}\n\n`;

    if (deliveryAddress.street || deliveryAddress.city) {
      message += `📍 *Delivery Address:*\n`;
      if (deliveryAddress.street) message += `${deliveryAddress.street}\n`;
      if (deliveryAddress.city) message += `${deliveryAddress.city}`;
      if (deliveryAddress.state) message += `, ${deliveryAddress.state}`;
      message += `\n`;
      if (deliveryAddress.pincode) message += `PIN: ${deliveryAddress.pincode}\n`;
      if (deliveryAddress.phone) message += `Phone: ${deliveryAddress.phone}\n`;
      message += `\n`;
    }

    message += `Please confirm this order and let me know the delivery time. Thank you!`;

    // Create WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Order Sent via WhatsApp",
      description: "Your order details have been sent. Please wait for confirmation.",
    });
  };

  return (
    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
      <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        Order via WhatsApp
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              placeholder="Enter your street address"
              value={deliveryAddress.street}
              onChange={(e) => setDeliveryAddress(prev => ({ ...prev, street: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Enter your city"
              value={deliveryAddress.city}
              onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              placeholder="Enter your state"
              value={deliveryAddress.state}
              onChange={(e) => setDeliveryAddress(prev => ({ ...prev, state: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="pincode">PIN Code</Label>
            <Input
              id="pincode"
              placeholder="Enter PIN code"
              value={deliveryAddress.pincode}
              onChange={(e) => setDeliveryAddress(prev => ({ ...prev, pincode: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="Enter your phone number"
            value={deliveryAddress.phone}
            onChange={(e) => setDeliveryAddress(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>

        <Button 
          onClick={handleWhatsAppOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          size="lg"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Send Order via WhatsApp
        </Button>

        <p className="text-sm text-green-700 text-center">
          Order details will be sent to WhatsApp for confirmation
        </p>
      </div>
    </div>
  );
};

export default WhatsAppOrderSection;
