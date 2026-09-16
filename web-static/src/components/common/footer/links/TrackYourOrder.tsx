import React from 'react';

const TrackYourOrder: React.FC = () => (
  <div className="mx-auto max-w-6xl px-4 py-14 md:px-8">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-8 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
          Track your order
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
          Follow every step of your shipment
        </h1>
      </div>

      <div className="space-y-6 px-6 py-8 text-sm leading-7 text-slate-700 md:px-10">
        <p>
          Enter your tracking number to view the current shipment status, recent
          movement, and expected delivery updates.
        </p>
        <p>
          Our tracking system updates as parcels move through sorting, transit,
          and delivery stages so you can stay informed at every step.
        </p>
        <p>
          If your parcel is delayed or requires attention, our support team can
          help you with the next steps.
        </p>
      </div>
    </div>
  </div>
);

export default TrackYourOrder;
