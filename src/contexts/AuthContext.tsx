
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

interface User {
  name?: string;
  email: string;
  isAuthenticated: boolean;
}

interface ProfileData {
  id: string;
  full_name: string | null;
  date_of_birth: string | null;
  gender: 'male' | 'female' | 'other' | null;
  height: number | null;
  weight: number | null;
  fitness_goal: 'weight_loss' | 'weight_gain' | 'muscle_gain' | 'maintain_fitness' | null;
  food_preference: 'vegetarian' | 'non_vegetarian' | null;
  health_issues: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  profileData: ProfileData | null;
  isProfileComplete: boolean;
  updateProfile: (data: Partial<ProfileData>) => Promise<void>;
  fetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated and fetch profile data
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');

    if (isAuthenticated && email) {
      setUser({
        name: name || undefined,
        email,
        isAuthenticated: true,
      });
      
      // Fetch profile data if user is authenticated
      fetchProfile();
    }

    setIsLoading(false);
  }, []);

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

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      // Store auth info
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      
      setUser({
        email,
        isAuthenticated: true
      });

      // Fetch user profile after login
      await fetchProfile();

      // Redirect based on profile completion
      if (isProfileComplete) {
        navigate('/profile');
      } else {
        navigate('/profile-setup');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      // Store auth info
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      
      setUser({
        name,
        email,
        isAuthenticated: true
      });
      
      navigate('/profile-setup');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      
      setUser(null);
      setProfileData(null);
      setIsProfileComplete(false);
      
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isLoading, 
      profileData, 
      isProfileComplete, 
      updateProfile,
      fetchProfile
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
