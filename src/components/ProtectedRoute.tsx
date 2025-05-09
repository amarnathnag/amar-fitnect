
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresPremium?: boolean;
  requiresAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresPremium = false,
  requiresAdmin = false
}) => {
  const { user, isLoading, isProfileComplete } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log("ProtectedRoute: Verifying authentication...");
        
        // Check for admin login first
        const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
        if (isAdminLoggedIn) {
          console.log("ProtectedRoute: Admin is logged in");
          setIsAuthenticated(true);
          setIsVerifying(false);
          return;
        }
        
        // Regular user authentication with Supabase
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("ProtectedRoute: Error verifying session:", error);
          setIsAuthenticated(false);
        } else if (!data.session) {
          console.log("ProtectedRoute: No active session found");
          setIsAuthenticated(false);
        } else {
          console.log("ProtectedRoute: Active session verified");
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
  }, [toast, location.pathname]);
  
  // Show loading state while authentication is being verified
  if (isLoading || isVerifying) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Check for admin requirement
  if (requiresAdmin) {
    if (!user?.isAdmin) {
      console.log("ProtectedRoute: Admin privileges required but user is not an admin");
      return <Navigate to="/auth" replace state={{ from: location }} />;
    }
    // If user is admin, render the protected content immediately
    return <>{children}</>;
  }

  // Regular user authentication checks
  if (!isAuthenticated || !user) {
    console.log("ProtectedRoute: User not authenticated, redirecting to auth page");
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  
  // Redirect to subscription page if premium is required but user is not premium
  if (requiresPremium && !user.isPremium) {
    console.log("ProtectedRoute: Premium required but user is not premium, redirecting to subscription page");
    return <Navigate to="/subscription" replace />;
  }
  
  // Redirect to profile setup if profile is not complete
  if (!isProfileComplete && location.pathname !== '/profile-setup') {
    console.log("ProtectedRoute: Profile not complete, redirecting to profile setup page");
    return <Navigate to="/profile-setup" replace />;
  }

  // If all checks pass, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
