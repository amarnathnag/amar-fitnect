
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthContextType } from '@/types/auth';
import { useToast } from "@/hooks/use-toast";

// Simple Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check local storage for auth on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Unified login function - no separate paths for different user types
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Admin login check
      if (email === 'admin@healthapp.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin-user',
          name: 'Admin User',
          email: email,
          isAuthenticated: true,
          isPremium: true, // Admins have full access
          isAdmin: true,
        };
        
        localStorage.setItem('user', JSON.stringify(adminUser));
        setUser(adminUser);
        
        toast({
          title: "Welcome Admin",
          description: "You have successfully logged in as an administrator.",
        });
        
        return { success: true };
      } 
      
      // Regular user login - simplified to single user type
      const regularUser = {
        id: `user-${Date.now()}`, // Generate a unique ID
        name: email.split('@')[0], // Use part of email as name for demo
        email: email,
        isAuthenticated: true,
        isPremium: false, // Default to non-premium
      };
      
      localStorage.setItem('user', JSON.stringify(regularUser));
      setUser(regularUser);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${regularUser.name}!`,
      });
      
      return { success: true };
    } catch (error: any) {
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

  // Signup function - creates a standard user account
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const newUser = {
        id: `user-${Date.now()}`,
        name: name,
        email: email,
        isAuthenticated: true,
        isPremium: false, // All new users start as non-premium
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      toast({
        title: "Signup Successful",
        description: `Welcome, ${name}!`,
      });
      
      return { success: true };
    } catch (error: any) {
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

  // Upgrade user to premium
  const upgradeToPremium = () => {
    if (user) {
      const premiumUser = {
        ...user,
        isPremium: true
      };
      
      localStorage.setItem('user', JSON.stringify(premiumUser));
      setUser(premiumUser);
      
      toast({
        title: "Premium Access Granted",
        description: "You now have access to all premium features!",
      });
      
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logout Successful",
      description: "You have been logged out.",
    });
  };

  // Mock profile data
  const profileData = user ? {
    id: user.id || 'default-id',
    full_name: user.name || null,
    date_of_birth: null,
    gender: null,
    height: null,
    weight: null,
    fitness_goal: null,
    food_preference: null,
    health_issues: null
  } : null;

  // Profile methods
  const isProfileComplete = !!profileData?.full_name;
  const updateProfile = async () => Promise.resolve();
  const fetchProfile = async () => Promise.resolve();

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
      fetchProfile,
      upgradeToPremium // Add the new premium upgrade method
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
