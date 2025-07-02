import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ProfileData, User } from '@/types/auth';

interface PersonalInfoTabProps {
  user: User;
  profileData: ProfileData | null;
  onSave: (data: Partial<ProfileData>) => Promise<void>;
  calculateAge: (dateOfBirth: string | null) => number;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ 
  user, 
  profileData, 
  onSave, 
  calculateAge 
}) => {
  const [formData, setFormData] = useState({
    full_name: profileData?.full_name || user?.name || '',
    date_of_birth: profileData?.date_of_birth || null,
    gender: profileData?.gender || '',
    height: profileData?.height?.toString() || '',
    weight: profileData?.weight?.toString() || '',
    target_weight: profileData?.target_weight?.toString() || ''
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profileData) {
      setFormData({
        full_name: profileData.full_name || user?.name || '',
        date_of_birth: profileData.date_of_birth || null,
        gender: profileData.gender || '',
        height: profileData.height?.toString() || '',
        weight: profileData.weight?.toString() || '',
        target_weight: profileData.target_weight?.toString() || ''
      });
    }
  }, [profileData, user]);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      date_of_birth: date ? format(date, 'yyyy-MM-dd') : null
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const dataToSave: Partial<ProfileData> = {
        full_name: formData.full_name,
        date_of_birth: formData.date_of_birth,
        gender: formData.gender as 'male' | 'female' | 'other' | null,
        height: formData.height ? parseFloat(formData.height) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        target_weight: formData.target_weight ? parseFloat(formData.target_weight) : null
      };
      
      await onSave(dataToSave);
    } catch (error) {
      console.error('Error saving personal info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your personal details and basic information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input 
              id="full_name" 
              value={formData.full_name} 
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={user?.email || ''} 
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed from this page
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.date_of_birth && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date_of_birth ? (
                    format(new Date(formData.date_of_birth), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date_of_birth ? new Date(formData.date_of_birth) : undefined}
                  onSelect={handleDateChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {formData.date_of_birth && (
              <p className="text-sm text-muted-foreground">
                Age: {calculateAge(formData.date_of_birth)} years
              </p>
            )}
          </div>
          
          <div className="space-y-3">
            <Label>Gender</Label>
            <RadioGroup 
              value={formData.gender} 
              onValueChange={(value) => handleInputChange('gender', value)}
              className="flex space-x-6"
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
              type="number" 
              value={formData.height} 
              onChange={(e) => handleInputChange('height', e.target.value)}
              placeholder="170"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Current Weight (kg)</Label>
            <Input 
              id="weight" 
              type="number" 
              value={formData.weight} 
              onChange={(e) => handleInputChange('weight', e.target.value)}
              placeholder="70"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target_weight">Target Weight (kg)</Label>
            <Input 
              id="target_weight" 
              type="number" 
              value={formData.target_weight} 
              onChange={(e) => handleInputChange('target_weight', e.target.value)}
              placeholder="65"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" /> 
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoTab;