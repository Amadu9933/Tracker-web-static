import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Coins,
  HeartHandshake,
  Share2,
  Store,
  Truck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/Logo.png';

const benefits = [
  {
    icon: Coins,
    title: 'Lifetime earnings',
    description: 'Keep earning as your referrals grow with TrackerrGo.',
  },
  {
    icon: Share2,
    title: 'No limits',
    description: 'Share with as many businesses as you know.',
  },
  {
    icon: HeartHandshake,
    title: 'Easy and simple',
    description: 'Share your code and let your referrals get started.',
  },
];

const AffiliateLandingPage: React.FC = () => (
  <main className="min-h-screen overflow-hidden bg-[#fffaf6] text-slate-900">
    <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
      <Link to="/affiliate" aria-label="TrackerrGo affiliate home">
        <img className="h-9 w-auto" src={logo} alt="TrackerrGo" />
      </Link>
      <nav className="flex items-center gap-3 sm:gap-6">
        <a
          className="hidden text-sm font-medium text-slate-600 hover:text-primary sm:inline"
          href="#how-it-works"
        >
          How it works
        </a>
        <a
          className="hidden text-sm font-medium text-slate-600 hover:text-primary sm:inline"
          href="#benefits"
        >
          Benefits
        </a>
        <Link
          className="rounded px-3 py-2 text-sm font-semibold text-slate-700 hover:text-primary"
          to="/affiliate/login"
        >
          Login
        </Link>
        <Link
          className="rounded bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
          to="/affiliate/signup"
        >
          Sign up
        </Link>
      </nav>
    </header>

    <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 md:min-h-[570px] md:grid-cols-[1fr_0.9fr] md:pb-24 md:pt-16">
      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3.5 py-1.5 text-xs font-bold text-orange-700">
          <BadgeCheck size={15} /> AFFILIATE PROGRAMME
        </span>
        <h1 className="mt-5 max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          Refer businesses.
          <br />
          <span className="text-primary">Earn coins.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          Share your unique referral code and earn coins whenever a business you
          refer generates a tracking number.
        </p>
        <div id="benefits" className="mt-7 grid gap-4 sm:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div className="flex gap-2.5" key={title}>
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-100 text-primary">
                <Icon size={16} />
              </span>
              <div>
                <h2 className="text-xs font-bold sm:text-sm">{title}</h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="inline-flex items-center gap-2 rounded bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-orange-900/10 transition hover:brightness-95"
            to="/affiliate/signup"
          >
            Get started <ArrowRight size={17} />
          </Link>
          <Link
            className="rounded border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-primary hover:text-primary"
            to="/affiliate/login"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="relative mx-auto flex h-[340px] w-full max-w-[500px] items-center justify-center sm:h-[410px]">
        <div className="absolute h-64 w-64 rounded-full bg-orange-200/60 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute bottom-10 right-5 h-36 w-44 rounded-t-2xl border-2 border-orange-200 bg-white shadow-xl sm:right-2 sm:h-44 sm:w-52">
          <div className="flex h-8 items-center justify-center gap-2 rounded-t-xl bg-orange-100">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="h-1.5 w-14 rounded bg-orange-300" />
          </div>
          <div className="grid h-[calc(100%_-_2rem)] place-items-center text-center">
            <Store className="text-primary" size={42} />
            <span className="mt-2 text-xs font-bold text-slate-700">
              YOUR NETWORK
            </span>
          </div>
        </div>
        <div className="relative z-10 flex h-[290px] w-[164px] -rotate-6 flex-col rounded-[2rem] border-[7px] border-slate-900 bg-slate-900 p-1.5 shadow-2xl sm:h-[340px] sm:w-[190px]">
          <div className="flex flex-1 flex-col items-center rounded-[1.45rem] bg-white px-3 pt-9 text-center sm:pt-11">
            <img src={logo} alt="TrackerrGo" className="mb-8 h-5 w-auto" />
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-orange-50 text-primary">
              <Truck size={34} />
            </div>
            <p className="mt-5 text-sm font-bold">
              Tracking number
              <br />
              generated
            </p>
            <BadgeCheck className="mt-3 text-emerald-500" size={26} />
          </div>
          <span className="mx-auto my-1 h-1 w-10 rounded-full bg-white/80" />
        </div>
        <span className="absolute left-2 top-14 grid h-12 w-12 rotate-12 place-items-center rounded-full bg-primary text-white shadow-lg sm:left-6 sm:top-16 sm:h-14 sm:w-14">
          <Coins size={29} />
        </span>
        <span className="absolute right-8 top-7 grid h-10 w-10 -rotate-12 place-items-center rounded-full bg-amber-400 text-amber-950 shadow-lg sm:right-12 sm:top-5 sm:h-12 sm:w-12">
          <Coins size={24} />
        </span>
        <span className="absolute bottom-7 left-12 grid h-10 w-10 rotate-6 place-items-center rounded-full bg-orange-500 text-white shadow-lg sm:bottom-8 sm:left-16">
          <Coins size={22} />
        </span>
      </div>
    </section>

    <section
      id="how-it-works"
      className="bg-slate-900 px-5 py-7 text-white sm:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-[1fr_1fr_1fr] sm:items-center sm:gap-8">
        <div>
          <p className="text-xl font-bold">Join. Share. Earn.</p>
          <p className="mt-1 text-sm text-slate-300">
            Turn your network into income.
          </p>
        </div>
        {[
          ['1', 'Create account', 'Get your unique referral code.'],
          ['2', 'Share code', 'Invite businesses to join.'],
          ['3', 'Earn coins', 'Earn when they generate tracking numbers.'],
        ].map(([number, title, detail]) => (
          <div className="flex items-center gap-3" key={number}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-primary/60 bg-primary/10 font-bold text-primary">
              {number}
            </span>
            <div>
              <h3 className="text-sm font-bold">{title}</h3>
              <p className="text-xs text-slate-300">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </main>
);

export default AffiliateLandingPage;
