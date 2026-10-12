import axiosInstance from './axiosInstance';
import type {
  AffiliateAccount,
  AffiliateDashboardSummary,
  AffiliateReferral,
  AffiliateWithdrawal,
} from '../types/affiliate';

const API = '/affiliate/';
const PREVIEW_KEY = 'affiliate-preview-mode';

export const isAffiliatePreviewMode = (): boolean =>
  import.meta.env.DEV &&
  (new URLSearchParams(window.location.search).get('preview') === '1' ||
    sessionStorage.getItem(PREVIEW_KEY) === '1');

const previewAccount: AffiliateAccount = {
  id: 'preview-affiliate',
  name: 'Amadu Hamza',
  email: 'amadu@example.com',
  referral_code: 'HAM123',
  payout_bank: 'Ghana Commercial Bank',
  payout_account: '0123456789',
};

const previewReferrals: AffiliateReferral[] = [
  {
    id: 1,
    business_name: 'TechWorld Phones',
    email: 'hello@techworld.example',
    country: 'Ghana',
    status: 'Active',
    created_at: '2026-09-10',
    tracking_numbers: 214,
    coins_earned: 2140,
  },
  {
    id: 2,
    business_name: 'Bright Traders',
    email: 'info@brighttraders.example',
    country: 'Nigeria',
    status: 'Active',
    created_at: '2026-09-08',
    tracking_numbers: 186,
    coins_earned: 1488,
  },
  {
    id: 3,
    business_name: 'Smart Gadgets',
    email: 'sales@smartgadgets.example',
    country: 'Kenya',
    status: 'Active',
    created_at: '2026-09-05',
    tracking_numbers: 157,
    coins_earned: 1413,
  },
  {
    id: 4,
    business_name: 'Kwaku Electronics',
    email: 'kwaku@example.com',
    country: 'Ghana',
    status: 'Active',
    created_at: '2026-09-03',
    tracking_numbers: 143,
    coins_earned: 1430,
  },
  {
    id: 5,
    business_name: 'SwiftMart',
    email: 'team@swiftmart.example',
    country: 'Rwanda',
    status: 'Active',
    created_at: '2026-08-28',
    tracking_numbers: 135,
    coins_earned: 945,
  },
  {
    id: 6,
    business_name: 'Crown Stores',
    email: 'orders@crownstores.example',
    country: 'Nigeria',
    status: 'Active',
    created_at: '2026-08-24',
    tracking_numbers: 128,
    coins_earned: 1024,
  },
  {
    id: 7,
    business_name: 'Prime Retail',
    email: 'hello@primeretail.example',
    country: 'Ghana',
    status: 'Active',
    created_at: '2026-08-20',
    tracking_numbers: 151,
    coins_earned: 1510,
  },
  {
    id: 8,
    business_name: 'Nova Tech',
    email: 'contact@novatech.example',
    country: 'Kenya',
    status: 'Active',
    created_at: '2026-08-16',
    tracking_numbers: 134,
    coins_earned: 1206,
  },
];

const previewWithdrawals: AffiliateWithdrawal[] = [
  { id: 'W-1001', coins: 2500, status: 'Completed', created_at: '2026-09-01' },
  { id: 'W-1002', coins: 1500, status: 'Completed', created_at: '2026-08-12' },
  { id: 'W-1003', coins: 1000, status: 'Completed', created_at: '2026-07-20' },
];

export const requestAffiliateOtp = async (email: string): Promise<void> => {
  await axiosInstance.post(`${API}auth/login/`, { email });
};

export const verifyAffiliateOtp = async (
  email: string,
  otp: string
): Promise<{
  access: string;
  refresh?: string;
  affiliate?: AffiliateAccount;
}> => {
  const { data } = await axiosInstance.post(`${API}auth/verify-otp/`, {
    email,
    otp,
  });
  if (data.access) localStorage.setItem('access', data.access);
  if (data.refresh) localStorage.setItem('refresh', data.refresh);
  if (data.affiliate?.id)
    localStorage.setItem('userId', String(data.affiliate.id));
  return data;
};

export const getAffiliateAccount = async (): Promise<AffiliateAccount> =>
  isAffiliatePreviewMode()
    ? previewAccount
    : (await axiosInstance.get(`${API}account/`)).data;

export const updateAffiliateAccount = async (
  updates: Partial<AffiliateAccount>
): Promise<AffiliateAccount> =>
  isAffiliatePreviewMode()
    ? { ...previewAccount, ...updates }
    : (await axiosInstance.patch(`${API}account/`, updates)).data;

export const getAffiliateSummary =
  async (): Promise<AffiliateDashboardSummary> =>
    isAffiliatePreviewMode()
      ? {
          total_referrals: 8,
          total_tracking_numbers: 1248,
          total_coins_earned: 11156,
          total_coins_withdrawn: 5000,
          available_coins: 6156,
        }
      : (await axiosInstance.get(`${API}dashboard/`)).data;

export const getAffiliateReferrals = async (): Promise<AffiliateReferral[]> => {
  if (isAffiliatePreviewMode()) return previewReferrals;
  const { data } = await axiosInstance.get(`${API}referrals/`);
  return Array.isArray(data) ? data : (data.results ?? data.referrals ?? []);
};

export const requestAffiliateWithdrawal = async (
  coins: number
): Promise<AffiliateWithdrawal> => {
  if (isAffiliatePreviewMode()) {
    return {
      id: `W-${Date.now()}`,
      coins,
      status: 'Pending',
      created_at: new Date().toISOString(),
    };
  }
  const { data } = await axiosInstance.post(`${API}withdrawals/`, { coins });
  return { ...data, coins: Number(data.coins ?? data.amount ?? coins) };
};

export const getAffiliateWithdrawals = async (): Promise<
  AffiliateWithdrawal[]
> => {
  if (isAffiliatePreviewMode()) return previewWithdrawals;
  const { data } = await axiosInstance.get(`${API}withdrawals/`);
  const withdrawals = Array.isArray(data)
    ? data
    : (data.results ?? data.withdrawals ?? []);
  return withdrawals.map(
    (withdrawal: AffiliateWithdrawal & { amount?: number }) => ({
      ...withdrawal,
      coins: Number(withdrawal.coins ?? withdrawal.amount ?? 0),
    })
  );
};
