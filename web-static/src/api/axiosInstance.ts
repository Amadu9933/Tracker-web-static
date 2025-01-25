import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://trackerr.live/api/v1/business-owners/signup/',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
});

export default axiosInstance;
