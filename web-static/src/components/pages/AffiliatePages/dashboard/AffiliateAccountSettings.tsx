import React, { useEffect, useState } from 'react';
import { Building2, CheckCircle2, LockKeyhole, UserRound } from 'lucide-react';
import {
  getAffiliateAccount,
  saveAffiliateBankAccount,
} from '../../../../api/affiliate';
import type { AffiliateAccount } from '../../../../types/affiliate';
import { formatPersonName } from '../nameFormatting';

const AffiliateAccountSettings: React.FC = () => {
  const [account, setAccount] = useState<AffiliateAccount | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [bankDetailsSubmitted, setBankDetailsSubmitted] = useState(false);
  useEffect(() => {
    getAffiliateAccount()
      .then(setAccount)
      .catch((e) =>
        setError(e instanceof Error ? e.message : 'Could not load account.')
      );
  }, []);
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!account) return;
    setError('');
    setMessage('');
    setBusy(true);
    try {
      setAccount(
        await saveAffiliateBankAccount(
          account.payout_bank ?? '',
          account.payout_account ?? ''
        )
      );
      setMessage('Your bank details were submitted successfully.');
      setBankDetailsSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to save settings.');
    } finally {
      setBusy(false);
    }
  };
  const inputClass =
    'w-full rounded border border-slate-300 bg-white px-3.5 py-3 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15 read-only:bg-slate-50';

  if (!account) {
    return (
      <div className="space-y-5">
        <section>
          <p className="text-sm font-medium text-primary">Your profile</p>
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
            Account settings
          </h2>
        </section>
        {error ? (
          <p
            className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        ) : (
          <p className="text-sm text-slate-500">Loading account...</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-medium text-primary">Your profile</p>
        <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
          Account settings
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Submit your bank details for affiliate payouts.
        </p>
      </section>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <form
          className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm shadow-slate-900/[0.03] sm:p-7"
          onSubmit={save}
        >
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
            <span className="grid h-10 w-10 place-items-center rounded bg-orange-50 text-primary">
              <Building2 size={19} />
            </span>
            <div>
              <h3 className="font-bold">Bank details</h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Used for affiliate withdrawals.
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2 text-sm font-semibold">
              <span>Full name</span>
              <p className="flex min-h-[46px] items-center text-sm font-normal text-slate-700">
                {formatPersonName(account.name) || '—'}
              </p>
            </div>
            <div className="grid gap-2 text-sm font-semibold">
              <span>Email address</span>
              <p className="flex min-h-[46px] items-center break-all text-sm font-normal text-slate-700">
                {account.email || '—'}
              </p>
            </div>
            <label className="grid gap-2 text-sm font-semibold">
              Bank name
              <input
                className={inputClass}
                placeholder="Enter your bank name"
                value={account.payout_bank ?? ''}
                disabled={bankDetailsSubmitted}
                onChange={(e) =>
                  setAccount({ ...account, payout_bank: e.target.value })
                }
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Account number
              <input
                className={inputClass}
                type="text"
                autoComplete="off"
                placeholder="Enter account number"
                value={account.payout_account ?? ''}
                disabled={bankDetailsSubmitted}
                onChange={(e) =>
                  setAccount({ ...account, payout_account: e.target.value })
                }
                required
              />
            </label>
          </div>
          {message && (
            <p
              className="mt-5 flex items-center gap-2 text-sm text-emerald-700"
              role="status"
            >
              <CheckCircle2 size={17} />
              {message}
            </p>
          )}
          {error && (
            <p className="mt-5 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <button
            className="mt-6 inline-flex items-center justify-center rounded bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-wait disabled:opacity-60"
            disabled={busy || bankDetailsSubmitted}
          >
            {busy
              ? 'Submitting...'
              : bankDetailsSubmitted
                ? 'Bank details submitted'
                : 'Submit bank details'}
          </button>
        </form>

        <aside className="space-y-4">
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-blue-600">
              <LockKeyhole size={19} />
            </span>
            <h3 className="mt-3 font-bold text-slate-800">
              Your details are secure
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your bank details are kept private and used only to process your
              withdrawals.
            </p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-white p-5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600">
              <UserRound size={19} />
            </span>
            <h3 className="mt-3 font-bold">Affiliate account</h3>
            <p className="mt-1 text-sm text-slate-500">Referral code</p>
            <p className="mt-1 font-mono text-lg font-bold text-primary">
              {account.referral_code || 'Not assigned'}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AffiliateAccountSettings;
