import axiosInstance from "./axiosInstance";

const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST;

export interface WalletBalance {
  amount: number; // amount in main currency units (e.g. 100.50 for GHS)
  currency: string; // e.g. 'GHS' or 'NGN'
}

/**
 * Fetch the business owner wallet balance.
 * Endpoint used in curl: https://trackerr.updates247.ng/api/v1/business-owner/balance/
 * Ensure Authorization: Bearer <token> is provided (token from localStorage 'access').
 */
export const getWalletBalance = async (): Promise<WalletBalance> => {
  const token = localStorage.getItem('access');
  if (!token) throw new Error('Unauthorized: missing access token');

  const resp = await axiosInstance.get(`${TRACKERR_HOST}/business-owner/balance/`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

 
  const data = resp.data;

  // Try to map common response shapes to our WalletBalance interface.
  // Adjust mapping if your API returns different keys or minor units (kobo/pesewa).
  const amount = Number(data.amount ?? data.balance ?? data.data?.amount ?? 0);
  const currency = (data.currency ??
    data.currency_code ??
    data.data?.currency ??
    'GHS') as string;

  return { amount, currency };
};
