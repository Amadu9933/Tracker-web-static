import React from 'react';
import {
  LayoutDashboard,
  LogOut,
  Settings,
  UsersRound,
  Wallet,
} from 'lucide-react';
import {
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import logo from '../../../../assets/Logo.png';
import {
  getAffiliateAccount,
  isAffiliatePreviewMode,
  logoutAffiliate,
} from '../../../../api/affiliate';
import type { AffiliateAccount } from '../../../../types/affiliate';
import { formatPersonName } from '../nameFormatting';

const navigation = [
  {
    to: '/affiliate/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: '/affiliate/dashboard/referrals',
    label: 'Referrals',
    icon: UsersRound,
  },
  { to: '/affiliate/dashboard/withdraw', label: 'Withdraw', icon: Wallet },
  {
    to: '/affiliate/dashboard/account',
    label: 'Account Settings',
    icon: Settings,
  },
];

const AffiliateLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previewRequested =
    import.meta.env.DEV &&
    new URLSearchParams(location.search).get('preview') === '1';
  const previewMode = isAffiliatePreviewMode();
  const [account, setAccount] = React.useState<AffiliateAccount | null>(null);
  React.useEffect(() => {
    getAffiliateAccount().then(setAccount).catch(() => undefined);
  }, []);
  React.useEffect(() => {
    if (previewRequested) sessionStorage.setItem('affiliate-preview-mode', '1');
  }, [previewRequested]);
  const logout = async () => {
    try {
      await logoutAffiliate();
    } catch {
      // Clear the local session even if the logout endpoint is unavailable.
    } finally {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('userId');
      sessionStorage.removeItem('affiliate-preview-mode');
      navigate('/affiliate/login');
    }
  };
  if (!localStorage.getItem('access') && !previewMode) {
    return <Navigate to="/affiliate/login" replace />;
  }
  const currentPage =
    navigation.find((item) => item.to === location.pathname)?.label ??
    'Dashboard';

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-900 md:grid md:grid-cols-[238px_minmax(0,1fr)]">
      <aside className="flex flex-col bg-[#142c44] px-4 py-5 text-white md:min-h-screen md:px-4 md:py-6">
        <NavLink
          className="mb-6 flex items-center rounded px-3 py-2"
          to="/affiliate/dashboard"
          aria-label="Affiliate dashboard"
        >
          <img
            className="h-8 w-auto brightness-0 invert"
            src={logo}
            alt="TrackerrGo"
          />
        </NavLink>
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
          Affiliate portal
        </p>
        <nav className="grid grid-cols-2 gap-1.5 md:grid-cols-1">
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              end={end}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded px-3 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-primary text-white shadow-sm' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`
              }
            >
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          className="mt-5 flex items-center gap-3 rounded px-3 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white md:mt-auto"
          onClick={logout}
        >
          <LogOut size={18} strokeWidth={1.8} /> Sign out
        </button>
      </aside>

      <div className="min-w-0">
        <header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
          <div>
            <p className="text-xs text-slate-500">TrackerrGo Affiliates</p>
            <h1 className="mt-0.5 text-base font-bold">{currentPage}</h1>
          </div>
          <div className="flex items-center gap-2.5">
            {previewMode && (
              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-700 sm:text-xs">
                Developer preview · sample data
              </span>
            )}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#dbeafe] text-sm font-bold text-[#24518a]">
              {account?.name?.charAt(0).toLocaleUpperCase() ?? 'A'}
            </span>
            <span className="hidden text-sm font-semibold sm:inline">
              {formatPersonName(account?.name) || 'Affiliate Partner'}
            </span>
          </div>
        </header>
        <main className="mx-auto min-w-0 max-w-[1500px] p-4 sm:p-7 lg:p-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AffiliateLayout;
