
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
        fetchProfile();
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
          setTimeout(() => {
            fetchProfile();
          }, 0);
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

  const fetchProfile = async () => {
    if (!session?.user?.id) return;

    try {
      console.log('Fetching profile for user:', session.user.id);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfileData(data);
        const isComplete = !!(
          data.full_name &&
          data.date_of_birth &&
          data.gender &&
          data.height &&
          data.weight &&
          data.fitness_goal &&
          data.food_preference
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
      
      // Check if profile exists
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
        // Update existing profile
        result = await supabase
          .from('user_profiles')
          .update(data)
          .eq('user_id', session.user.id)
          .select()
          .single();
      } else {
        // Create new profile
        result = await supabase
          .from('user_profiles')
          .insert([{ ...data, user_id: session.user.id }])
          .select()
          .single();
      }

      if (result.error) {
        console.error('Error updating profile:', result.error);
        throw result.error;
      }

      setProfileData(result.data);
      
      // Check if profile is now complete
      const isComplete = !!(
        result.data.full_name &&
        result.data.date_of_birth &&
        result.data.gender &&
        result.data.height &&
        result.data.weight &&
        result.data.fitness_goal &&
        result.data.food_preference
      );
      setIsProfileComplete(isComplete);
      
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      }

      return data;
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            name: name,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Account created successfully",
          description: "Please check your email to verify your account.",
        });
      }

      return data;
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: error.message || "There was an error creating your account",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setProfileData(null);
      setIsProfileComplete(false);
      
      toast({
        title: "Logged out successfully",
        description: "See you next time!",
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: error.message || "There was an error logging out",
        variant: "destructive",
      });
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
    logout,
    isLoading,
    profileData,
    isProfileComplete,
    updateProfile,
    fetchProfile,
    upgradeToPremium,
  };

  console.log('AuthContext render - user:', user?.id, 'isProfileComplete:', isProfileComplete);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
