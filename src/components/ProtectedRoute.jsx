import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

export const ProtectedRoute = ({ 
  children, 
  requireAdmin = false, 
  setView 
}) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        setView('login');
      } else if (requireAdmin && !isAdmin) {
        setView('home');
      }
    }
  }, [loading, isAuthenticated, isAdmin, requireAdmin, setView]);

  if (loading) {
    return <LoadingSpinner message="Checking authentication session..." />;
  }

  if (!isAuthenticated || (requireAdmin && !isAdmin)) {
    return null; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;
