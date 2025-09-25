import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Calendar as CalendarIcon, ArrowRight, User, Ruler, Target, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from "@/components/ui/progress";

interface FormData {
  full_name: string;
  date_of_birth: Date | null;
  gender: string;
  height: string;
  weight: string;
  target_weight: string;
  fitness_goal: string;
  food_preference: string;
  activity_level: string;
  health_issues: string;
  allergies: string;
  medical_conditions: string;
}

const EnhancedProfileSetup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    date_of_birth: null,
    gender: '',
    height: '',
    weight: '',
    target_weight: '',
    fitness_goal: '',
    food_preference: '',
    activity_level: '',
    health_issues: '',
    allergies: '',
    medical_conditions: ''
  });

  // Check authentication status
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to complete your profile.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, authLoading, navigate, toast]);

  const handleInputChange = (field: keyof FormData, value: string | Date | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.full_name || !formData.date_of_birth || !formData.gender) {
          toast({
            title: "Missing Information",
            description: "Please complete all personal information fields",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2:
        if (!formData.height || !formData.weight) {
          toast({
            title: "Missing Information",
            description: "Please enter your height and weight",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 3:
        if (!formData.fitness_goal || !formData.food_preference || !formData.activity_level) {
          toast({
            title: "Missing Information",
            description: "Please complete your preferences",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to update your profile.",
        variant: "destructive",
      });
      return;
    }

    if (!validateStep(currentStep)) {
      return;
    }

    try {
      setIsSubmitting(true);
      
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session?.user?.id) {
        throw new Error("Authentication error. Please log in again.");
      }
      
      const userId = sessionData.session.user.id;
      
      const profileData = {
        user_id: userId,
        full_name: formData.full_name.trim(),
        date_of_birth: formData.date_of_birth ? format(formData.date_of_birth, 'yyyy-MM-dd') : null,
        gender: formData.gender,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        target_weight: formData.target_weight ? parseFloat(formData.target_weight) : null,
        fitness_goal: formData.fitness_goal,
        food_preference: formData.food_preference,
        activity_level: formData.activity_level,
        health_issues: formData.health_issues || null,
        allergies: formData.allergies || null,
        medical_conditions: formData.medical_conditions || null,
      };
      
      const { data: existingProfile, error: checkError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (checkError) {
        throw checkError;
      }
      
      let result;
      if (existingProfile) {
        result = await supabase
          .from('user_profiles')
          .update(profileData)
          .eq('user_id', userId)
          .select()
          .single();
      } else {
        result = await supabase
          .from('user_profiles')
          .insert([profileData])
          .select()
          .single();
      }
      
      if (result.error) {
        throw result.error;
      }
      
      toast({
        title: "Profile setup completed! ✅",
        description: "Your profile has been successfully created.",
      });
      
      navigate('/profile');
    } catch (error: any) {
      toast({
        title: "Profile setup failed",
        description: error.message || "There was an error setting up your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <p className="text-muted-foreground">Let's start with basic details about you</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input 
                  id="full_name"
                  placeholder="Enter your full name" 
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  className="h-12"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date of Birth *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !formData.date_of_birth && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date_of_birth ? (
                          format(formData.date_of_birth, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date_of_birth || undefined}
                        onSelect={(date) => handleInputChange('date_of_birth', date || null)}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-3">
                  <Label>Gender *</Label>
                  <RadioGroup 
                    value={formData.gender} 
                    onValueChange={(value) => handleInputChange('gender', value)}
                    className="flex flex-col space-y-2"
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
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Ruler className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold">Physical Measurements</h3>
              <p className="text-muted-foreground">Help us understand your current physical stats</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm) *</Label>
                <Input 
                  id="height"
                  placeholder="175" 
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Current Weight (kg) *</Label>
                <Input 
                  id="weight"
                  placeholder="70" 
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="target_weight">Target Weight (kg) - Optional</Label>
                <Input 
                  id="target_weight"
                  placeholder="65" 
                  type="number"
                  value={formData.target_weight}
                  onChange={(e) => handleInputChange('target_weight', e.target.value)}
                  className="h-12"
                />
                <p className="text-sm text-muted-foreground">
                  Leave empty if you're not targeting a specific weight
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold">Health Goals & Preferences</h3>
              <p className="text-muted-foreground">Tell us about your goals and lifestyle</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fitness_goal">Primary Fitness Goal *</Label>
                <Select 
                  value={formData.fitness_goal} 
                  onValueChange={(value) => handleInputChange('fitness_goal', value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your primary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight_loss">Lose Weight</SelectItem>
                    <SelectItem value="weight_gain">Gain Weight</SelectItem>
                    <SelectItem value="muscle_gain">Build Muscle</SelectItem>
                    <SelectItem value="maintain_fitness">Maintain Current Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="food_preference">Food Preference *</Label>
                <Select 
                  value={formData.food_preference} 
                  onValueChange={(value) => handleInputChange('food_preference', value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your dietary preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="non_vegetarian">Non-Vegetarian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity_level">Current Activity Level *</Label>
                <Select 
                  value={formData.activity_level} 
                  onValueChange={(value) => handleInputChange('activity_level', value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="How active are you currently?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (Little to no exercise)</SelectItem>
                    <SelectItem value="light">Light (Light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (Moderate exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (Heavy exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="very_active">Very Active (Physical job + exercise)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Check className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold">Health Information</h3>
              <p className="text-muted-foreground">Optional details to personalize your experience</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="health_issues">Existing Health Issues</Label>
                <Textarea 
                  id="health_issues"
                  placeholder="E.g., Diabetes, Hypertension, etc." 
                  className="resize-none" 
                  value={formData.health_issues}
                  onChange={(e) => handleInputChange('health_issues', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Known Allergies</Label>
                <Textarea 
                  id="allergies"
                  placeholder="E.g., Nuts, Dairy, Gluten, etc." 
                  className="resize-none" 
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medical_conditions">Medical Conditions</Label>
                <Textarea 
                  id="medical_conditions"
                  placeholder="Any other medical conditions we should know about..." 
                  className="resize-none" 
                  value={formData.medical_conditions}
                  onChange={(e) => handleInputChange('medical_conditions', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  💡 This information helps us provide better personalized recommendations and ensures your safety during workouts and meal planning.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Complete Your Profile</h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progressPercentage} className="w-full h-2" />
        </div>

        <Card className="shadow-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
          <CardContent className="p-8">
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={onSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-600"
                >
                  {isSubmitting ? "Saving..." : "Complete Setup"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedProfileSetup;