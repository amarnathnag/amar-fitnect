
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
    const isPremium = localStorage.getItem('isPremium') === 'true';

    if (isAuthenticated && email) {
      setUser({
        name: name || undefined,
        email,
        isAuthenticated: true,
        isPremium,
      });
      
      // Fetch profile data if user is authenticated
      setTimeout(() => {
        fetchProfile();
      }, 0);
    }

    setIsLoading(false);
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const userEmail = session.user?.email;
        // This is a demo premium check - in a real app you'd check subscription status
        const userIsPremium = userEmail?.includes('premium') || false;
        
        setUser({
          name: session.user?.user_metadata?.full_name,
          email: userEmail || '',
          isAuthenticated: true,
          isPremium: userIsPremium,
        });
        
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', userEmail || '');
        localStorage.setItem('isPremium', String(userIsPremium));
        
        // Defer profile fetch to next tick to avoid auth state deadlocks
        setTimeout(() => {
          fetchProfile();
        }, 0);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('isPremium');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
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
