import axios from 'axios';
const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST;

const axiosInstance = axios.create({
  baseURL: `${TRACKERR_HOST}/`, // Use the API root for all endpoints
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
});

// ✅ Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response interceptor to handle 401 errors and token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;


      try {
        const refreshToken = localStorage.getItem('refresh');
        if (!refreshToken) {
          // No refresh token, redirect to login
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          localStorage.removeItem('userId');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Try to refresh the token
        const response = await axios.post(
          `${TRACKERR_HOST}/auth/token/refresh/`,
          { refresh: refreshToken }
        );

        const newAccessToken = response.data.access;
        localStorage.setItem('access', newAccessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('userId');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
