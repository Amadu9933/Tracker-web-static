import axiosInstance from './axiosInstance';
import type {
  AffiliateAccount,
  AffiliateDashboardSummary,
  AffiliateReferral,
  AffiliateWithdrawal,
} from '../types/affiliate';

const API = '/affiliate/';
const PREVIEW_KEY = 'affiliate-preview-mode';

const getApiMessage = (error: unknown, fallback: string): string => {
  const data = (error as { response?: { data?: Record<string, unknown> } })
    ?.response?.data;
  const message = data?.msg ?? data?.detail ?? data?.error;
  if (typeof message === 'string') return message;
  if (message && typeof message === 'object') {
    const nested = (message as { error?: unknown }).error;
    if (nested && typeof nested === 'object') {
      const firstError = Object.values(nested as Record<string, unknown>)[0];
      if (Array.isArray(firstError) && typeof firstError[0] === 'string') {
        return firstError[0];
      }
    }
  }
  return error instanceof Error ? error.message : fallback;
};

const normalizeAffiliateAccount = (data: any): AffiliateAccount => {
  const affiliate =
    data?.msg?.affiliate ?? data?.msg ?? data?.affiliate ?? data ?? {};
  const bankDetails = affiliate.bank_details ?? {};
  return {
    id: affiliate.id ?? affiliate.email,
    name: affiliate.full_name ?? affiliate.name ?? '',
    email: affiliate.email ?? '',
    referral_code: affiliate.referral_code ?? '',
    payout_bank:
      bankDetails.bank_name ?? affiliate.bank_name ?? affiliate.payout_bank ?? '',
    payout_account:
      bankDetails.account_number ??
      affiliate.account_number ??
      affiliate.payout_account ??
      '',
    total_coins_withdrawn: Number(affiliate.total_coins_withdrawn ?? 0),
    is_active: affiliate.is_active ?? false,
  };
};

const normalizeReferral = (
  referral: any,
  index: number
): AffiliateReferral => ({
  id: referral.id ?? `${referral.business_name ?? 'referral'}-${index}`,
  business_name: referral.business_name ?? 'Business referral',
  country: referral.country,
  status: referral.status,
  date_joined: referral.date_joined ?? referral.created_at,
  tracking_numbers: Number(referral.tracking_numbers ?? 0),
  coins_earned: Number(referral.total_earned ?? referral.coins_earned ?? 0),
});

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
    date_joined: '2026-09-10',
    tracking_numbers: 214,
    coins_earned: 2140,
  },
  {
    id: 2,
    business_name: 'Bright Traders',
    email: 'info@brighttraders.example',
    country: 'Nigeria',
    status: 'Active',
    date_joined: '2026-09-08',
    tracking_numbers: 186,
    coins_earned: 1488,
  },
  {
    id: 3,
    business_name: 'Smart Gadgets',
    email: 'sales@smartgadgets.example',
    country: 'Kenya',
    status: 'Active',
    date_joined: '2026-09-05',
    tracking_numbers: 157,
    coins_earned: 1413,
  },
  {
    id: 4,
    business_name: 'Kwaku Electronics',
    email: 'kwaku@example.com',
    country: 'Ghana',
    status: 'Active',
    date_joined: '2026-09-03',
    tracking_numbers: 143,
    coins_earned: 1430,
  },
  {
    id: 5,
    business_name: 'SwiftMart',
    email: 'team@swiftmart.example',
    country: 'Rwanda',
    status: 'Active',
    date_joined: '2026-08-28',
    tracking_numbers: 135,
    coins_earned: 945,
  },
  {
    id: 6,
    business_name: 'Crown Stores',
    email: 'orders@crownstores.example',
    country: 'Nigeria',
    status: 'Active',
    date_joined: '2026-08-24',
    tracking_numbers: 128,
    coins_earned: 1024,
  },
  {
    id: 7,
    business_name: 'Prime Retail',
    email: 'hello@primeretail.example',
    country: 'Ghana',
    status: 'Active',
    date_joined: '2026-08-20',
    tracking_numbers: 151,
    coins_earned: 1510,
  },
  {
    id: 8,
    business_name: 'Nova Tech',
    email: 'contact@novatech.example',
    country: 'Kenya',
    status: 'Active',
    date_joined: '2026-08-16',
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
  try {
    await axiosInstance.post(`${API}request-otp/`, { email });
  } catch (error) {
    throw new Error(
      getApiMessage(error, 'Unable to send the verification code.')
    );
  }
};

