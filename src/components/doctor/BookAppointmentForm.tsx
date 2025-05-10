
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Doctor } from '@/services/doctorService';
import { createAppointment } from '@/services/appointmentService';
import TimeSlotSelector from './TimeSlotSelector';
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle, BadgeInfo } from 'lucide-react';

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
    <div className="space-y-4">
      {/* Doctor info */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
        <img 
          src={doctor.image_url || "https://via.placeholder.com/60"} 
          alt={doctor.name} 
          className="w-16 h-16 rounded-full object-cover border-2 border-health-primary/20" 
        />
        <div>
          <h3 className="font-semibold">{doctor.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.specialty}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="text-xs px-2 py-0.5 bg-health-primary/10 text-health-primary rounded-full">
              ₹{doctor.price} per session
            </div>
            <div className="text-xs px-2 py-0.5 bg-health-primary/10 text-health-primary rounded-full">
              {doctor.experience}
            </div>
          </div>
        </div>
      </div>
      
      {/* Date and Time Selection */}
      <Card className="p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Calendar className="h-4 w-4 text-health-primary" />
            <span>Select Date & Time</span>
          </div>
          
          <TimeSlotSelector 
            date={date} 
            setDate={setDate}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedTimeSlot={setSelectedTimeSlot}
            availableDays={doctor.available_days}
          />
          
          <div className="pt-2">
            <label htmlFor="reason" className="block text-sm font-medium mb-1 flex items-center gap-1">
              <BadgeInfo className="h-3 w-3 text-health-primary" />
              Reason for visit
            </label>
            <Textarea
              id="reason"
              placeholder="Briefly describe your symptoms or reason for consultation..."
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
        <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 p-3 rounded-md">
          <div className="bg-blue-100 dark:bg-blue-700/30 p-2 rounded-full">
            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-blue-800 dark:text-blue-300">Your appointment is set for:</p>
            <p className="text-blue-600 dark:text-blue-400">{date.toLocaleDateString()} at {selectedTimeSlot}</p>
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
      
      {!user && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          You need to <a href="/auth" className="text-health-primary hover:underline">sign in</a> to book an appointment
        </p>
      )}
      
      {user && !user.isPremium && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Doctor consultations are a <a href="/premium-ai" className="text-health-primary hover:underline">premium feature</a>
        </p>
      )}
    </div>
  );
};

export default BookAppointmentForm;
