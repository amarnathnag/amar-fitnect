import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Save, Settings, Shield } from 'lucide-react';
import { ProfileData } from '@/types/auth';

interface EnhancedPreferencesTabProps {
  profileData: ProfileData | null;
  onSave: (data: Partial<ProfileData>) => Promise<void>;
}

const EnhancedPreferencesTab: React.FC<EnhancedPreferencesTabProps> = ({ profileData, onSave }) => {
  const [formData, setFormData] = useState({
    fitness_goal: profileData?.fitness_goal || '',
    food_preference: profileData?.food_preference || '',
    activity_level: profileData?.activity_level || 'moderate',
    allergies: profileData?.allergies || '',
    medical_conditions: profileData?.medical_conditions || '',
    health_issues: profileData?.health_issues || ''
  });

  const [privacySettings, setPrivacySettings] = useState({
    profile_visibility: profileData?.privacy_settings?.profile_visibility || 'private',
    data_sharing: profileData?.privacy_settings?.data_sharing || false
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profileData) {
      setFormData({
        fitness_goal: profileData.fitness_goal || '',
        food_preference: profileData.food_preference || '',
        activity_level: profileData.activity_level || 'moderate',
        allergies: profileData.allergies || '',
        medical_conditions: profileData.medical_conditions || '',
        health_issues: profileData.health_issues || ''
      });

      setPrivacySettings({
        profile_visibility: profileData.privacy_settings?.profile_visibility || 'private',
        data_sharing: profileData.privacy_settings?.data_sharing || false
      });
    }
  }, [profileData]);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrivacyChange = (name: string, value: string | boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const dataToSave: Partial<ProfileData> = {
        ...formData,
        fitness_goal: formData.fitness_goal as ProfileData['fitness_goal'],
        food_preference: formData.food_preference as ProfileData['food_preference'],
        privacy_settings: privacySettings
      };
      
      await onSave(dataToSave);
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Health & Fitness Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fitness_goal">Fitness Goal</Label>
              <Select 
                value={formData.fitness_goal} 
                onValueChange={(value) => handleInputChange('fitness_goal', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your fitness goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight_loss">Weight Loss</SelectItem>
                  <SelectItem value="weight_gain">Weight Gain</SelectItem>
                  <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                  <SelectItem value="maintain_fitness">Maintain Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="food_preference">Food Preference</Label>
              <Select 
                value={formData.food_preference} 
                onValueChange={(value) => handleInputChange('food_preference', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your food preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="non_vegetarian">Non-Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity_level">Activity Level</Label>
            <Select 
              value={formData.activity_level} 
              onValueChange={(value) => handleInputChange('activity_level', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (Little/no exercise)</SelectItem>
                <SelectItem value="light">Light (Light exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate (Moderate exercise 3-5 days/week)</SelectItem>
                <SelectItem value="active">Active (Hard exercise 6-7 days/week)</SelectItem>
                <SelectItem value="very_active">Very Active (Physical job or 2x/day exercise)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea 
              id="allergies"
              value={formData.allergies} 
              onChange={(e) => handleInputChange('allergies', e.target.value)}
              placeholder="List any food allergies or dietary restrictions..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medical_conditions">Medical Conditions</Label>
            <Textarea 
              id="medical_conditions"
              value={formData.medical_conditions} 
              onChange={(e) => handleInputChange('medical_conditions', e.target.value)}
              placeholder="List any medical conditions that may affect your fitness routine..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="health_issues">Additional Health Notes</Label>
            <Textarea 
              id="health_issues"
              value={formData.health_issues} 
              onChange={(e) => handleInputChange('health_issues', e.target.value)}
              placeholder="Any other health-related information..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="profile_visibility">Profile Visibility</Label>
            <Select 
              value={privacySettings.profile_visibility} 
              onValueChange={(value) => handlePrivacyChange('profile_visibility', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Control who can see your profile information
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data_sharing">Data Sharing</Label>
              <p className="text-sm text-muted-foreground">
                Allow anonymized data to be used for improving our services
              </p>
            </div>
            <Switch
              id="data_sharing"
              checked={privacySettings.data_sharing}
              onCheckedChange={(checked) => handlePrivacyChange('data_sharing', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" /> 
          {isLoading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </div>
  );
};

export default EnhancedPreferencesTab;