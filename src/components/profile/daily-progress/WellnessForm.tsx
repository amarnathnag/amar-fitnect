
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Droplets, Moon, Heart } from 'lucide-react';

interface WellnessData {
  water_intake: number;
  sleep_hours: number;
  mood: string;
  weight: number;
  notes: string;
}

interface WellnessFormProps {
  wellnessData: WellnessData;
  setWellnessData: React.Dispatch<React.SetStateAction<WellnessData>>;
}

const moodOptions = [
  { value: 'excellent', label: '😊 Excellent', color: 'bg-green-500' },
  { value: 'good', label: '😃 Good', color: 'bg-blue-500' },
  { value: 'okay', label: '😐 Okay', color: 'bg-yellow-500' },
  { value: 'tired', label: '😴 Tired', color: 'bg-orange-500' },
  { value: 'stressed', label: '😰 Stressed', color: 'bg-red-500' }
];

const WellnessForm = ({ wellnessData, setWellnessData }: WellnessFormProps) => {
  return (
    <>
      {/* Wellness Data */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            <Droplets className="h-3 w-3" />
            Water Intake (glasses)
          </Label>
          <Input 
            type="number"
            value={wellnessData.water_intake}
            onChange={(e) => setWellnessData(prev => ({...prev, water_intake: parseInt(e.target.value) || 0}))}
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            <Moon className="h-3 w-3" />
            Sleep Hours
          </Label>
          <Input 
            type="number"
            step="0.5"
            value={wellnessData.sleep_hours}
            onChange={(e) => setWellnessData(prev => ({...prev, sleep_hours: parseFloat(e.target.value) || 0}))}
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            Today's Mood
          </Label>
          <Select 
            value={wellnessData.mood} 
            onValueChange={(value) => setWellnessData(prev => ({...prev, mood: value}))}
          >
            <SelectTrigger>
              <SelectValue placeholder="How are you feeling?" />
            </SelectTrigger>
            <SelectContent>
              {moodOptions.map(mood => (
                <SelectItem key={mood.value} value={mood.value}>
                  {mood.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Weight (kg) - Optional</Label>
          <Input 
            type="number"
            step="0.1"
            value={wellnessData.weight}
            onChange={(e) => setWellnessData(prev => ({...prev, weight: parseFloat(e.target.value) || 0}))}
          />
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label>Notes</Label>
        <Input 
          value={wellnessData.notes}
          onChange={(e) => setWellnessData(prev => ({...prev, notes: e.target.value}))}
          placeholder="How did you feel today? Any achievements?"
        />
      </div>
    </>
  );
};

export default WellnessForm;
