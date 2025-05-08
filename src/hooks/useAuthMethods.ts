
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { User } from '@/types/auth';

export const useAuthMethods = (fetchProfile: () => Promise<void>, isProfileComplete: boolean) => {
  const [user, setUser] = useState<User | null>(null);
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
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
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
      
      if (!data.session || !data.user) {
        throw new Error("Login failed: No session or user returned");
      }
      
      console.log("Login successful, session established", data.session.access_token.slice(0, 10) + '...');
      
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
        isPremium,
        name: data.user.user_metadata?.full_name
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
      
      if (!data.session || !data.user) {
        throw new Error("Signup failed: No session or user returned");
      }
      
      console.log("Signup successful, session established", data.session.access_token.slice(0, 10) + '...');
      
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
      setIsLoading(true);
      
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
    } finally {
      setIsLoading(false);
    }
  };

  return { user, login, signup, logout, isLoading, setUser, setIsLoading };
};
