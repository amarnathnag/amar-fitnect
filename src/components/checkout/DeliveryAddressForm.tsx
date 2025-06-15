
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

interface DeliveryAddressFormProps {
  deliveryAddress: DeliveryAddress;
  setDeliveryAddress: React.Dispatch<React.SetStateAction<DeliveryAddress>>;
}

const DeliveryAddressForm: React.FC<DeliveryAddressFormProps> = ({
  deliveryAddress,
  setDeliveryAddress
}) => {
  const handleInputChange = (field: keyof DeliveryAddress) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDeliveryAddress(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
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
            onChange={handleInputChange('street')}
            placeholder="Enter your complete address with house/flat number, street name, landmark"
            required
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={deliveryAddress.city}
              onChange={handleInputChange('city')}
              placeholder="Enter city"
              required
            />
          </div>
          <div>
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              value={deliveryAddress.state}
              onChange={handleInputChange('state')}
              placeholder="Enter state"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pincode">Pincode *</Label>
            <Input
              id="pincode"
              value={deliveryAddress.pincode}
              onChange={handleInputChange('pincode')}
              placeholder="Enter 6-digit pincode"
              pattern="[0-9]{6}"
              maxLength={6}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={deliveryAddress.phone}
              onChange={handleInputChange('phone')}
              placeholder="Enter 10-digit mobile number"
              pattern="[0-9]{10}"
              maxLength={10}
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryAddressForm;