export const createAffiliate = async (
  email: string,
  fullName: string
): Promise<void> => {
  try {
    await axiosInstance.post(`${API}create/`, {
      email,
      full_name: fullName,
    });
  } catch (error) {
    throw new Error(
      getApiMessage(error, 'Unable to create your affiliate account.')
    );
  }
};

export const verifyAffiliateOtp = async (
  email: string,
  otp: string
): Promise<{
  access: string;
  refresh?: string;
  affiliate?: AffiliateAccount;
}> => {
  try {
    const { data } = await axiosInstance.post(`${API}authenticate/`, {
      email,
      otp,
    });
    const access = data.access ?? data.token;
    if (!access)
      throw new Error('The API response did not include an access token.');
    localStorage.setItem('access', access);
    if (data.refresh) localStorage.setItem('refresh', data.refresh);
    return { ...data, access };
  } catch (error) {
    throw new Error(
      getApiMessage(error, 'The verification code could not be verified.')
    );
  }
};

export const getAffiliateAccount = async (): Promise<AffiliateAccount> =>
  isAffiliatePreviewMode()
    ? previewAccount
    : normalizeAffiliateAccount((await axiosInstance.get(`${API}user/`)).data);

export const saveAffiliateBankAccount = async (
  bankName: string,
  accountNumber: string
): Promise<AffiliateAccount> => {
  if (isAffiliatePreviewMode()) {
    return {
      ...previewAccount,
      payout_bank: bankName,
      payout_account: accountNumber,
    };
  }

  try {
    const account = await getAffiliateAccount();
    const { data } = await axiosInstance.post(`${API}bank-account/`, {
      bank_name: bankName,
      account_number: accountNumber,
    });
    const saved = data?.msg ?? data;
    return {
      ...account,
      payout_bank: saved.bank_name ?? bankName,
      payout_account: saved.account_number ?? accountNumber,
    };
  } catch (error) {
    throw new Error(getApiMessage(error, 'Unable to save bank details.'));
  }
};

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
      : (async () => {
          const [referralsResponse, account] = await Promise.all([
            axiosInstance.get(`${API}referrals/`),
            getAffiliateAccount(),
          ]);
          const totals =
            referralsResponse.data?.msg ?? referralsResponse.data ?? {};
          return {
            total_referrals: Number(totals.total_businesses ?? 0),
            total_tracking_numbers: Number(totals.total_tracking_numbers ?? 0),
            total_coins_earned: Number(totals.total_coins_earned ?? 0),
            total_coins_withdrawn: Number(account.total_coins_withdrawn ?? 0),
            available_coins: Number(totals.available_coins ?? 0),
            pending_withdrawal: Boolean(totals.pending_withdrawal),
          };
        })();

export const getAffiliateReferrals = async (): Promise<AffiliateReferral[]> => {
  if (isAffiliatePreviewMode()) return previewReferrals;
  const { data } = await axiosInstance.get(`${API}referrals/`);
  const referrals =
    data?.msg?.referrals ?? data?.referrals ?? data?.results ?? data;
  return Array.isArray(referrals) ? referrals.map(normalizeReferral) : [];
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
  void coins;
  throw new Error(
    'Withdrawal requests are not available in the documented affiliate API yet.'
  );
};

export const getAffiliateWithdrawals = async (): Promise<
  AffiliateWithdrawal[]
> => {
  return isAffiliatePreviewMode() ? previewWithdrawals : [];
};

export const logoutAffiliate = async (): Promise<void> => {
  if (isAffiliatePreviewMode()) return;
  await axiosInstance.post(`${API}logout/`);
};
