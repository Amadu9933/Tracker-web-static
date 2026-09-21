import React from 'react';

const Career: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8f7f5] px-4 py-16 text-slate-900 md:px-8">
      <section className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center">
        <div className="w-full rounded-[28px] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm md:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            Careers at Trackerr
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            No open roles at the moment
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
            We do not have any available positions right now. Please check back later for future opportunities.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Career;
