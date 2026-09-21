import React from 'react';

const steps = [
  {
    number: '1',
    title: 'Create a shipment',
    description:
      'Add your parcel details, destination, and expected delivery time in just a few steps.',
  },
  {
    number: '2',
    title: 'Track in real time',
    description:
      'Stay updated as your parcel moves through dispatch, transit, and delivery checkpoints.',
  },
  {
    number: '3',
    title: 'Receive with confidence',
    description:
      'Know exactly when your delivery is on the way and resolve issues quickly when needed.',
  },
];

const HowItWorks: React.FC = () => (
  <div className="mx-auto max-w-6xl px-4 py-14 mt-16  md:px-8">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-8 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
          How it works
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
          Ship smarter, track better, stay informed.
        </h1>
      </div>

      <div className="grid gap-5 px-6 py-8 md:grid-cols-3 md:px-10">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-base font-bold text-white">
              {step.number}
            </div>
            <h2 className="text-xl font-semibold text-slate-900">{step.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HowItWorks;
