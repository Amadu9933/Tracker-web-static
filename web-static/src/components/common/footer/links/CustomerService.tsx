import React from 'react';

const CustomerService: React.FC = () => (
  <div className="mx-auto max-w-6xl px-4 py-14 mt-16  md:px-8">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-8 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
          Customer service
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
          Support that moves with you
        </h1>
      </div>

      <div className="space-y-6 px-6 py-8 text-sm leading-7 text-slate-700 md:px-10">
        <p>
          Our customer service team is available to help with delivery questions,
          shipment status issues, and service inquiries.
        </p>
        <p>
          We aim to respond quickly, resolve concerns clearly, and keep your
          experience simple, transparent, and stress-free from start to finish.
        </p>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Need direct support?</h2>
          <a
            href="mailto:support@trackerr.africa"
            className="mt-2 inline-block text-orange-600 underline underline-offset-4"
          >
            support@trackerr.africa
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default CustomerService;
