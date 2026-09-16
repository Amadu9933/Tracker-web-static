import React from 'react';

const refundHighlights = [
  'Trackerr does not accept liability for parcel loss, delay, damage, or theft during transit or delivery.',
  'Responsibility for parcel handling, dispatch, and final delivery remains with the logistics owner and their riders.',
  'All deposits and prepaid amounts are non-refundable once payment has been made and service has been initiated.',
  'Refund requests are only reviewed for platform-level payment errors or service issues directly caused by Trackerr.',
];

const Refund: React.FC = () => (
  <div className="mx-auto max-w-5xl px-4 py-16 text-slate-800 md:px-8">
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-slate-200">
      <div className="bg-gradient-to-r from-orange-50 to-white px-6 py-8 md:px-10 md:py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
          Refund Policy
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
          No refund for parcel-related issues
        </h1>
      </div>

      <div className="space-y-6 px-6 py-8 text-sm leading-7 text-slate-700 md:px-10">
        <p>
          Trackerr provides a tracking and logistics visibility platform. We are not
          liable for the safety, loss, delay, or damage of any parcel during transit
          or delivery. Responsibility for parcel handling, dispatch, and final
          delivery remains with the logistics owner and their riders.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {refundHighlights.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                ✓
              </div>
              <p>{item}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Important note</h2>
          <p className="mt-2">
            Deposits made on Trackerr are strictly non-withdrawable and non-refundable.
            Any refund review is limited to platform errors or incorrect charges
            caused directly by Trackerr and not by rider or logistics operations.
          </p>
        </div>

        <p>
          If a payment was charged incorrectly by Trackerr itself, customers may
          contact support with the relevant transaction details for review. Issues
          caused by parcel movement, rider behavior, or third-party logistics
          operations are not eligible for refund.
        </p>
      </div>
    </div>
  </div>
);

export default Refund;
