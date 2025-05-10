
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Doctor } from '@/services/doctorService';
import { createAppointment } from '@/services/appointmentService';
import DoctorInfoCard from './DoctorInfoCard';
import TimeSlotSelector from './TimeSlotSelector';
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        {/* Doctor info row */}
        <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
          <img 
            src={doctor.image_url || "https://via.placeholder.com/60"} 
            alt={doctor.name} 
            className="w-12 h-12 rounded-full object-cover" 
          />
          <div>
            <h3 className="font-medium text-sm">Dr. {doctor.name}</h3>
            <p className="text-xs text-gray-500">{doctor.specialty}</p>
          </div>
        </div>
        
        {/* Date and Time Selection Card */}
        <Card className="p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="grid gap-4">
            <TimeSlotSelector 
              date={date} 
              setDate={setDate}
              selectedTimeSlot={selectedTimeSlot}
              setSelectedTimeSlot={setSelectedTimeSlot}
              availableDays={doctor.available_days}
            />
            
            <div>
              <label htmlFor="reason" className="block text-sm font-medium mb-1">Reason for visit (optional)</label>
              <Textarea
                id="reason"
                placeholder="Briefly describe why you're seeing the doctor..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full resize-none"
                rows={2}
              />
            </div>
          </div>
        </Card>
            
        {appointmentError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {appointmentError}
          </div>
        )}
        
        {date && selectedTimeSlot && (
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 p-3 rounded-md">
            <div className="bg-blue-100 p-2 rounded-full">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-blue-800">Selected appointment</p>
              <p className="text-blue-600">{date.toLocaleDateString()} at {selectedTimeSlot}</p>
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleBookAppointment} 
          disabled={!user || !date || !selectedTimeSlot || isSubmitting}
          className="w-full bg-health-primary hover:bg-health-dark flex items-center justify-center gap-2 mt-2"
        >
          {isSubmitting ? (
            <>Processing...</>
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              Confirm Booking
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BookAppointmentForm;
