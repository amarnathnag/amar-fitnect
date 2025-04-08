
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, Phone, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const PremiumPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePaymentConfirmation = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to unlock premium features",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    setIsLoading(true);
    
    // Simulate payment verification
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  const handleContinue = () => {
    // In a real implementation, this would also update the user's premium status in the database
    navigate('/premium-unlocked');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-12">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Complete Your Premium Payment</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Scan the QR code below to complete your payment and unlock all premium features.
            </p>
          </div>
          
          <Card className="border-2 shadow-lg mx-auto max-w-md">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="mb-6 p-3 bg-white rounded-xl">
                <img 
                  src="/lovable-uploads/62f313bb-93f5-4c45-9b50-6fd428824b87.png" 
                  alt="Payment QR Code" 
                  className="w-64 h-64 mx-auto"
                />
              </div>
              
              <div className="mb-6 text-center">
                <p className="font-medium mb-4">
                  Scan the QR Code to complete your payment and unlock premium features.
                </p>
                <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-1" />
                  <p>Support: WhatsApp us at 9883810559 after payment if not redirected</p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-health-primary hover:bg-health-dark"
                onClick={handlePaymentConfirmation}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying Payment...
                  </>
                ) : (
                  <>
                    I've Paid – Unlock Access
                  </>
                )}
              </Button>
              
              <div className="mt-4 flex items-center justify-center">
                <Send className="h-4 w-4 mr-2 text-health-primary" />
                <span className="text-sm">
                  After payment, click the button above to continue
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Payment Successful!
            </DialogTitle>
            <DialogDescription>
              Thank you for subscribing to our premium plan. You now have access to all premium features.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleContinue} className="bg-health-primary hover:bg-health-dark">
              Continue to Premium Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default PremiumPayment;
