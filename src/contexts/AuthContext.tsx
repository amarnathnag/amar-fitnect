
import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType } from '@/types/auth';
import { useAuthMethods } from '@/hooks/useAuthMethods';
import { useProfileData } from '@/hooks/useProfileData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profileData, isProfileComplete, fetchProfile, updateProfile } = useProfileData();
  const { user, login, signup, logout, isLoading, setUser, setIsLoading } = useAuthMethods(fetchProfile, isProfileComplete);

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
