// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  // Mock authentication logic, replace with your actual logic
  const isAuthenticated = localStorage.getItem('token') !== null;
  return isAuthenticated;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
