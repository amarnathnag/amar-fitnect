import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, ProfileData } from '@/types/auth';
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // Clean up auth state utility
  const cleanupAuthState = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
  };

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetching to avoid deadlocks
          setTimeout(() => {
            fetchProfile();
          }, 0);
        } else {
          setProfileData(null);
          setIsProfileComplete(false);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile();
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async () => {
    try {
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
        return;
      }

      if (data) {
        console.log("Profile data retrieved:", data);
        
        // Parse period_tracking JSON if it exists
        let periodTracking = null;
        if (data.period_tracking) {
          try {
            periodTracking = typeof data.period_tracking === 'string' 
              ? JSON.parse(data.period_tracking) 
              : data.period_tracking;
          } catch (e) {
            console.error('Error parsing period tracking data:', e);
          }
        }

        const profileData = {
          ...data,
          period_tracking: periodTracking
        } as ProfileData;

        setProfileData(profileData);
        
        const hasRequiredFields = 
          data.full_name && 
          data.gender && 
          data.height && 
          data.weight && 
          data.fitness_goal && 
          data.food_preference;
        
        setIsProfileComplete(!!hasRequiredFields);
      } else {
        console.log("No profile data found for user");
        setIsProfileComplete(false);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const updateProfile = async (data: Partial<ProfileData>) => {
    try {
      setIsLoading(true);
      console.log("Updating user profile with data:", data);
      
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
      
      // Prepare the data for update, stringify period_tracking if present
      const updateData: any = { ...data };
      if (updateData.period_tracking) {
        updateData.period_tracking = JSON.stringify(updateData.period_tracking);
      }
      
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
        result = await supabase
          .from('user_profiles')
          .update(updateData)
          .eq('user_id', userId);
      } else {
        result = await supabase
          .from('user_profiles')
          .insert([{ 
            user_id: userId,
            ...updateData 
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

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Clean up any existing state
      cleanupAuthState();
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        toast({
          title: "Login Failed",
          description: error.message || "Invalid credentials. Please try again.",
          variant: "destructive",
        });
        return { success: false, error: error.message };
      }

      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error.message);
      toast({
        title: "Login Failed",
        description: error.message || "Something went wrong. Please try again.",
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

      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            name: name,
          },
          emailRedirectTo: redirectUrl
        },
      });

      if (error) {
        console.error('Signup error:', error.message);
        toast({
          title: "Signup Failed",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
        return { success: false, error: error.message };
      }

      toast({
        title: "Signup Successful",
        description: `Welcome, ${name}! Please check your email to verify your account.`,
      });

      return { success: true };
    } catch (error: any) {
      console.error('Signup error:', error.message);
      toast({
        title: "Signup Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      
      // Clean up any existing state
      cleanupAuthState();
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        console.error('Google login error:', error.message);
        toast({
          title: "Google Login Failed",
          description: error.message || "Failed to sign in with Google. Please try again.",
          variant: "destructive",
        });
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Google login error:', error.message);
      toast({
        title: "Google Login Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Clean up auth state
      cleanupAuthState();
      
      await supabase.auth.signOut({ scope: 'global' });
      
      setUser(null);
      setSession(null);
      setProfileData(null);
      setIsProfileComplete(false);
      
      toast({
        title: "Logout Successful",
        description: "You have been logged out.",
      });
      
      // Force page reload for clean state
      window.location.href = '/';
    } catch (error: any) {
      console.error('Logout error:', error.message);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const upgradeToPremium = () => {
    // Mock implementation - in real app this would handle payment
    if (user) {
      const updatedUser = { ...user, isPremium: true };
      setUser(updatedUser);
      
      // Update localStorage to persist premium status
      localStorage.setItem('isPremium', 'true');
      
      toast({
        title: "Premium Access Granted",
        description: "You now have access to all premium features!",
      });
      return true;
    }
    return false;
  };

  const authUser = user ? {
    id: user.id,
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
    email: user.email || '',
    isAuthenticated: true,
    isPremium: user.user_metadata?.isPremium || localStorage.getItem('isPremium') === 'true' || false,
    isAdmin: user.email === 'admin@healthapp.com',
    gender: profileData?.gender as 'male' | 'female' | 'other' | null,
  } : null;

  return (
    <AuthContext.Provider value={{ 
      user: authUser, 
      login, 
      signup, 
      logout, 
      isLoading, 
      profileData, 
      isProfileComplete,
      updateProfile,
      fetchProfile,
      upgradeToPremium,
      signInWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
