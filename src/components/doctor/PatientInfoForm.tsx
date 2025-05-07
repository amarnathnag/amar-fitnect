
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

interface PatientInfoFormProps {
  user: any; // Using any for simplicity, could be typed properly
  setReason: (reason: string) => void;
}

const PatientInfoForm: React.FC<PatientInfoFormProps> = ({ user, setReason }) => {
  // Add local state to track the notes and selected reason
  const [notes, setNotes] = useState("");
  const [selectedReasonType, setSelectedReasonType] = useState("");
  
  // Function to handle reason select change
  const handleReasonChange = (selectedReason: string) => {
    setSelectedReasonType(selectedReason);
    updateFullReason(selectedReason, notes);
  };
  
  // Function to handle notes change
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    updateFullReason(selectedReasonType, newNotes);
  };
  
  // Helper function to update the full reason with both type and notes
  const updateFullReason = (reasonType: string, noteText: string) => {
    if (!reasonType && !noteText) {
      setReason("");
    } else if (!noteText) {
      setReason(reasonType);
    } else if (!reasonType) {
      setReason(noteText);
    } else {
      setReason(`${reasonType} - ${noteText}`);
    }
  };

  if (user) {
    return (
      <div className="mt-4 bg-white dark:bg-gray-800 rounded-md shadow-sm border p-4">
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
            <Select onValueChange={handleReasonChange}>
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
          <div>
            <Label htmlFor="notes">Additional notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Any specific concerns or questions for the doctor?"
              className="resize-none"
              value={notes}
              onChange={handleNotesChange}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Alert className="mt-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Please <a href="/auth" className="text-health-primary font-medium">sign in</a> to book a consultation.
      </AlertDescription>
    </Alert>
  );
};

export default PatientInfoForm;
