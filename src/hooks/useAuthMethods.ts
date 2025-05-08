
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { User } from '@/types/auth';
import { useToast } from "@/hooks/use-toast";

export const useAuthMethods = (fetchProfile: () => Promise<void>, isProfileComplete: boolean) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Clean up auth state to prevent authentication "limbo" states
  const cleanupAuthState = () => {
    console.log("Cleaning up authentication state...");
    
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
    
    // Remove our custom auth storage items
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isPremium');
  };

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting to log in user:", email);
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
        console.error("Login error:", error);
        toast({
          title: "Login Failed",
          description: error.message || "Invalid credentials. Please check your email and password.",
          variant: "destructive",
        });
        throw error;
      }
      
      if (!data.session || !data.user) {
        console.error("Login returned no session or user");
        toast({
          title: "Login Failed",
          description: "No session was established. Please try again.",
          variant: "destructive",
        });
        throw new Error("Login failed: No session or user returned");
      }
      
      console.log("Login successful, session established", data.session.access_token.slice(0, 10) + '...');
      
      // Check if user is a premium user - this would be based on your subscription logic
      // For demo, we'll just check if the email contains "premium"
      const isPremium = email.includes('premium');
      const userName = data.user.user_metadata?.full_name;
      
      // Store auth info
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', userName || '');
      localStorage.setItem('isPremium', String(isPremium));
      
      setUser({
        email,
        isAuthenticated: true,
        isPremium,
        name: userName
      });

      toast({
        title: "Login Successful",
        description: `Welcome back${userName ? ', ' + userName : ''}!`,
      });

      // Fetch user profile after login
      await fetchProfile();

      // Redirect based on profile completion
      if (isProfileComplete) {
        navigate('/profile');
      } else {
        navigate('/profile-setup');
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      console.log("Attempting to sign up user:", email);
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
        console.error("Signup error:", error);
        toast({
          title: "Signup Failed",
          description: error.message || "Could not create account. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
      
      if (!data.user) {
        console.error("Signup returned no user data");
        toast({
          title: "Signup Failed",
          description: "No user was created. Please try again.",
          variant: "destructive",
        });
        throw new Error("Signup failed: No user returned");
      }
      
      console.log("Signup successful");
      
      // For some Supabase projects, email confirmation might be required
      // In that case, data.session might be null and we should show a different message
      if (!data.session) {
        console.log("Email confirmation may be required");
        toast({
          title: "Signup Successful",
          description: "Please check your email to confirm your account before logging in.",
        });
        navigate('/auth');
        return;
      }
      
      // If session is present, user is automatically logged in
      console.log("User automatically logged in after signup");
      
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
      
      toast({
        title: "Account Created",
        description: "Welcome to our app! Please complete your profile to continue.",
      });
      
      navigate('/profile-setup');
      
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("Logging out user");
      setIsLoading(true);
      
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      setUser(null);
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      
      // Force page reload for a clean state
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Failed",
        description: "There was a problem logging you out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { user, login, signup, logout, isLoading, setUser, setIsLoading };
};
