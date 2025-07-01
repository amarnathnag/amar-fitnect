
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const whatsappNumber = "9883810559";

  const formatPrice = (price: number) => {
    const displayPrice = price > 1000 ? price / 100 : price;
    return displayPrice.toFixed(2);
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart first",
        variant: "destructive",
      });
      return;
    }

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
    
    if (deliveryAddress.street) {
      message += `📍 *Delivery Address:*\n`;
      message += `${deliveryAddress.street}\n`;
      message += `${deliveryAddress.city}, ${deliveryAddress.state}\n`;
      message += `PIN: ${deliveryAddress.pincode}\n`;
      message += `Phone: ${deliveryAddress.phone}\n\n`;
    }

    message += `Please confirm this order and let me know the delivery time. Thank you!`;

    // Create WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Order Sent to WhatsApp",
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
