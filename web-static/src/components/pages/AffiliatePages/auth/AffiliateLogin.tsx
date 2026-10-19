import React, { useEffect, useState } from 'react';
import { ArrowLeft, Mail, UserRound } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  createAffiliate,
  requestAffiliateOtp,
} from '../../../../api/affiliate';
import logo from '../../../../assets/Logo.png';

const capitalizeErrorMessage = (message: string): string => {
  const trimmed = message.trim();
  return trimmed
    ? `${trimmed.charAt(0).toLocaleUpperCase()}${trimmed.slice(1)}`
    : message;
};

const AffiliateLogin: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = location.pathname.endsWith('/signup');
  const routeState = location.state as {
    email?: string;
    registrationSuccess?: boolean;
  } | null;
  const registrationSuccess =
    !isSignup && Boolean(routeState?.registrationSuccess);
  const [email, setEmail] = useState(routeState?.email ?? '');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (registrationSuccess) setEmail(routeState?.email ?? '');
  }, [location.key, registrationSuccess, routeState?.email]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const normalizedEmail = email.trim();
      if (isSignup) {
        await createAffiliate(normalizedEmail, fullName.trim());
        navigate('/affiliate/login', {
          replace: true,
          state: { email: normalizedEmail, registrationSuccess: true },
        });
        return;
      }
      const is_logged_in = await requestAffiliateOtp(normalizedEmail);

      if (is_logged_in) return

      navigate('/affiliate/verify-otp', {
        state: { email: normalizedEmail },
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to send verification code.';
      if (!isSignup && /otp.*already.*sent|already.*sent.*otp/i.test(message)) {
        navigate('/affiliate/verify-otp', {
          state: { email: email.trim(), otpAlreadySent: true },
        });
        return;
      }
      setError(capitalizeErrorMessage(message));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#fffaf6] px-5 py-12 text-slate-900">
      <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-orange-100" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-orange-50" />
      <section className="relative w-full max-w-[440px] rounded-xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-primary"
          to="/affiliate"
        >
          <ArrowLeft size={16} /> Affiliate programme
        </Link>
        <div className="mt-7 flex justify-center">
          <img className="h-10 w-auto" src={logo} alt="TrackerrGo" />
        </div>
        <div className="mt-8 grid grid-cols-2 border-b border-slate-200">
          <Link
            className={`border-b-2 pb-3 text-center text-sm font-semibold ${!isSignup ? 'border-primary text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            to="/affiliate/login"
          >
            Login
          </Link>
          <Link
            className={`border-b-2 pb-3 text-center text-sm font-semibold ${isSignup ? 'border-primary text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            to="/affiliate/signup"
          >
            Sign up
          </Link>
        </div>
        <h1 className="mt-7 text-center text-2xl font-bold">
          {isSignup ? 'Become an affiliate' : 'Welcome back'}
        </h1>
        <p className="mt-2 text-center text-sm leading-6 text-slate-500">
          {isSignup
            ? 'Create your affiliate account to start earning rewards.'
            : 'Enter your email address to receive a secure one-time login code.'}
        </p>

        {registrationSuccess && (
          <p
            className="mt-5 rounded border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm text-emerald-800"
            role="status"
          >
            Registration successful. Click Login to continue.
          </p>
        )}

        <form className="mt-7" onSubmit={submit}>
          {isSignup && (
            <>
              <label
                className="mb-2 block text-sm font-semibold"
                htmlFor="affiliate-full-name"
              >
                Full name
              </label>
              <div className="mb-5 flex items-center gap-3 rounded border border-slate-300 px-3.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <UserRound size={18} className="shrink-0 text-slate-400" />
                <input
                  id="affiliate-full-name"
                  className="min-w-0 flex-1 border-0 bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400"
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
            </>
          )}
          <label
            className="mb-2 block text-sm font-semibold"
            htmlFor="affiliate-email"
          >
            Email address
          </label>
          <div className="flex items-center gap-3 rounded border border-slate-300 px-3.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
            <Mail size={18} className="shrink-0 text-slate-400" />
            <input
              id="affiliate-email"
              className="min-w-0 flex-1 border-0 bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          {error && (
            <p className="mt-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <button
            className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:cursor-wait disabled:opacity-60"
            disabled={busy}
          >
            {busy
              ? isSignup
                ? 'Registering...'
                : 'Sending code...'
              : isSignup
                ? 'Sign up'
                : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          {isSignup ? 'Already have an account?' : 'Don’t have an account?'}{' '}
          <Link
            className="font-semibold text-primary hover:underline"
            to={isSignup ? '/affiliate/login' : '/affiliate/signup'}
          >
            {isSignup ? 'Login' : 'Sign up'}
          </Link>
        </p>
        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
          By continuing, you agree to the TrackerrGo affiliate programme terms.
        </p>
      </section>
    </main>
  );
};

export default AffiliateLogin;
