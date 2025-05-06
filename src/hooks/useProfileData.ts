
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ProfileData } from '@/types/auth';

export const useProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user profile from Supabase
  const fetchProfile = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (session.session) {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', session.session.user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
          return;
        }

        if (data) {
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
        } else {
          setIsProfileComplete(false);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Update user profile in Supabase
  const updateProfile = async (data: Partial<ProfileData>) => {
    try {
      setIsLoading(true);
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        throw new Error("No authenticated user");
      }

      const userId = session.session.user.id;
      
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
      
      let result;
      
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from('user_profiles')
          .update(data)
          .eq('user_id', userId);
      } else {
        // Insert new profile
        result = await supabase
          .from('user_profiles')
          .insert([{ 
            user_id: userId,
            ...data 
          }]);
      }
      
      if (result.error) {
        throw result.error;
      }
      
      // Refresh profile data
      await fetchProfile();
      
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
