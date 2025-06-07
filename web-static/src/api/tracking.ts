import axiosInstance from './axiosInstance';

export const fetchTrackingData = async (url: string, token: string) => {
  const response = await axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return response.data;
};

export const fetchStatusCount = async (token: string) => {
  const response = await axiosInstance.get('trackings/status-count', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return response.data;
};
