
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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
  
  // Show loading state while authentication is being verified
  if (isLoading) {
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
  if (!user) {
    console.log("ProtectedRoute: User not authenticated, redirecting to auth page");
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  
  // For premium routes, allow access if user is authenticated (for demo purposes)
  // In production, you would check actual premium status from database
  if (requiresPremium && !user.isPremium && !user.isAuthenticated) {
    console.log("ProtectedRoute: Premium required, redirecting to premium page");
    return <Navigate to="/premium-ai" replace />;
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
