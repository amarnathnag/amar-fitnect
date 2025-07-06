
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
import { Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { supabase } from '@/integrations/supabase/client';

const ProfileSetup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    date_of_birth: null as Date | null,
    gender: '',
    height: '',
    weight: '',
    fitness_goal: '',
    food_preference: '',
    health_issues: ''
  });

  // Check authentication status
  useEffect(() => {
    if (!authLoading && !user) {
      console.log("No authenticated user found, redirecting to auth page");
      toast({
        title: "Authentication required",
        description: "Please sign in to complete your profile.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, authLoading, navigate, toast]);

  const handleInputChange = (field: string, value: string | Date | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      { field: 'full_name', label: 'Full Name' },
      { field: 'gender', label: 'Gender' },
      { field: 'height', label: 'Height' },
      { field: 'weight', label: 'Weight' },
      { field: 'fitness_goal', label: 'Fitness Goal' },
      { field: 'food_preference', label: 'Food Preference' }
    ];

    for (const { field, label } of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: "Missing Information",
          description: `Please enter ${label}`,
          variant: "destructive",
        });
        return false;
      }
    }

    if (!formData.date_of_birth) {
      toast({
        title: "Missing Information",
        description: "Please select your date of birth",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to update your profile.",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      
      console.log("Submitting profile data:", formData);
      
      // Get current session to ensure we have the user ID
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session?.user?.id) {
        throw new Error("Authentication error. Please log in again.");
      }
      
      const userId = sessionData.session.user.id;
      
      // Prepare profile data for user_profiles table
      const profileData = {
        user_id: userId,
        full_name: formData.full_name.trim(),
        date_of_birth: formData.date_of_birth ? format(formData.date_of_birth, 'yyyy-MM-dd') : null,
        gender: formData.gender,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        fitness_goal: formData.fitness_goal,
        food_preference: formData.food_preference,
        health_issues: formData.health_issues || null,
      };
      
      console.log('Prepared profile data:', profileData);
      
      // Check if profile exists
      const { data: existingProfile, error: checkError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (checkError) {
        console.error('Error checking existing profile:', checkError);
        throw checkError;
      }
      
      let result;
      if (existingProfile) {
        // Update existing profile
        console.log('Updating existing profile');
        result = await supabase
          .from('user_profiles')
          .update(profileData)
          .eq('user_id', userId)
          .select()
          .single();
      } else {
        // Insert new profile
        console.log('Creating new profile');
        result = await supabase
          .from('user_profiles')
          .insert([profileData])
          .select()
          .single();
      }
      
      if (result.error) {
        console.error('Profile operation error:', result.error);
        throw result.error;
      }
      
      console.log('Profile saved successfully:', result.data);
      
      toast({
        title: "Profile setup completed! ✅",
        description: "Your profile has been successfully created.",
      });
      
      // Navigate to profile page
      navigate('/profile');
    } catch (error: any) {
      console.error('Profile setup error:', error);
      toast({
        title: "Profile setup failed",
        description: error.message || "There was an error setting up your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-10">
        <div className="container max-w-3xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
              <CardDescription>
                Help us personalize your health journey by providing some basic information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input 
                      id="full_name"
                      placeholder="John Doe" 
                      value={formData.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      required
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
                              "w-full justify-start text-left font-normal",
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
                </div>
                
                {/* Physical Measurements Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Physical Measurements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm) *</Label>
                      <Input 
                        id="height"
                        placeholder="175" 
                        type="number"
                        value={formData.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg) *</Label>
                      <Input 
                        id="weight"
                        placeholder="70" 
                        type="number"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Preferences Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Preferences</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fitness_goal">Fitness Goal *</Label>
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
                    <Label htmlFor="food_preference">Food Preference *</Label>
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="health_issues">Existing Health Issues (Optional)</Label>
                    <Textarea 
                      id="health_issues"
                      placeholder="E.g., Diabetes, Hypertension, etc." 
                      className="resize-none" 
                      value={formData.health_issues}
                      onChange={(e) => handleInputChange('health_issues', e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Share any health conditions that might affect your fitness plan.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    className="px-6 bg-green-600 hover:bg-green-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : (
                      <div className="flex items-center">
                        Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfileSetup;
