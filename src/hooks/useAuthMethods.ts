
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

export const useAuthMethods = (
  fetchProfile: () => Promise<void>,
  isProfileComplete: boolean
) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Check if this is admin login
      if (email === 'admin@healthapp.com' && password === 'admin123') {
        console.log("Admin login successful");
        
        // Set admin user
        const adminUser = {
          email: email,
          isAuthenticated: true,
          isPremium: true,
          isAdmin: true,
        };
        
        setUser(adminUser);
        
        // Store admin login state
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminEmail', email);
        
        toast({
          title: "Welcome Admin",
          description: "You have successfully logged in as an administrator.",
        });
        
        // Redirect to admin dashboard
        navigate('/admin');
        return { success: true };
      }
      
      // Regular user login via Supabase
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

      const userIsPremium = data.user?.email?.includes('premium') || false;
      const userName = data.user?.user_metadata?.full_name;

      setUser({
        id: data.user?.id,
        name: userName,
        email: data.user?.email || '',
        isAuthenticated: true,
        isPremium: userIsPremium,
      });

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', data.user?.email || '');
      localStorage.setItem('userName', userName || '');
      localStorage.setItem('isPremium', String(userIsPremium));

      toast({
        title: "Login Successful",
        description: `Welcome back${userName ? `, ${userName}` : ''}!`,
      });

      // Fetch user profile
      await fetchProfile();

      // Navigate based on profile completion
      if (!isProfileComplete) {
        navigate('/profile-setup');
      } else {
        // Navigate to the home page or the page they were trying to access
        navigate('/');
      }

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
        console.error('Signup error:', error.message);
        toast({
          title: "Signup Failed",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
        return { success: false, error: error.message };
      }

      setUser({
        id: data.user?.id,
        name: name,
        email: email,
        isAuthenticated: true,
        isPremium: false,
      });

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', name);
      localStorage.setItem('isPremium', 'false');

      toast({
        title: "Signup Successful",
        description: `Welcome, ${name}!`,
      });

      navigate('/profile-setup');
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

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Check if admin user
      const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
      
      if (isAdminLoggedIn) {
        // Clear admin login
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('adminEmail');
      } else {
        // Regular user logout via Supabase
        await supabase.auth.signOut();
      }
      
      // Clear all auth state
      setUser(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('isPremium');
      
      toast({
        title: "Logout Successful",
        description: "You have been logged out.",
      });
      
      navigate('/');
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

  return {
    user,
    login,
    signup,
    logout,
    isLoading,
    setUser,
    setIsLoading,
  };
};
