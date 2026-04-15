import { creditCard } from './assets/Assets';
import { getUserProfile } from '../../../../api/users';
import { getWalletBalance, WalletBalance } from '../../../../api/wallet';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CreateWallet = ({onClick}) => {
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
          if (mounted) setProfileError(profileErr?.message ?? 'Failed to load profile');
        }

        try {
          const b = await getWalletBalance();
          if (mounted) setWallet(b);
        } catch (balErr: any) {
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
    return () => { mounted = false; };
  }, []);

  const displayName = () => profile?.first_name || profile?.name || 'User';

  const isWalletNotCreated = Boolean(
    balError && String(balError).toLowerCase().includes('does not have a wallet')
  );

  const formatCurrency = (amount: number, currency?: string) => {
    if (currency === 'GHS') return `₵${amount.toFixed(2)}`;
    try {
      const locale = currency === 'NGN' ? 'en-NG' : 'en-US';
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency || 'USD',
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      return `${currency || ''} ${amount.toFixed(2)}`;
    }
  };

  const getWalletDisplay = () => {
    if (balLoading) return 'Loading your account…';
    if (isWalletNotCreated) return `Hi, ${displayName()} — Your wallet is being set up`;
    if (balError) return `Hi — ${balError}`;
    return (
      <>
        <span className="text-[#8B93AEF0]">Balance: </span>
        <span className="font-bold text-[#2E865F]">
          {wallet ? formatCurrency(wallet.amount, wallet.currency) : '0.00'}
        </span>
      </>
    );
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto my-4 sm:my-8 lg:my-12 rounded-xl bg-cyan-50 dark:bg-[#0b1221] dark:border dark:border-gray-700 shadow-md text-left p-5 sm:p-6 md:p-8"
    >
      <div className="relative pt-2 sm:pt-4">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-base sm:text-lg font-medium pr-0 sm:pr-44 text-gray-900 dark:text-gray-100"
        >
          Reach your delivery goals faster
        </motion.h1>
        {/* Wallet not created notice */}
        {isWalletNotCreated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded text-xs sm:text-sm"
          >
            Your wallet will be set up shortly. Contact support if you need immediate assistance.
          </motion.div>
        )}

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-[#8B93AEF0] dark:text-slate-300 mt-3 mb-6 text-xs sm:text-sm md:text-base leading-relaxed pr-0 sm:pr-44"
        >
          Use your trackerr card to pay for deliveries and receive 10% discount
          on all deliveries made with the trackerr app.
        </motion.p>

        {/* Top up button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={()=> onClick(true)}
          className="border-2 border-primary text-primary px-4 py-2 rounded-md w-full sm:w-auto text-sm sm:text-base"
        >
          <span className="mr-2 text-lg sm:text-xl font-light">+</span>
          <span>Top up wallet</span>
        </motion.button>

        {/* Balance */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-4"
        >
          {getWalletDisplay()}
        </motion.p>

        {/* Credit card image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="hidden sm:block absolute top-40 right-0"
        >
          <img
            src={creditCard}
            alt="Credit card"
            className="h-[85px] sm:h-[95px] w-[150px] sm:w-[175px] rounded-md shadow-sm"
          />
        </motion.div>

      </div>
    </motion.div>
  );
};

export default CreateWallet;