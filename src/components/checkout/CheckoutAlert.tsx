
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

const CheckoutAlert = () => {
  return (
    <Alert className="mb-6 border-green-200 bg-green-50">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertDescription className="text-green-800">
        All items are in stock and ready for delivery. FREE delivery on this order!
      </AlertDescription>
    </Alert>
  );
};

export default CheckoutAlert;
