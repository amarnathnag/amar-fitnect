
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

interface CheckoutErrorStateProps {
  title: string;
  message: string;
  buttonText: string;
  onButtonClick: () => void;
}

const CheckoutErrorState: React.FC<CheckoutErrorStateProps> = ({
  title,
  message,
  buttonText,
  onButtonClick
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          <Button onClick={onButtonClick} size="lg">
            {buttonText}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutErrorState;
