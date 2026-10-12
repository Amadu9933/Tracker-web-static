export interface AffiliateAccount {
  id?: number | string;
  name: string;
  email: string;
  phone?: string;
  referral_code: string;
  payout_account?: string;
  payout_bank?: string;
  total_coins_withdrawn?: number;
  is_active?: boolean;
}

export interface AffiliateDashboardSummary {
  total_referrals: number;
  total_tracking_numbers?: number;
  available_coins?: number;
  total_coins_earned?: number;
  total_coins_withdrawn?: number;
  pending_withdrawal?: boolean;
  recent_referrals?: AffiliateReferral[];
}

export interface AffiliateReferral {
  id: number | string;
  name?: string;
  business_name?: string;
  email?: string;
  country?: string;
  status?: string;
  date_joined?: string;
  created_at?: string;
  tracking_numbers?: number;
  coins_earned?: number;
}

export interface AffiliateWithdrawal {
  id: number | string;
  coins: number;
  status: string;
  created_at?: string;
}
