import React from 'react';

const Feedback: React.FC = () => (
  <div className="mx-auto max-w-6xl px-4 py-14 mt-16  md:px-8">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-8 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
          Feedback
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
          We value your feedback
        </h1>
      </div>

      <div className="space-y-6 px-6 py-8 text-sm leading-7 text-slate-700 md:px-10">
        <p>
          Your experience helps us improve every part of the shipping process,
          from booking to final delivery.
        </p>
        <p>
          Share your thoughts on the app, support experience, delivery process, or
          any feature you would like to see improved.
        </p>
        <p>
          We review all feedback to improve performance, reliability, and customer
          experience.
        </p>
      </div>
    </div>
  </div>
);

export default Feedback;
