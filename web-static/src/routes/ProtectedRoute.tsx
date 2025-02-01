// src/routes/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const token = localStorage.getItem('access'); // Fixed key
  return !!token; // Return true if the token exists (authenticated)
};

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
};

export default ProtectedRoute;
