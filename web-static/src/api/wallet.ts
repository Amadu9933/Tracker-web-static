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

  const resp = await fetch(`${TRACKERR_HOST}/business-owner/balance/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const contentType = resp.headers.get('content-type') ?? '';
  const responseText = await resp.text();

  if (!resp.ok) {
    console.error(`Wallet API Error (${resp.status}):`, responseText);
    if (contentType.includes('application/json')) {
      try {
        const err = JSON.parse(responseText);
        // Extract error message - check multiple possible fields
        const errorMsg =
          err?.error ??
          err?.detail ??
          err?.message ??
          'Failed to fetch wallet balance';
        throw new Error(errorMsg);
      } catch (e: any) {
        // If parsing fails, throw the raw message
        throw new Error(e?.message ?? 'Failed to fetch wallet balance');
      }
    }
    throw new Error(`HTTP ${resp.status}: Failed to fetch wallet balance`);
  }

  if (!contentType.includes('application/json')) {
    throw new Error('Invalid response from server (expected JSON)');
  }

  const data = JSON.parse(responseText);

  // Try to map common response shapes to our WalletBalance interface.
  // Adjust mapping if your API returns different keys or minor units (kobo/pesewa).
  const amount = Number(data.amount ?? data.balance ?? data.data?.amount ?? 0);
  const currency = (data.currency ??
    data.currency_code ??
    data.data?.currency ??
    'GHS') as string;

  return { amount, currency };
};
