
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresPremium?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiresPremium = false }) => {
  const { user, isLoading, isProfileComplete } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (!data.session) {
          console.log("Protected route: No active session found");
          setIsAuthenticated(false);
        } else {
          console.log("Protected route: Active session verified");
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
        toast({
          title: "Authentication error",
          description: "There was a problem verifying your session.",
          variant: "destructive",
        });
        setIsAuthenticated(false);
      } finally {
        setIsVerifying(false);
      }
    };
    
    verifyAuth();
  }, [toast]);
  
  if (isLoading || isVerifying) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  
  // If route requires premium and user is not premium, redirect to subscription page
  if (requiresPremium && !user.isPremium) {
    return <Navigate to="/subscription" replace />;
  }
  
  // If profile is not complete and user is trying to access a page other than profile-setup,
  // redirect to the profile setup page
  if (!isProfileComplete && location.pathname !== '/profile-setup') {
    return <Navigate to="/profile-setup" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
