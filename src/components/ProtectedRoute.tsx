
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresPremium?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiresPremium = false }) => {
  const { user, isLoading, isProfileComplete } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user || !user.isAuthenticated) {
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
