// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://trackerr.live/api/v1/', // Shared base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization header if token exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handling (e.g., token expiration)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login on unauthorized error
      localStorage.removeItem('token');
      window.location.href = '/Sign-in';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
