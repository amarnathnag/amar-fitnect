
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Doctor, createAppointment } from '@/services/doctorService';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

// Time slots - typically would be dynamic based on doctor's schedule
const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
];

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
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={doctor.image_url || "https://via.placeholder.com/150"} 
            alt={doctor.name} 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium">{doctor.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.specialty}</p>
          </div>
        </div>
        
        <div className="border rounded-md p-4 mb-4">
          <h4 className="font-medium mb-2">Consultation Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Duration</span>
              <span>30 minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Fee</span>
              <span className="font-medium">₹{doctor.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Platform</span>
              <span>Google Meet</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Available Time Slots</h4>
          {date ? (
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button 
                  key={time} 
                  variant={selectedTimeSlot === time ? "default" : "outline"} 
                  size="sm"
                  className={selectedTimeSlot === time ? "bg-health-primary" : ""}
                  onClick={() => setSelectedTimeSlot(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please select a date first
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Select Date</h4>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="border rounded-md p-3"
          disabled={(date) => {
            // Disable past dates
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today;
          }}
        />
        
        {user ? (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Your Information</h4>
            <div className="space-y-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user.name || ""} readOnly={!!user.name} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={user.email} readOnly />
              </div>
              <div>
                <Label htmlFor="reason">Reason for visit</Label>
                <Select onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Health Checkup</SelectItem>
                    <SelectItem value="nutrition">Nutrition Consultation</SelectItem>
                    <SelectItem value="fitness">Fitness Guidance</SelectItem>
                    <SelectItem value="condition">Specific Health Condition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ) : (
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please <a href="/auth" className="text-health-primary font-medium">sign in</a> to book a consultation.
            </AlertDescription>
          </Alert>
        )}
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
