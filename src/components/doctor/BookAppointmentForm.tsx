
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Doctor } from '@/services/doctorService';
import { createAppointment } from '@/services/appointmentService';
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
  const [appointmentError, setAppointmentError] = useState<string | null>(null);

  const handleBookAppointment = async () => {
    // Check if user is authenticated first
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to book a consultation",
        variant: "destructive",
      });
      return;
    }
    
    // Check if user is premium
    if (!user.isPremium) {
      toast({
        title: "Premium Feature",
        description: "Doctor consultations are available for premium users only. Please upgrade to premium.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if date and time slot are selected
    if (!date || !selectedTimeSlot) {
      toast({
        title: "Incomplete Booking",
        description: "Please select both date and time for your consultation",
        variant: "destructive",
      });
      return;
    }

    setAppointmentError(null);
    
    try {
      setIsSubmitting(true);
      
      // Send appointment data to backend
      await createAppointment({
        user_id: user.id,
        doctor_id: doctor.id,
        date: date.toISOString().split('T')[0],
        time_slot: selectedTimeSlot,
        reason: reason
      });
      
      // Show success message
      toast({
        title: "Consultation Booked!",
        description: `Your appointment with ${doctor.name} is confirmed for ${date.toLocaleDateString()} at ${selectedTimeSlot}`,
      });
      
      // Call success callback
      onBookingSuccess();
    } catch (error: any) {
      console.error("Error booking appointment:", error);
      setAppointmentError(error.message || "Failed to book appointment. Please try again.");
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error booking your consultation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 py-4">
      <div>
        <DoctorInfoCard doctor={doctor} />
        
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-md shadow-sm border p-4">
          <h4 className="font-medium mb-2">Selected Appointment</h4>
          {date && selectedTimeSlot ? (
            <div className="text-sm">
              <p><strong>Date:</strong> {date.toLocaleDateString()}</p>
              <p><strong>Time:</strong> {selectedTimeSlot}</p>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              Please select a date and time slot
            </div>
          )}
        </div>
      </div>
      
      <div>
        <TimeSlotSelector 
          date={date} 
          setDate={setDate}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          availableDays={doctor.available_days}
        />
        
        <PatientInfoForm user={user} setReason={setReason} />
        
        {appointmentError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {appointmentError}
          </div>
        )}
      </div>
      
      <div className="md:col-span-2 flex justify-end mt-4">
        <Button 
          onClick={handleBookAppointment} 
          disabled={!user || !date || !selectedTimeSlot || isSubmitting}
          className="bg-health-primary hover:bg-health-dark"
        >
          {isSubmitting ? "Processing..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
};

export default BookAppointmentForm;
