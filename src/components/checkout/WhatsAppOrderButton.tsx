
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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

interface WhatsAppOrderButtonProps {
  cart: CartItem[];
  cartTotal: number;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
}

const WhatsAppOrderButton: React.FC<WhatsAppOrderButtonProps> = ({
  cart,
  cartTotal,
  deliveryAddress
}) => {
  const { toast } = useToast();
  const whatsappNumber = "919883810559"; // Added country code

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart first",
        variant: "destructive",
      });
      return;
    }

    console.log('📱 Creating WhatsApp order message...');

    // Create order message
    let message = `🛒 *New Order Request*\n\n`;
    message += `📦 *Items:*\n`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   Brand: ${item.product.brand}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ₹${formatPrice(item.product.price)} each\n`;
      message += `   Subtotal: ₹${formatPrice(item.product.price * item.quantity)}\n\n`;
    });

    message += `💰 *Total Amount: ₹${formatPrice(cartTotal)}*\n\n`;
    
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

    console.log('📱 Opening WhatsApp with order details');
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Order Sent to WhatsApp! 📱",
      description: "Your order details have been sent via WhatsApp. Please wait for confirmation.",
    });
  };

  return (
    <Button 
      onClick={handleWhatsAppOrder}
      className="w-full bg-green-500 hover:bg-green-600 text-white"
      size="lg"
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      Order via WhatsApp
    </Button>
  );
};

export default WhatsAppOrderButton;
