
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

// Comprehensive validation schema for delivery addresses
export const deliveryAddressSchema = z.object({
  street: z.string()
    .trim()
    .min(1, { message: "Street address is required" })
    .max(200, { message: "Street address must be less than 200 characters" })
    .regex(/^[a-zA-Z0-9\s,.\-/#]+$/, { 
      message: "Street address contains invalid characters" 
    }),
  city: z.string()
    .trim()
    .min(1, { message: "City is required" })
    .max(50, { message: "City must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, { 
      message: "City should only contain letters and spaces" 
    }),
  state: z.string()
    .trim()
    .min(1, { message: "State is required" })
    .max(50, { message: "State must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, { 
      message: "State should only contain letters and spaces" 
    }),
  pincode: z.string()
    .trim()
    .regex(/^\d{6}$/, { 
      message: "Please enter a valid 6-digit pincode" 
    }),
  phone: z.string()
    .trim()
    .regex(/^\d{10}$/, { 
      message: "Please enter a valid 10-digit phone number" 
    })
});

// Sanitize input to prevent injection
export const sanitizeInput = (input: string, maxLength: number = 200): string => {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Remove potential HTML tags
};

export const useCheckoutValidation = () => {
  const { toast } = useToast();

  const validateAddress = (deliveryAddress: DeliveryAddress) => {
    console.log('🔍 Validating delivery address with zod schema');
    
    try {
      deliveryAddressSchema.parse(deliveryAddress);
      console.log('✅ Address validation passed');
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        console.log(`❌ Validation error: ${firstError.message}`);
        toast({
          title: "Invalid Information ⚠️",
          description: firstError.message,
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const validateCart = (cart: any[]) => {
    // Only validate cart length, don't show toast during render
    return cart && cart.length > 0;
  };

  return { validateAddress, validateCart };
};
