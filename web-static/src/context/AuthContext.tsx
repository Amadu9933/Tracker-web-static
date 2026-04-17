// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

// type User = {
//   name: string;
//   avatarUrl: string;
//   email: string;
//   country?: string;
// };

// 1. Define the internal user details
type UserDetails = {
  id: number;
  name: string;
  email: string;
  country: string;
  address: string;
  avatar: string;
  account_type: string;
  is_active: boolean;
  // ... add other fields as needed
};

// 2. Define the main object (The Business/Profile object)
type BusinessProfile = {
  id: number;
  business_name: string;
  service: string;
  subscription_type: string;
  user: UserDetails; // This is the 'user' property you were trying to access!
};

type AuthContextType = {
  user: BusinessProfile | null;
  setUser: React.Dispatch<React.SetStateAction<BusinessProfile | null>>;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  email: string
  setTrackingHistoryEmail: (value: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<BusinessProfile | null>(null);
  const [email, setEmail] = useState<string | ''>('')
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  const setTrackingHistoryEmail = (value: string) => {
    setEmail(value)

  }
  // Fetch user data after token is set
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get('/user-profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          logout(); // Clear invalid token
        }
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      // Send login request
      const response = await axiosInstance.post('/login', { email, password });
      const { token } = response.data; // Assume backend returns a token

      // Save token to localStorage and state
      localStorage.setItem('token', token);
      setToken(token);

      // Fetch and store user data
      const userResponse = await axiosInstance.get('/user-profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userResponse.data);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout, email, setTrackingHistoryEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
