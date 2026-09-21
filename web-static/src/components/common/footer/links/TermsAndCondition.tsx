import React from 'react';

const TermsAndCondition: React.FC = () => (
  <div className="mx-auto max-w-6xl px-4 py-14 mt-16  md:px-8">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-8 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
          Legal agreement
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
          Terms & Conditions
        </h1>
      </div>

      <div className="space-y-6 px-6 py-8 text-sm leading-7 text-slate-700 md:px-10">
        <p>
          Trackerr is a real-time parcel tracking platform designed to provide
          visibility for business owners managing their logistics operations.
        </p>

        <p>
          Business owners onboard and manage their own riders. Trackerr does not
          employ, compensate, or supervise riders, as they are independently
          owned and managed by their respective vendors.
        </p>

        <p>
          Trackerr is not liable for the safety, loss, delay, or damage of any
          parcel during transit or delivery. Responsibility for parcel handling,
          dispatch, and final delivery remains with the logistics owner and their
          riders.
        </p>

        <p>
          Deposits made on Trackerr are strictly non-withdrawable and non-refundable,
          unless otherwise stated in a written agreement or as required by law.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">Privacy Policy</h2>
          <p>
            Trackerr respects your privacy and only collects information necessary
            to provide and improve its services. Your data is not shared with
            third parties without consent, except where required by law or
            necessary for the operation of approved service features.
          </p>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">
            Acceptance of Terms
          </h2>
          <p>
            By continuing to use Trackerr, you confirm that you have read,
            understood, and agree to these terms and conditions.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default TermsAndCondition;
