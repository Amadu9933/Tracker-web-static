import React from 'react';

const legalPoints = [
  'We operate within required local and international logistics regulations.',
  'All user data is handled in compliance with applicable privacy and consumer laws.',
  'Our platform is designed to support secure, transparent, and fair parcel management.',
];

const Legal: React.FC = () => (
  <div className="mx-auto max-w-6xl px-4 py-14 mt-16  md:px-8">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-8 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
          Legal information you can trust
        </h1>
      </div>

      <div className="space-y-6 px-6 py-8 text-sm leading-7 text-slate-700 md:px-10">
        <p>
          TrackerrGo is committed to operating with transparency and accountability.
          We maintain clear business policies, protect customer rights, and uphold
          the standards expected in modern digital logistics.
        </p>

        <div className="space-y-4">
          {legalPoints.map((point) => (
            <div key={point} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
              <p>{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Legal;
