
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

export const useAuthMethods = (fetchProfile: () => Promise<void>, isProfileComplete: boolean) => {
  const [user, setUser] = useState<{ name?: string; email: string; isAuthenticated: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
      
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { user, login, signup, logout, isLoading, setUser, setIsLoading };
};
