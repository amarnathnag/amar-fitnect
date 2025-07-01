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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

// Form validation schema
const profileFormSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  date_of_birth: z.date({ required_error: "Date of birth is required" }),
  gender: z.enum(["male", "female", "other"], { required_error: "Gender is required" }),
  height: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, { message: "Height must be a positive number" }),
  weight: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, { message: "Weight must be a positive number" }),
  fitness_goal: z.enum(["weight_loss", "weight_gain", "muscle_gain", "maintain_fitness"], { required_error: "Fitness goal is required" }),
  food_preference: z.enum(["vegetarian", "non_vegetarian"], { required_error: "Food preference is required" }),
  health_issues: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileSetup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isLoading: authLoading, updateProfile, profileData } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: user?.name || profileData?.full_name || "",
      health_issues: profileData?.health_issues || "",
    },
  });

  // Update form with existing profile data
  useEffect(() => {
    if (profileData) {
      form.setValue('full_name', profileData.full_name || user?.name || "");
      if (profileData.date_of_birth) {
        form.setValue('date_of_birth', new Date(profileData.date_of_birth));
      }
      if (profileData.gender) {
        form.setValue('gender', profileData.gender);
      }
      if (profileData.height) {
        form.setValue('height', profileData.height.toString());
      }
      if (profileData.weight) {
        form.setValue('weight', profileData.weight.toString());
      }
      if (profileData.fitness_goal) {
        form.setValue('fitness_goal', profileData.fitness_goal);
      }
      if (profileData.food_preference) {
        form.setValue('food_preference', profileData.food_preference);
      }
      if (profileData.health_issues) {
        form.setValue('health_issues', profileData.health_issues);
      }
    }
  }, [profileData, user, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to update your profile.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      console.log("Submitting profile data:", data);
      await updateProfile({
        full_name: data.full_name,
        date_of_birth: format(data.date_of_birth, 'yyyy-MM-dd'),
        gender: data.gender,
        height: parseFloat(data.height),
        weight: parseFloat(data.weight),
        fitness_goal: data.fitness_goal,
        food_preference: data.food_preference,
        health_issues: data.health_issues || null,
      });
      
      toast({
        title: "Profile setup completed!",
        description: "Your profile has been successfully created.",
      });
      
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-health-primary"></div>
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date_of_birth"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date of Birth</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-4"
                              >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="male" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Male
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="female" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Female
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="other" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Other
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Physical Measurements Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Physical Measurements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Height (cm)</FormLabel>
                            <FormControl>
                              <Input placeholder="175" {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight (kg)</FormLabel>
                            <FormControl>
                              <Input placeholder="70" {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Preferences Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Preferences</h3>
                    
                    <FormField
                      control={form.control}
                      name="fitness_goal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fitness Goal</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your fitness goal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="weight_loss">Weight Loss</SelectItem>
                              <SelectItem value="weight_gain">Weight Gain</SelectItem>
                              <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                              <SelectItem value="maintain_fitness">Maintain Fitness</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="food_preference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Food Preference</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your food preference" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="vegetarian">Vegetarian</SelectItem>
                              <SelectItem value="non_vegetarian">Non-Vegetarian</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="health_issues"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Existing Health Issues (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="E.g., Diabetes, Hypertension, etc." 
                              className="resize-none" 
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Share any health conditions that might affect your fitness plan.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="px-6"
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
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfileSetup;
