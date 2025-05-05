
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from 'lucide-react';

interface PreferencesTabProps {
  userData: {
    preferences: {
      dietType: string;
      goal: string;
      allergies: string;
      medicalConditions: string;
      activityLevel: string;
    }
  };
  handlePreferencesChange: (name: string, value: string) => void;
  saveChanges: () => void;
}

const PreferencesTab: React.FC<PreferencesTabProps> = ({ userData, handlePreferencesChange, saveChanges }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="dietType">Diet Preference</Label>
          <Select 
            value={userData.preferences.dietType} 
            onValueChange={(value) => handlePreferencesChange("dietType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select diet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="nonVegetarian">Non-Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="goal">Health Goal</Label>
          <Select 
            value={userData.preferences.goal} 
            onValueChange={(value) => handlePreferencesChange("goal", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weightLoss">Weight Loss</SelectItem>
              <SelectItem value="weightGain">Weight Gain</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="muscleGain">Muscle Gain</SelectItem>
              <SelectItem value="toning">Toning</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="activityLevel">Activity Level</Label>
        <Select 
          value={userData.preferences.activityLevel} 
          onValueChange={(value) => handlePreferencesChange("activityLevel", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select activity level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
            <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
            <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
            <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
            <SelectItem value="veryActive">Very Active (hard exercise daily)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="allergies">Allergies or Food Restrictions</Label>
        <Textarea 
          id="allergies" 
          placeholder="List any food allergies or restrictions" 
          value={userData.preferences.allergies}
          onChange={(e) => handlePreferencesChange("allergies", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="medicalConditions">Medical Conditions</Label>
        <Textarea 
          id="medicalConditions" 
          placeholder="List any relevant medical conditions" 
          value={userData.preferences.medicalConditions}
          onChange={(e) => handlePreferencesChange("medicalConditions", e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={saveChanges}>
          <Save className="mr-2 h-4 w-4" /> Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default PreferencesTab;
