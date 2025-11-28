
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, RotateCcw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleResetTour = () => {
    if (user) {
      localStorage.removeItem(`welcome_tour_seen_${user.id}`);
      toast({
        title: "Tour Reset",
        description: "The welcome tour will show again when you visit the homepage.",
      });
      // Navigate to home to trigger the tour
      navigate('/');
    }
  };

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

      {/* App Settings Section */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">App Settings</h3>
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="font-medium">Welcome Tour</p>
            <p className="text-sm text-muted-foreground">Replay the feature walkthrough</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleResetTour}>
            <RotateCcw className="mr-2 h-4 w-4" /> Replay Tour
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesTab;
