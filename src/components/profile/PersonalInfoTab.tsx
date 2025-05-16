
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Save } from 'lucide-react';

interface PersonalInfoTabProps {
  userData: {
    personal: {
      name: string;
      email: string;
      age: number;
      gender: string;
      height: number;
      weight: number;
      targetWeight: number;
    }
  };
  handlePersonalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveChanges: () => void;
}
const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ userData, handlePersonalChange, saveChanges }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={userData.personal.name} 
            onChange={handlePersonalChange} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            value={userData.personal.email} 
            onChange={handlePersonalChange} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input 
            id="age" 
            name="age" 
            type="number" 
            value={userData.personal.age} 
            onChange={handlePersonalChange} 
          />
        </div>
        <div className="space-y-2">
          <Label>Gender</Label>
          <RadioGroup 
            value={userData.personal.gender} 
            onValueChange={(value) => handlePersonalChange({target: {name: "gender", value}} as any)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input 
            id="height" 
            name="height" 
            type="number" 
            value={userData.personal.height} 
            onChange={handlePersonalChange} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Current Weight (kg)</Label>
          <Input 
            id="weight" 
            name="weight" 
            type="number" 
            value={userData.personal.weight} 
            onChange={handlePersonalChange} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="targetWeight">Target Weight (kg)</Label>
          <Input 
            id="targetWeight" 
            name="targetWeight" 
            type="number" 
            value={userData.personal.targetWeight} 
            onChange={handlePersonalChange} 
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={saveChanges}>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoTab;
