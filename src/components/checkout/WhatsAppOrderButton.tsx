
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/utils/cartCalculations';
import { useCheckoutValidation } from './CheckoutValidation';

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
  const { validateCart, validateAddress } = useCheckoutValidation();
  const whatsappNumber = "919883810559";

  const handleWhatsAppOrder = () => {
    console.log('📱 WhatsApp order initiated');

    // Validate cart
    if (!validateCart(cart)) {
      return;
    }

    // Validate address
    if (!validateAddress(deliveryAddress)) {
      return;
    }

    console.log('📱 Creating WhatsApp order message...');

    try {
      // Create detailed order message
      let message = `🛒 *New Order Request*\n\n`;
      message += `📦 *Order Items:*\n`;
      
      cart.forEach((item, index) => {
        message += `${index + 1}. *${item.product.name}*\n`;
        message += `   Brand: ${item.product.brand}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Price: ₹${formatPrice(item.product.price)} each\n`;
        message += `   Subtotal: ₹${formatPrice(item.product.price * item.quantity)}\n\n`;
      });

      message += `💰 *Total Amount: ₹${formatPrice(cartTotal)}*\n\n`;
      
      // Add delivery address
      message += `📍 *Delivery Address:*\n`;
      message += `${deliveryAddress.street}\n`;
      message += `${deliveryAddress.city}, ${deliveryAddress.state}\n`;
      message += `PIN: ${deliveryAddress.pincode}\n`;
      message += `Phone: ${deliveryAddress.phone}\n\n`;

      message += `Please confirm this order and let me know the delivery time and payment method. Thank you! 🙏`;

      // Create WhatsApp URL
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      console.log('📱 Opening WhatsApp with order details');
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      toast({
        title: "Order Sent via WhatsApp! 📱",
        description: "Your order details have been sent. Please wait for confirmation from our team.",
      });
    } catch (error) {
      console.error('❌ Error creating WhatsApp order:', error);
      toast({
        title: "Error",
        description: "Failed to create WhatsApp order. Please try again.",
        variant: "destructive",
      });
    }
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
