
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ProfileData, PeriodTrackingData } from '@/types/auth';
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
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        return;
      }
      
      if (!sessionData.session?.user) {
        console.log('No active session found when fetching profile');
        setProfileData(null);
        setIsProfileComplete(false);
        return;
      }
      
      const userId = sessionData.session.user.id;
      console.log(`Fetching profile for user ID: ${userId}`);
      
      // Fetch from user_profiles table
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        // Don't show error toast for missing profile - it's normal for new users
        if (error.code !== 'PGRST116') {
          console.error('Profile fetch error that is not "no rows":', error);
        }
        return;
      }

      if (data) {
        console.log("Profile data retrieved:", data);
        
        // Parse JSON fields if they exist
        let periodTracking: PeriodTrackingData | null = null;
        let notificationPreferences = null;
        let privacySettings = null;
        
        if (data.period_tracking) {
          try {
            periodTracking = typeof data.period_tracking === 'string' 
              ? JSON.parse(data.period_tracking) 
              : data.period_tracking;
          } catch (e) {
            console.error('Error parsing period tracking data:', e);
          }
        }

        if (data.notification_preferences) {
          try {
            notificationPreferences = typeof data.notification_preferences === 'string' 
              ? JSON.parse(data.notification_preferences) 
              : data.notification_preferences;
          } catch (e) {
            console.error('Error parsing notification preferences:', e);
          }
        }

        if (data.privacy_settings) {
          try {
            privacySettings = typeof data.privacy_settings === 'string' 
              ? JSON.parse(data.privacy_settings) 
              : data.privacy_settings;
          } catch (e) {
            console.error('Error parsing privacy settings:', e);
          }
        }

        const profileData: ProfileData = {
          id: data.id,
          full_name: data.full_name,
          date_of_birth: data.date_of_birth,
          gender: data.gender as 'male' | 'female' | 'other' | null,
          height: data.height,
          weight: data.weight,
          target_weight: data.target_weight,
          fitness_goal: data.fitness_goal as ProfileData['fitness_goal'],
          food_preference: data.food_preference as ProfileData['food_preference'],
          health_issues: data.health_issues,
          activity_level: data.activity_level,
          allergies: data.allergies,
          medical_conditions: data.medical_conditions,
          notification_preferences: notificationPreferences || {
            email: true,
            push: true,
            sms: false
          },
          privacy_settings: privacySettings || {
            profile_visibility: 'private' as const,
            data_sharing: false
          },
          period_tracking: periodTracking
        };

        setProfileData(profileData);
        
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
        setProfileData(null);
        setIsProfileComplete(false);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  // Update user profile in Supabase
  const updateProfile = async (data: Partial<ProfileData>) => {
    try {
      setIsLoading(true);
      console.log("Updating user profile with data:", data);
      
      // Get current session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session?.user) {
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

      // Prepare the data for update, stringify JSON fields if present
      const updateData: any = { ...data };
      if (updateData.period_tracking) {
        updateData.period_tracking = JSON.stringify(updateData.period_tracking);
      }
      if (updateData.notification_preferences) {
        updateData.notification_preferences = JSON.stringify(updateData.notification_preferences);
      }
      if (updateData.privacy_settings) {
        updateData.privacy_settings = JSON.stringify(updateData.privacy_settings);
      }
      
      // Check if profile exists
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (profileCheckError && profileCheckError.code !== 'PGRST116') {
        console.error('Error checking existing profile:', profileCheckError);
        throw profileCheckError;
      }
      
      let result;
      
      if (existingProfile) {
        // Update existing profile
        console.log('Updating existing profile');
        result = await supabase
          .from('user_profiles')
          .update(updateData)
          .eq('user_id', userId)
          .select()
          .single();
      } else {
        // Insert new profile with user_id
        console.log('Creating new profile with user ID:', userId);
        result = await supabase
          .from('user_profiles')
          .insert([{ 
            user_id: userId,
            ...updateData 
          }])
          .select()
          .single();
      }
      
      if (result.error) {
        console.error('Error in profile operation:', result.error);
        toast({
          title: "Profile Update Failed",
          description: result.error.message || "There was a problem updating your profile. Please try again.",
          variant: "destructive",
        });
        throw result.error;
      }
      
      console.log('Profile operation successful:', result.data);
      
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
