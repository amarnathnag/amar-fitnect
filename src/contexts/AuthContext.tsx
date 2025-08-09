
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { AuthContextType, ProfileData } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.id);
      setSession(session);
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || '',
          isAuthenticated: true,
          isPremium: false,
          isAdmin: false,
          gender: null
        });
        setTimeout(() => fetchProfile(session), 0);
        setTimeout(() => fetchAdminRole(session.user.id), 0);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        
        if (session) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || '',
            isAuthenticated: true,
            isPremium: false,
            isAdmin: false,
            gender: null
          });
          setTimeout(() => fetchProfile(session), 0);
          setTimeout(() => fetchAdminRole(session.user.id), 0);
        } else {
          setUser(null);
          setProfileData(null);
          setIsProfileComplete(false);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();
      if (!error && data) {
        setUser((prev: any) => (prev ? { ...prev, isAdmin: true } : prev));
      }
    } catch (e) {
      console.error('Error checking admin role:', e);
    }
  };

  const fetchProfile = async (currentSession?: Session) => {
    const sessionToUse = currentSession || session;
    if (!sessionToUse?.user?.id) return;

    try {
      console.log('Fetching profile for user:', sessionToUse.user.id);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', sessionToUse.user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        // Parse JSON fields if they exist
        let periodTracking = null;
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

        const transformedData: ProfileData = {
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
          notification_preferences: notificationPreferences,
          privacy_settings: privacySettings,
          period_tracking: periodTracking
        };

        setProfileData(transformedData);
        const isComplete = !!(
          transformedData.full_name &&
          transformedData.date_of_birth &&
          transformedData.gender &&
          transformedData.height &&
          transformedData.weight &&
          transformedData.fitness_goal &&
          transformedData.food_preference
        );
        setIsProfileComplete(isComplete);
        console.log('Profile fetched successfully:', { isComplete });
      } else {
        setIsProfileComplete(false);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const updateProfile = async (data: Partial<ProfileData>) => {
    if (!session?.user?.id) {
      throw new Error('User not authenticated');
    }

    try {
      console.log('Updating user profile with data:', data);
      
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
      
      const { data: existingProfile, error: checkError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing profile:', checkError);
        throw checkError;
      }

      let result;
      if (existingProfile) {
        result = await supabase
          .from('user_profiles')
          .update(updateData)
          .eq('user_id', session.user.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('user_profiles')
          .insert([{ ...updateData, user_id: session.user.id }])
          .select()
          .single();
      }

      if (result.error) {
        console.error('Error updating profile:', result.error);
        throw result.error;
      }

      // Refresh profile data
      await fetchProfile();
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Attempting login for:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        toast({
          title: "Login failed",
          description: error.message || "Invalid email or password",
          variant: "destructive",
        });
        return { success: false, error: error.message };
      }

      if (data.user) {
        console.log('Login successful for:', data.user.email);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        return { success: true, data };
      }

      return { success: false, error: "Unknown error" };
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Attempting signup for:', email);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            name: name,
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Signup failed",
          description: error.message || "There was an error creating your account",
          variant: "destructive",
        });
        return { success: false, error: error.message };
      }

      if (data.user) {
        console.log('Signup successful for:', data.user.email);
        toast({
          title: "Account created successfully",
          description: "Please check your email to verify your account.",
        });
        return { success: true, data };
      }

      return { success: false, error: "Unknown error" };
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: error.message || "There was an error creating your account",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        console.error('Google sign-in error:', error);
        toast({
          title: "Google sign-in failed",
          description: error.message || "There was an error signing in with Google",
          variant: "destructive",
        });
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast({
        title: "Google sign-in failed",
        description: error.message || "There was an error signing in with Google",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      console.log('Attempting logout');
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
      
      setUser(null);
      setSession(null);
      setProfileData(null);
      setIsProfileComplete(false);
      
      toast({
        title: "Logged out successfully",
        description: "See you next time!",
      });
      
    } catch (error: any) {
      console.error('Logout error:', error);
      setUser(null);
      setSession(null);
      setProfileData(null);
      setIsProfileComplete(false);
    } finally {
      setIsLoading(false);
    }
  };

  const upgradeToPremium = () => {
    if (user) {
      setUser({ ...user, isPremium: true });
      return true;
    }
    return false;
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    signInWithGoogle,
    logout,
    isLoading,
    profileData,
    isProfileComplete,
    updateProfile,
    fetchProfile,
    upgradeToPremium,
  };

  console.log('AuthContext render - user:', user?.id, 'isLoading:', isLoading);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
