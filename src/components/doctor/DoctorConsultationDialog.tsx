
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BookAppointmentForm from '@/components/doctor/BookAppointmentForm';
import BookingSuccessDialog from '@/components/doctor/BookingSuccessDialog';
import { Doctor } from '@/services/doctorService';
import { ArrowLeft } from 'lucide-react';

interface DoctorConsultationDialogProps {
  doctor: Doctor | null;
  consultationSuccess: boolean;
  onOpenChange: (open: boolean) => void;
  onBookingSuccess: () => void;
}

const DoctorConsultationDialog: React.FC<DoctorConsultationDialogProps> = ({
  doctor,
  consultationSuccess,
  onOpenChange,
  onBookingSuccess,
}) => {
  if (!doctor) return null;

  return (
    <Dialog open={!!doctor} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] p-0 max-h-[90vh] overflow-y-auto">
        {!consultationSuccess ? (
          <>
            <DialogHeader className="sticky top-0 z-10 bg-white dark:bg-gray-950 p-6 pb-3 border-b flex flex-row items-center">
              <button 
                onClick={() => onOpenChange(false)} 
                className="mr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-1"
                aria-label="Close dialog"
              >
                <ArrowLeft size={16} />
              </button>
              <DialogTitle className="text-xl font-bold text-health-primary">
                Book Consultation with Dr. {doctor.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="p-5">
              <BookAppointmentForm 
                doctor={doctor} 
                onBookingSuccess={onBookingSuccess}
              />
            </div>
          </>
        ) : (
          <BookingSuccessDialog doctor={doctor} onClose={() => onOpenChange(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DoctorConsultationDialog;
