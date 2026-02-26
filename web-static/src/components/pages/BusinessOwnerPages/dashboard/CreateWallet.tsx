import { creditCard } from './assets/Assets';
import { getUserProfile } from '../../../../api/users';
import { getWalletBalance, WalletBalance } from '../../../../api/wallet';
import { useEffect, useState } from 'react';

const CreateWallet = () => {
  const [profile, setProfile] = useState<any>(null);
  const [, setProfileLoading] = useState<boolean>(true);
  const [, setProfileError] = useState<string | null>(null);

  const [wallet, setWallet] = useState<WalletBalance | null>(null);
  const [balLoading, setBalLoading] = useState<boolean>(true);
  const [balError, setBalError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setProfileLoading(true);
        setBalLoading(true);
        setProfileError(null);
        setBalError(null);

        try {
          const p = await getUserProfile();
          if (mounted) setProfile(p);
        } catch (profileErr: any) {
          console.error('Failed to fetch profile:', profileErr);
          if (mounted) setProfileError(profileErr?.message ?? 'Failed to load profile');
        }

        try {
          const b = await getWalletBalance();
          if (mounted) setWallet(b);
        } catch (balErr: any) {
          console.error('Failed to fetch balance:', balErr);
          if (mounted) setBalError(balErr?.message ?? 'Failed to load balance');
        }
      } finally {
        if (mounted) {
          setProfileLoading(false);
          setBalLoading(false);
        }
      }
    };

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const displayName = () => profile?.first_name || profile?.name || 'User';

  const isWalletNotCreated = Boolean(balError && String(balError).toLowerCase().includes('does not have a wallet'));

  const formatCurrency = (amount: number, currency?: string) => {
    if (currency === 'GHS') return `₵${amount.toFixed(2)}`;
    try {
      const locale = currency === 'NGN' ? 'en-NG' : 'en-US';
      return new Intl.NumberFormat(locale, { style: 'currency', currency: currency || 'USD', maximumFractionDigits: 2 }).format(amount);
    } catch (e) {
      return `${currency || ''} ${amount.toFixed(2)}`;
    }
  };

  const getWalletDisplay = () => {
    if (balLoading) return 'Loading your account…';
    if (isWalletNotCreated) return `Hi, ${displayName()} — Your wallet is being set up`;
    if (balError) return `Hi — ${balError}`;
    return (
      <>
        <span className="text-[#8B93AEF0] mt-3 mb-7">Balance :{' '}</span>
        <span className="font-bold text-[#2E865F]">
          {wallet ? formatCurrency(wallet.amount, wallet.currency) : '0.00'}
        </span>
      </>
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto h-full my-4 sm:my-8 lg:my-12 rounded-lg bg-cyan-50 shadow-md text-left p-4 sm:p-6 md:p-8">
      <div className="ml-0 sm:ml-5 pt-6">
        <h1 className="text-lg font-medium">Reach your delivery goals faster</h1>

        {isWalletNotCreated && (
          <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded text-sm">
            Your wallet will be set up shortly. Contact support if you need immediate assistance.
          </div>
        )}

        <p className="text-[#8B93AEF0] mt-3 mb-7 text-sm sm:text-base">
          Use your trackerr card to pay for<br className="hidden sm:block" /> deliveries and receive 10% discount on all<br className="hidden sm:block" /> deliveries made with trackerr app.
        </p>

        <button className="border-2 border-primary text-primary px-4 py-2 rounded-md w-full sm:w-auto">
          <span className="text-lg"><span className="mr-2 text-[24px]">+</span><span className="text-[18px]">Top up wallet</span></span>
        </button>

        <p className="text-sm text-gray-700 mt-4">{getWalletDisplay()}</p>

        <div className="-mt-[95px] hidden sm:block">
          <img src={creditCard} alt="Credit card" className="h-[95.278px] w-[175px] ml-[14rem] rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default CreateWallet;
