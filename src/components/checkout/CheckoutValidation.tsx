
import { useToast } from '@/hooks/use-toast';

interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export const useCheckoutValidation = () => {
  const { toast } = useToast();

  const validateAddress = (deliveryAddress: DeliveryAddress) => {
    console.log('🔍 Validating delivery address:', deliveryAddress);
    
    // Check required fields
    const requiredFields = [
      { field: 'street', label: 'Street Address', value: deliveryAddress.street },
      { field: 'city', label: 'City', value: deliveryAddress.city },
      { field: 'state', label: 'State', value: deliveryAddress.state },
      { field: 'pincode', label: 'Pincode', value: deliveryAddress.pincode },
      { field: 'phone', label: 'Phone Number', value: deliveryAddress.phone }
    ];

    for (const { field, label, value } of requiredFields) {
      if (!value || !value.toString().trim()) {
        console.log(`❌ Missing field: ${field}`);
        toast({
          title: "Missing Information ⚠️",
          description: `Please enter ${label}`,
          variant: "destructive",
        });
        return false;
      }
    }

    // Validate pincode format (6 digits)
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(deliveryAddress.pincode.trim())) {
      console.log('❌ Invalid pincode format');
      toast({
        title: "Invalid Pincode",
        description: "Please enter a valid 6-digit pincode",
        variant: "destructive",
      });
      return false;
    }

    // Validate phone format (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(deliveryAddress.phone.trim())) {
      console.log('❌ Invalid phone format');
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return false;
    }

    console.log('✅ Address validation passed');
    return true;
  };

  const validateCart = (cart: any[]) => {
    // Only validate cart length, don't show toast during render
    return cart && cart.length > 0;
  };

  return { validateAddress, validateCart };
};
