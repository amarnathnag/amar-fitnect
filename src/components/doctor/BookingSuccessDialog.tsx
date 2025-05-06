
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Doctor } from '@/services/doctorService';
import { DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface BookingSuccessDialogProps {
  doctor: Doctor;
  onClose: () => void;
}

const BookingSuccessDialog: React.FC<BookingSuccessDialogProps> = ({ doctor, onClose }) => {
  return (
    <div className="py-6 text-center">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
      </div>
      <DialogTitle className="text-2xl mb-2">Booking Confirmed!</DialogTitle>
      <DialogDescription className="mb-6">
        Your appointment with {doctor.name} has been scheduled successfully.
      </DialogDescription>
      <div className="flex justify-center space-x-3">
        <Button onClick={onClose}>
          Close
        </Button>
        <Button variant="outline">
          View in Profile
        </Button>
      </div>
    </div>
  );
};

export default BookingSuccessDialog;
