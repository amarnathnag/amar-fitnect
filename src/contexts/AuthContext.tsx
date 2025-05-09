
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

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Admin login check
      if (email === 'admin@healthapp.com' && password === 'admin123') {
        const adminUser = {
          email: email,
          isAuthenticated: true,
          isPremium: true,
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
      
      // Regular user login - hardcoded for demo
      if (email === 'user@example.com' && password === 'password123') {
        const regularUser = {
          id: 'user-123',
          name: 'Regular User',
          email: email,
          isAuthenticated: true,
          isPremium: email.includes('premium'),
        };
        
        localStorage.setItem('user', JSON.stringify(regularUser));
        setUser(regularUser);
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${regularUser.name}!`,
        });
        
        return { success: true };
      }
      
      // Premium user login - hardcoded for demo
      if (email === 'premium@example.com' && password === 'premium123') {
        const premiumUser = {
          id: 'user-456',
          name: 'Premium User',
          email: email,
          isAuthenticated: true,
          isPremium: true,
        };
        
        localStorage.setItem('user', JSON.stringify(premiumUser));
        setUser(premiumUser);
        
        toast({
          title: "Premium Login Successful",
          description: `Welcome back, ${premiumUser.name}!`,
        });
        
        return { success: true };
      }
      
      // Invalid credentials
      throw new Error('Invalid email or password');
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

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would verify the email doesn't exist already
      
      const newUser = {
        id: `user-${Date.now()}`,
        name: name,
        email: email,
        isAuthenticated: true,
        isPremium: email.includes('premium'),
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

  // Placeholder for profile methods
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
