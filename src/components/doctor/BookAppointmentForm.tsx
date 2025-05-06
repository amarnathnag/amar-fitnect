
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Doctor, createAppointment } from '@/services/doctorService';
import DoctorInfoCard from './DoctorInfoCard';
import TimeSlotSelector from './TimeSlotSelector';
import PatientInfoForm from './PatientInfoForm';

interface BookAppointmentFormProps {
  doctor: Doctor;
  onBookingSuccess: () => void;
}

const BookAppointmentForm: React.FC<BookAppointmentFormProps> = ({ doctor, onBookingSuccess }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [reason, setReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookAppointment = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to book a consultation",
        variant: "destructive",
      });
      return;
    }
    
    if (!date || !selectedTimeSlot) {
      toast({
        title: "Incomplete Booking",
        description: "Please select both date and time for your consultation",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      await createAppointment({
        doctor_id: doctor.id,
        date: date.toISOString().split('T')[0],
        time_slot: selectedTimeSlot,
        reason: reason
      });
      
      toast({
        title: "Consultation Booked!",
        description: `Your appointment with ${doctor.name} is confirmed for ${date.toLocaleDateString()} at ${selectedTimeSlot}`,
      });
      
      onBookingSuccess();
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your consultation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 py-4">
      <div>
        <DoctorInfoCard doctor={doctor} />
        
        <div>
          <h4 className="font-medium mb-2">Available Time Slots</h4>
          {date ? (
            <div className="grid grid-cols-3 gap-2">
              {selectedTimeSlot ? (
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-health-primary"
                  onClick={() => setSelectedTimeSlot(null)}
                >
                  {selectedTimeSlot}
                </Button>
              ) : (
                <div className="text-sm text-gray-500">Select a time slot below</div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      
      <div>
        <TimeSlotSelector 
          date={date} 
          setDate={setDate}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
        />
        
        <PatientInfoForm user={user} setReason={setReason} />
      </div>
      
      <div className="md:col-span-2 flex justify-end mt-4">
        <Button 
          onClick={handleBookAppointment} 
          disabled={!user || !date || !selectedTimeSlot || isSubmitting}
          className="bg-health-primary hover:bg-health-dark"
        >
          {isSubmitting ? "Processing..." : "Confirm & Pay"}
        </Button>
      </div>
    </div>
  );
};

export default BookAppointmentForm;
