
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType, User } from '@/types/auth';
import { useAuthMethods } from '@/hooks/useAuthMethods';
import { useProfileData } from '@/hooks/useProfileData';
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const { profileData, isProfileComplete, fetchProfile, updateProfile } = useProfileData();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const { user, login, signup, logout, isLoading, setUser, setIsLoading } = useAuthMethods(fetchProfile, isProfileComplete);

  // Check if user is authenticated and fetch profile data
  useEffect(() => {
    const initAuth = async () => {
      try {
        // First check local storage for cached auth
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
        }

        // Then verify with Supabase and update if needed
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          const userEmail = data.session.user?.email;
          const userIsPremium = userEmail?.includes('premium') || false;
          
          setUser({
            name: data.session.user?.user_metadata?.full_name,
            email: userEmail || '',
            isAuthenticated: true,
            isPremium: userIsPremium,
          });
          
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', userEmail || '');
          localStorage.setItem('isPremium', String(userIsPremium));

          // Fetch profile after authentication is confirmed
          setTimeout(() => {
            fetchProfile();
          }, 0);
        } else if (isAuthenticated) {
          // If we have local storage but no Supabase session, clean up
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('userName');
          localStorage.removeItem('isPremium');
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        toast({
          title: "Authentication Error",
          description: "There was a problem with your authentication. Please try logging in again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setInitialLoadComplete(true);
      }
    };

    initAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session) {
        const userEmail = session.user?.email;
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
      isLoading: isLoading && !initialLoadComplete, 
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
