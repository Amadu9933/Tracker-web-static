import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://trackerr.live/api/v1/', // Use the API root for all endpoints
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
});

export default axiosInstance;
