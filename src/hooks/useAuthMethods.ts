
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

export const useAuthMethods = (fetchProfile: () => Promise<void>, isProfileComplete: boolean) => {
  const [user, setUser] = useState<{ name?: string; email: string; isAuthenticated: boolean; isPremium?: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Clean up auth state to prevent authentication "limbo" states
  const cleanupAuthState = () => {
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Clean up existing state before logging in
      cleanupAuthState();
      
      try {
        // Attempt global sign out to ensure clean state
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.error("Pre-login signout failed:", err);
      }
      
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      // Check if user is a premium user - this would be based on your subscription logic
      // For demo, we'll just check if the email contains "premium"
      const isPremium = email.includes('premium');
      
      // Store auth info
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isPremium', String(isPremium));
      
      setUser({
        email,
        isAuthenticated: true,
        isPremium
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
      
      // Clean up existing state before signing up
      cleanupAuthState();
      
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
      localStorage.setItem('isPremium', 'false'); // New users are not premium by default
      
      setUser({
        name,
        email,
        isAuthenticated: true,
        isPremium: false
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
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      // Remove local storage items
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('isPremium');
      
      setUser(null);
      
      // Force page reload for a clean state
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { user, login, signup, logout, isLoading, setUser, setIsLoading };
};
