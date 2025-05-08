
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ProfileData } from '@/types/auth';
import { useToast } from "@/hooks/use-toast";

export const useProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch user profile from Supabase
  const fetchProfile = async () => {
    try {
      console.log("Attempting to fetch user profile...");
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        console.log('No active session found when fetching profile');
        setProfileData(null);
        setIsProfileComplete(false);
        return;
      }
      
      const userId = sessionData.session.user.id;
      console.log(`Fetching profile for user ID: ${userId}`);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Could not fetch your profile information.",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        console.log("Profile data retrieved:", data);
        setProfileData(data as ProfileData);
        
        // Check if profile is complete by verifying required fields
        const hasRequiredFields = 
          data.full_name && 
          data.gender && 
          data.height && 
          data.weight && 
          data.fitness_goal && 
          data.food_preference;
        
        setIsProfileComplete(!!hasRequiredFields);
        console.log("Profile complete status:", !!hasRequiredFields);
      } else {
        console.log("No profile data found for user");
        setIsProfileComplete(false);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      toast({
        title: "Error",
        description: "Could not fetch your profile information.",
        variant: "destructive",
      });
    }
  };

  // Update user profile in Supabase
  const updateProfile = async (data: Partial<ProfileData>) => {
    try {
      setIsLoading(true);
      console.log("Updating user profile with data:", data);
      
      // Get current session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        console.error("No authenticated user found during profile update:", sessionError);
        toast({
          title: "Authentication Error",
          description: "You must be logged in to update your profile",
          variant: "destructive",
        });
        throw new Error("You must be logged in to update your profile");
      }

      const userId = sessionData.session.user.id;
      console.log('Updating profile for user ID:', userId);
      
      // Check if profile exists
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (profileCheckError) {
        console.error('Error checking existing profile:', profileCheckError);
        throw profileCheckError;
      }
      
      let result;
      
      if (existingProfile) {
        // Update existing profile
        console.log('Updating existing profile');
        result = await supabase
          .from('user_profiles')
          .update(data)
          .eq('user_id', userId);
      } else {
        // Insert new profile
        console.log('Creating new profile with user ID:', userId);
        result = await supabase
          .from('user_profiles')
          .insert([{ 
            user_id: userId,
            ...data 
          }]);
      }
      
      if (result.error) {
        console.error('Error in profile operation:', result.error);
        toast({
          title: "Profile Update Failed",
          description: "There was a problem updating your profile. Please try again.",
          variant: "destructive",
        });
        throw result.error;
      }
      
      // Refresh profile data
      await fetchProfile();
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      
      return result;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profileData,
    isProfileComplete,
    isLoading,
    fetchProfile,
    updateProfile
  };
};
