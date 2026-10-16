import React, { useEffect, useState } from 'react';
import { CircleHelp, UsersRound } from 'lucide-react';
import { getAffiliateReferrals } from '../../../../api/affiliate';
import type { AffiliateReferral } from '../../../../types/affiliate';
import CountryFlag from '../CountryFlag';
import {
  capitalizeFirstLetter,
  formatJoinedDate,
} from '../nameFormatting';

const AffiliateReferrals: React.FC = () => {
  const [rows, setRows] = useState<AffiliateReferral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const formatBusinessName = (name?: string) =>
    capitalizeFirstLetter(name) || 'Business referral';
  useEffect(() => {
    getAffiliateReferrals()
      .then(setRows)
      .catch((e) =>
        setError(e instanceof Error ? e.message : 'Could not load referrals.')
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-medium text-primary">Your network</p>
        <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Referrals</h2>
        <p className="mt-1 text-sm text-slate-500">
          Track businesses that joined with your affiliate code.
        </p>
      </section>
      <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3.5 text-sm text-blue-900">
        <CircleHelp className="mt-0.5 shrink-0 text-blue-600" size={18} />
        <p>
          Coins are credited when a referred business generates tracking
          numbers. Referral activity and rewards are updated from your account.
        </p>
      </div>
      {error && (
        <p
          className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}
      <section className="overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm shadow-slate-900/[0.03]">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h3 className="font-bold">All referrals</h3>
            <p className="mt-0.5 text-xs text-slate-500">
              {rows.length} {rows.length === 1 ? 'business' : 'businesses'} in
              your network
            </p>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded bg-orange-50 text-primary">
            <UsersRound size={19} />
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead className="bg-slate-50">
              <tr>
                {[
                  'Business name',
                  'Country',
                  'Joined on',
                  'Tracking numbers',
                  'Coins earned',
                  'Status',
                ].map((heading) => (
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
              {rows.map((row) => (
                <tr
                  className="transition-colors hover:bg-slate-50/70"
                  key={row.id}
                >
                  <td className="px-4 py-3.5 text-sm font-semibold">
                    <CountryFlag country={row.country} />
                    {formatBusinessName(row.business_name ?? row.name)}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">
                    {capitalizeFirstLetter(row.country) || '\u2014'}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-500">
                    {formatJoinedDate(row.date_joined, row.created_at)}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">
                    {Number(row.tracking_numbers ?? 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5 text-sm font-semibold">
                    {Number(row.coins_earned ?? 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${['active', 'completed'].includes((row.status ?? 'pending').toLowerCase()) ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}
                    >
                      {row.status ?? 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
              {!rows.length && !loading && !error && (
                <tr>
                  <td
                    className="px-5 py-12 text-center text-sm text-slate-500"
                    colSpan={6}
                  >
                    No referrals yet. Share your code to bring your first
                    business on board.
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td
                    className="px-5 py-12 text-center text-sm text-slate-500"
                    colSpan={6}
                  >
                    Loading referrals...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AffiliateReferrals;
