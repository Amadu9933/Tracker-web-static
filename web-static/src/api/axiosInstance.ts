import axios from 'axios';

const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST;

const axiosInstance = axios.create({
  baseURL: `${TRACKERR_HOST}/`,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
});

let refreshPromise: any = null;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh');

        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // If another request is already refreshing,
        // wait for that refresh instead of starting another one.
        if (!refreshPromise) {
          refreshPromise = axios
            .post(
              `${TRACKERR_HOST}/auth/token/refresh/`,
              { refresh: refreshToken }
            )
            .then((response) => {
              const newAccessToken = response.data.access;
              const newRefreshToken = response.data.refresh;

              localStorage.setItem('access', newAccessToken);

              if (newRefreshToken) {
                localStorage.setItem('refresh', newRefreshToken);
              }

              return newAccessToken;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        const newAccessToken = await refreshPromise;

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);

      } catch (refreshError) {
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