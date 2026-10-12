import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, MailCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  requestAffiliateOtp,
  verifyAffiliateOtp,
} from '../../../../api/affiliate';
import logo from '../../../../assets/Logo.png';

const OTP_LENGTH = 6;

const VerifyOTP: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routeState = location.state as {
    email?: string;
    otpAlreadySent?: boolean;
  } | null;
  const email = routeState?.email ?? '';
  const otpAlreadySent = routeState?.otpAlreadySent ?? false;
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [resending, setResending] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const otp = digits.join('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (digits.some((digit) => !digit)) {
      setError(`Enter the ${OTP_LENGTH}-digit code from your email.`);
      return;
    }
    setError('');
    setBusy(true);
    try {
      await verifyAffiliateOtp(email, otp);
      navigate('/affiliate/dashboard', { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'The code could not be verified.'
      );
    } finally {
      setBusy(false);
    }
  };

  const updateDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    setError('');
    if (digit && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const pasteCode = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const digits = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH);
    if (!digits) return;
    event.preventDefault();
    const next = Array(OTP_LENGTH).fill('');
    digits.split('').forEach((digit, index) => {
      next[index] = digit;
    });
    setDigits(next);
    inputRefs.current[Math.min(digits.length, OTP_LENGTH - 1)]?.focus();
  };

  const resendOtp = async () => {
    if (!email) {
      setError('Return to login and enter your email address first.');
      return;
    }
    setResending(true);
    setError('');
    setResendMessage('');
    try {
      await requestAffiliateOtp(email);
      setResendMessage('A new verification code has been sent.');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to resend the code.'
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#fffaf6] px-5 py-12 text-slate-900">
      <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-orange-100" />
      <div className="relative w-full max-w-[440px] rounded-xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-primary"
          to="/affiliate/login"
        >
          <ArrowLeft size={16} /> Back to login
        </Link>
        <div className="mt-7 flex justify-center">
          <img className="h-10 w-auto" src={logo} alt="TrackerrGo" />
        </div>
        <div className="mx-auto mt-8 grid h-14 w-14 place-items-center rounded-full bg-orange-50 text-primary">
          <MailCheck size={27} />
        </div>
        <h1 className="mt-5 text-center text-2xl font-bold">
          Verify your email
        </h1>
        <p className="mt-2 text-center text-sm leading-6 text-slate-500">
          {otpAlreadySent
            ? 'A code is already active. Check your email for the latest 6-digit code sent to'
            : 'We’ve sent a 6-digit code to'}
          <br />
          <strong className="font-semibold text-slate-800">
            {email || 'your email address'}
          </strong>
        </p>

        <form className="mt-7" onSubmit={submit}>
          <div className="flex justify-center gap-2.5 sm:gap-3">
            {Array.from({ length: OTP_LENGTH }, (_, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                className="h-12 w-10 rounded border border-slate-300 text-center text-lg font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 sm:h-14 sm:w-12"
                aria-label={`Code digit ${index + 1}`}
                inputMode="numeric"
                autoComplete={index === 0 ? 'one-time-code' : 'off'}
                value={digits[index]}
                onChange={(event) => updateDigit(index, event.target.value)}
                onPaste={pasteCode}
                onKeyDown={(event) => {
                  if (
                    event.key === 'Backspace' &&
                    !digits[index] &&
                    index > 0
                  ) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
              />
            ))}
          </div>
          {error && (
            <p className="mt-4 text-center text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          {resendMessage && (
            <p
              className="mt-4 text-center text-sm text-emerald-700"
              role="status"
            >
              {resendMessage}
            </p>
          )}
          <p className="mt-5 text-center text-xs text-slate-500">
            Didn’t receive the code?{' '}
            <button
              className="font-semibold text-primary hover:underline disabled:opacity-60"
              type="button"
              onClick={resendOtp}
              disabled={resending || busy}
            >
              {resending ? 'Sending...' : 'Resend code'}
            </button>
          </p>
          <button
            className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={busy || digits.some((digit) => !digit)}
          >
            {busy ? (
              'Verifying...'
            ) : (
              <>
                Verify &amp; login <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default VerifyOTP;
