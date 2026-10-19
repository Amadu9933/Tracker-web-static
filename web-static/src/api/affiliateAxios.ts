import axios from 'axios';

const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST;

const affliateAxiosInstance = axios.create({
  baseURL: `${TRACKERR_HOST}/`,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
});

let refreshPromise: any = null;

affliateAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('affiliate_access');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

affliateAxiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const accessToken = localStorage.getItem('affiliate_access');

        if (!accessToken) {
            localStorage.removeItem('affiliate_access');
            localStorage.removeItem('affiliate_refresh');
            localStorage.removeItem('affiliate_userId');
            window.location.href = '/affiliate/login';
            return;
        }

        // If another request is already refreshing,
        // wait for that refresh instead of starting another one.

        const newAccessToken = accessToken;

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return affliateAxiosInstance(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem('affiliate_access');
        localStorage.removeItem('affiliate_refresh');
        localStorage.removeItem('affiliate_userId');

        window.location.href = '/affiliate/login';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default affliateAxiosInstance;