import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowDownToLine,
  CheckCircle2,
  Clock3,
  Coins,
} from 'lucide-react';
import {
  getAffiliateSummary,
  getAffiliateWithdrawals,
  isAffiliatePreviewMode,
  requestAffiliateWithdrawal,
} from '../../../../api/affiliate';
import type { AffiliateWithdrawal } from '../../../../types/affiliate';

const MINIMUM_WITHDRAWAL_COINS = 5000;

const AffiliateWithdraw: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [availableCoins, setAvailableCoins] = useState<number | null>(null);
  const [pendingWithdrawal, setPendingWithdrawal] = useState(false);
  const previewMode = isAffiliatePreviewMode();
  const [history, setHistory] = useState<AffiliateWithdrawal[]>([]);

  useEffect(() => {
    getAffiliateSummary()
      .then((summary) => {
        setAvailableCoins(Number(summary.available_coins ?? 0));
        setPendingWithdrawal(Boolean(summary.pending_withdrawal));
      })
      .catch((e) =>
        setError(
          e instanceof Error ? e.message : 'Could not load coin balance.'
        )
      );
    getAffiliateWithdrawals()
      .then(setHistory)
      .catch(() => undefined);
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      setError('Enter a valid coin amount greater than zero.');
      return;
    }
    if (availableCoins === null || availableCoins < MINIMUM_WITHDRAWAL_COINS) {
      setError(
        'Withdrawals are available once your balance reaches 5,000 coins.'
      );
      return;
    }
    if (value > availableCoins) {
      setError('The requested amount exceeds your available coin balance.');
      return;
    }
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const result = await requestAffiliateWithdrawal(value);
      setMessage(
        `Withdrawal request ${result.id} submitted (${result.status}).`
      );
      setHistory((current) => [result, ...current]);
      setAmount('');
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Unable to request withdrawal.'
      );
    } finally {
      setBusy(false);
    }
  };

  const canWithdraw =
    availableCoins !== null && availableCoins >= MINIMUM_WITHDRAWAL_COINS;
  const canSubmitRequest = previewMode && canWithdraw && !pendingWithdrawal;
  const statusStyle = (status: string) => {
    const normalized = status.toLowerCase();
    if (
      normalized === 'completed' ||
      normalized === 'approved' ||
      normalized === 'paid'
    )
      return 'bg-emerald-50 text-emerald-700';
    if (normalized === 'rejected' || normalized === 'failed')
      return 'bg-red-50 text-red-700';
    return 'bg-amber-50 text-amber-700';
  };

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-medium text-primary">Your rewards</p>
        <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
          Withdraw earnings
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Cash out your coins when your balance is ready.
        </p>
      </section>

      {!canWithdraw && availableCoins !== null && (
        <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 px-4 py-4 text-orange-900">
          <AlertCircle className="mt-0.5 shrink-0 text-primary" size={19} />
          <div>
            <p className="text-sm font-bold">
              Minimum withdrawal balance is 5,000 coins.
            </p>
            <p className="mt-1 text-sm text-orange-800">
              You need{' '}
              {(MINIMUM_WITHDRAWAL_COINS - availableCoins).toLocaleString()}{' '}
              more coins to unlock withdrawals.
            </p>
          </div>
        </div>
      )}

      {canWithdraw && pendingWithdrawal && !previewMode && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          The API reports a withdrawal request is already pending.
        </div>
      )}

      {canWithdraw && !previewMode && !pendingWithdrawal && (
        <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          Your balance meets the minimum. Withdrawal submission and history
          endpoints are not currently documented, so this page cannot submit a
          real request yet.
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
        <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm shadow-slate-900/[0.03] sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold">Available coins</h3>
              <p className="mt-1 text-sm text-slate-500">
                Your current withdrawable balance
              </p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-orange-50 text-primary">
              <Coins size={21} />
            </span>
          </div>
          <p className="mt-5 text-4xl font-extrabold tracking-tight">
            {availableCoins === null ? '—' : availableCoins.toLocaleString()}
            <span className="ml-2 text-base font-semibold text-slate-500">
              coins
            </span>
          </p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${Math.min(((availableCoins ?? 0) / MINIMUM_WITHDRAWAL_COINS) * 100, 100)}%`,
              }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {canWithdraw
              ? 'You have reached the minimum balance.'
              : `Minimum: ${MINIMUM_WITHDRAWAL_COINS.toLocaleString()} coins`}
          </p>
          {previewMode && (
            <form
              className="mt-6 border-t border-slate-100 pt-5"
              onSubmit={submit}
            >
              <label
                className="grid gap-2 text-sm font-semibold"
                htmlFor="withdraw-amount"
              >
                Coins to withdraw
              </label>
              <div className="mt-2 flex items-center rounded border border-slate-300 px-3.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <Coins size={17} className="text-amber-500" />
                <input
                  id="withdraw-amount"
                  className="min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm outline-none"
                  type="number"
                  min="1"
                  max={availableCoins ?? undefined}
                  step="1"
                  placeholder="Enter coin amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  disabled={!canSubmitRequest || busy}
                />
              </div>
              {message && (
                <p
                  className="mt-3 flex items-center gap-2 text-sm text-emerald-700"
                  role="status"
                >
                  <CheckCircle2 size={17} />
                  {message}
                </p>
              )}
              {error && (
                <p className="mt-3 text-sm text-red-700" role="alert">
                  {error}
                </p>
              )}
              <button
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 sm:w-auto"
                disabled={busy || !canSubmitRequest}
              >
                <ArrowDownToLine size={17} />
                {busy ? 'Submitting...' : 'Request withdrawal'}
              </button>
            </form>
          )}
        </section>

        <section className="overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm shadow-slate-900/[0.03]">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h3 className="font-bold">Withdrawal history</h3>
              <p className="mt-0.5 text-xs text-slate-500">
                {previewMode
                  ? 'Sample withdrawal records'
                  : 'Not available in the documented API'}
              </p>
            </div>
            <Clock3 size={18} className="text-slate-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-left">
              <thead className="bg-slate-50">
                <tr>
                  {['Date', 'Coins withdrawn', 'Status'].map((heading) => (
                    <th
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
                      key={heading}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3.5 text-sm text-slate-500">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : '—'}
                    </td>
                    <td className="px-4 py-3.5 text-sm font-semibold">
                      {Number(item.coins ?? 0).toLocaleString()} coins
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {!history.length && (
                  <tr>
                    <td
                      className="px-4 py-10 text-center text-sm text-slate-500"
                      colSpan={3}
                    >
                      {previewMode
                        ? 'No sample withdrawal requests.'
                        : 'Withdrawal history is not provided by the current API.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AffiliateWithdraw;
