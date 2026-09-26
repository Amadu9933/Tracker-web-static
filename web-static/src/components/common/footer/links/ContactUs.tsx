import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const ContactUs: React.FC = () => (
  <div className="mx-auto max-w-6xl px-4 py-14 mt-16 md:px-8">
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
            href="mailto:support@trackerrgo.com"
            className="mt-3 block text-base text-orange-600 underline-offset-4 hover:underline"
          >
            support@trackerrgo.com
          </a>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Phone / WhatsApp</h2>
          <a
            href="tel:+2349015880751"
            className="mt-3 block text-base text-orange-600 underline-offset-4 hover:underline"
          >
            +234 90 1588 0751
          </a>
          <a
            href="https://wa.me/2349015880751"
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center gap-2 text-base text-green-600 underline-offset-4 hover:underline"
          >
            <FaWhatsapp aria-hidden="true" />
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default ContactUs;
