
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        {!consultationSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Book Consultation</DialogTitle>
              <DialogDescription>
                Select a date and time for your appointment with {doctor.name}.
              </DialogDescription>
            </DialogHeader>
            
            <BookAppointmentForm 
              doctor={doctor} 
              onBookingSuccess={onBookingSuccess}
            />
          </>
        ) : (
          <BookingSuccessDialog doctor={doctor} onClose={() => onOpenChange(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DoctorConsultationDialog;
