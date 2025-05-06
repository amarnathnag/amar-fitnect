
import React from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";

// Time slots - typically would be dynamic based on doctor's schedule
const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
];

interface TimeSlotSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTimeSlot: string | null;
  setSelectedTimeSlot: (timeSlot: string) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ 
  date, 
  setDate, 
  selectedTimeSlot, 
  setSelectedTimeSlot 
}) => {
  return (
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
      
      <h4 className="font-medium mb-2 mt-4">Available Time Slots</h4>
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
  );
};

export default TimeSlotSelector;
