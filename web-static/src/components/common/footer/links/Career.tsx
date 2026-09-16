import React from 'react';
import { Link } from 'react-router-dom';

const openRoles = [
  {
    title: 'Kingsley · Backend Engineer',
    type: 'Full-time',
    location: 'Remote · Nigeria',
    description:
      'Design and ship reliable backend systems, APIs, and infrastructure that power parcel tracking and logistics operations.',
  },
  {
    title: 'Kingsley · Product Manager',
    type: 'Full-time',
    location: 'Hybrid · Lagos',
    description:
      'Lead product strategy, roadmap decisions, and customer-focused delivery improvements across the Trackerr platform.',
  },
  {
    title: 'Operations Analyst',
    type: 'Contract',
    location: 'Hybrid · Abuja',
    description:
      'Improve delivery insights, support performance metrics, and help scale operational excellence.',
  },
];

const values = [
  'Customer-first thinking',
  'Ownership and accountability',
  'Simple, practical innovation',
  'Inclusive and collaborative teams',
];

const benefits = [
  'Flexible work arrangements',
  'Health and wellness support',
  'Learning and growth budget',
  'Competitive salary and equity options',
];

const Career: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8f7f5] text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:px-12">
        <div className="overflow-hidden rounded-[32px] bg-[#0f172a] text-white shadow-xl">
          <div className="grid gap-10 px-6 py-10 md:grid-cols-2 md:px-10 lg:px-14 lg:py-14">
            <div className="flex flex-col justify-center">
              <span className="mb-4 inline-flex w-fit rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-orange-300">
                Careers at Trackerr
              </span>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                Build the future of parcel visibility.
              </h1>
              <p className="mt-5 max-w-xl text-base text-slate-300 md:text-lg">
                We are creating a more transparent, reliable, and efficient delivery experience for businesses and customers.
                Join a team solving real logistics challenges with technology that matters.
              </p>

              <div className="mt-8">
                <a
                  href="#open-roles"
                  className="inline-flex rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  View roles
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="grid gap-4">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Mission</p>
                    <p className="mt-2 text-lg font-semibold text-white">Simplify shipping and build trust at every step.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-orange-500/10 p-4">
                      <p className="text-3xl font-bold text-orange-300">6+</p>
                      <p className="mt-2 text-sm text-slate-300">markets supported</p>
                    </div>
                    <div className="rounded-2xl bg-emerald-500/10 p-4">
                      <p className="text-3xl font-bold text-emerald-300">24/7</p>
                      <p className="mt-2 text-sm text-slate-300">customer support</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">
                    From logistics teams to everyday customers, we are building a more connected delivery experience that people can trust.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div id="open-roles">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Open roles</p>
            <div className="space-y-5">
              {openRoles.map((role) => (
                <article key={role.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900">{role.title}</h2>
                      <p className="mt-1 text-sm text-slate-500">{role.location}</p>
                    </div>
                    <span className="inline-flex w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                      {role.type}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{role.description}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Our values</p>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                {values.map((value) => (
                  <li key={value} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Benefits</p>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Career;
