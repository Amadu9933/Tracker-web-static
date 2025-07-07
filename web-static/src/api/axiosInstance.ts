import axios from 'axios';

const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST; // Use environment variable for base URL

const axiosInstance = axios.create({
  baseURL: TRACKERR_HOST, // Use environment variable for base URL
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
});

export default axiosInstance;
