import React from 'react';

const PrivacyPolicy: React.FC = () => (
  <div className="mx-auto max-w-6xl px-4 py-14 mt-16  md:px-8">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-8 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
          Privacy Policy
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
          Your privacy matters to us
        </h1>
      </div>

      <div className="space-y-6 px-6 py-8 text-sm leading-7 text-slate-700 md:px-10">
        <p>
          We collect only the information needed to operate our services, improve
          parcel tracking, and support customer communication.
        </p>
        <p>
          This includes account details, shipment information, and contact data
          necessary for delivery updates and support requests.
        </p>
        <p>
          We do not sell personal data. Information is used only for service
          delivery, customer support, security, and service improvement.
        </p>
        <p>
          You can request access to, correction of, or deletion of your personal
          information by contacting our support team.
        </p>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
