import axiosInstance from './axiosInstance';

export const fetchTrackingData = async (url: string) => {
  const cacheKey = `trackingData:${url}`;
  // Try to get cached data first
  const cached = localStorage.getItem(cacheKey);
  if (!navigator.onLine && cached) {
    // If offline and cached data exists, return it
    return JSON.parse(cached);
  }
  try {
    const response = await axiosInstance.get(url, {
      headers: {
        Accept: 'application/json',
      },
    });
    // Cache the data
    localStorage.setItem(cacheKey, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    // If request fails and cached data exists, return cached
    if (cached) return JSON.parse(cached);
    throw error;
  }
};

export const fetchStatusCount = async () => {
  const cacheKey = `statusCount`;
  const cached = localStorage.getItem(cacheKey);
  if (!navigator.onLine && cached) {
    return JSON.parse(cached);
  }
  try {
    const response = await axiosInstance.get('trackings/status-count', {
      headers: {
        Accept: 'application/json',
      },
    });
    localStorage.setItem(cacheKey, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    if (cached) return JSON.parse(cached);
    throw error;
  }
};
