// src/api/api.ts
import axiosInstance from './axiosInstance';

// Sign-up API
export const signUp = async (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  businessName: string;
  service: string;
  address: string;
}) => {
  const response = await axiosInstance.post('/signup', data);
  return response.data;
};

// Sign-in API
export const signIn = async (email: string, password: string) => {
  const response = await axiosInstance.post('/Sign-in', { email, password });
  return response.data; // Expecting a token in the response
};

// Fetch user profile
export const getUserProfile = async () => {
  const response = await axiosInstance.get('/user-profile');
  return response.data; // Expecting user details (name, avatar, etc.)
};
