import axios from 'axios';
const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST;

const axiosInstance = axios.create({
  baseURL: `${TRACKERR_HOST}/`, // Use the API root for all endpoints
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
});
export default axiosInstance;
