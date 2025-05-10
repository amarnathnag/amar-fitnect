
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BookAppointmentForm from '@/components/doctor/BookAppointmentForm';
import BookingSuccessDialog from '@/components/doctor/BookingSuccessDialog';
import { Doctor } from '@/services/doctorService';

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
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px] lg:max-w-[900px] p-0">
        {!consultationSuccess ? (
          <>
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>Book Consultation with {doctor.name}</DialogTitle>
            </DialogHeader>
            
            <div className="p-6 pt-2">
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
