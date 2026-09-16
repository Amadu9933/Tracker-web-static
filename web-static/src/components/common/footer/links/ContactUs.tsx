import React from 'react';

const ContactUs: React.FC = () => (
  <div className="mx-auto max-w-6xl px-4 py-14 md:px-8">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-8 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
          Contact us
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
          We are here to help
        </h1>
      </div>

      <div className="grid gap-5 px-6 py-8 md:grid-cols-2 md:px-10">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Email</h2>
          <a
            href="mailto:support@trackerr.africa"
            className="mt-3 block text-base text-orange-600 underline-offset-4 hover:underline"
          >
            support@trackerr.africa
          </a>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Phone</h2>
          <p className="mt-3 text-base text-slate-700">+234 800 000 0000</p>
        </div>
      </div>
    </div>
  </div>
);

export default ContactUs;
