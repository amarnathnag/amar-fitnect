
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

  return { validateAddress };
};
