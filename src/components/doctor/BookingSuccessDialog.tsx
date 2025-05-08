
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, User, Clock } from 'lucide-react';
import { Doctor } from '@/services/doctorService';
import { DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface BookingSuccessDialogProps {
  doctor: Doctor;
  onClose: () => void;
}

const BookingSuccessDialog: React.FC<BookingSuccessDialogProps> = ({ doctor, onClose }) => {
  const navigate = useNavigate();
  
  return (
    <div className="py-6 text-center">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
      </div>
      <DialogTitle className="text-2xl mb-2">Booking Confirmed!</DialogTitle>
      <DialogDescription className="mb-6 text-center">
        Your appointment with Dr. {doctor.name} has been scheduled successfully.
      </DialogDescription>
      
      {/* Appointment Details Card */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6 max-w-sm mx-auto">
        <div className="flex items-start gap-4">
          <img 
            src={doctor.image_url || "https://via.placeholder.com/60"} 
            alt={doctor.name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-health-light" 
          />
          <div className="text-left">
            <h3 className="font-medium">{doctor.name}</h3>
            <p className="text-sm text-gray-500">{doctor.specialty}</p>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-health-primary" />
            <span>Check your profile for date and time</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-health-primary" />
            <span>Duration: 30 minutes</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-health-primary" />
            <span>Online video consultation</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-3">
        <Button onClick={onClose}>
          Close
        </Button>
        <Button variant="outline" onClick={() => {
          onClose();
          navigate('/profile');
        }}>
          View in Profile
        </Button>
      </div>
    </div>
  );
};

export default BookingSuccessDialog;
