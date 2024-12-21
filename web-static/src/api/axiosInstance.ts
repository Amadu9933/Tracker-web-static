import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://trackerr.live/api/v1/business-owners/signup/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
