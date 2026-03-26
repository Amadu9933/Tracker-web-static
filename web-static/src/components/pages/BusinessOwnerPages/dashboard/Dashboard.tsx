import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Avatar, IconButton, CircularProgress as MuiCircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ThemeToggle from '@components/common/ThemeToggle';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../../../api/users';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { logoutUser } from '../../../../api/auth';
import Logo from '../../../../assets/Logo.png';
import CircularProgress from '../../customerPages/CustomerTrackingDetails/CustomerNotification/CircularProgress';
import { useTheme } from '../../../../context/ThemeContext';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  const handleLogout = async () => {
    if (loggingOut) return; // prevent double-click
    setLoggingOut(true);
    try {
      await logoutUser(); // clears all user cache + tokens, then redirects
    } catch {
      // logoutUser handles its own errors; reset state in case redirect didn't fire
      setLoggingOut(false);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        console.log('Fetched User Data:', userProfile);
        setUser(userProfile);
      } catch (err) {
        setError('Unable to load your profile details. Please refresh the page or try logging in again.');
        console.error('Error fetching user details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="flex relative">
      {/* Backdrop for mobile when sidebar is open */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-10 sm:hidden" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'} transform transition-transform duration-200 ease-in-out
        fixed sm:relative inset-y-0 left-0 w-56 sm:w-[220px] bg-gray-200 dark:bg-[#111827] text-secondary dark:text-gray-200 pl-[28px] flex flex-col justify-between z-20`}>
        <nav className="flex flex-col">
          <h2>
            <img className="h-7 my-[32px] w-20" src={Logo} alt="logo" onClick={() => navigate('/')} />
          </h2>
          <ul className="flex-grow">
            {/* Dashboard Link */}
            <li
              onClick={() => { navigate('/dashboard/home'); if (sidebarOpen) setSidebarOpen(false); }}
              className={`flex w-40 p-2 text-[14px] rounded-[8px] cursor-pointer mb-[32px] items-center gap-2
                ${location.pathname === '/dashboard/home'
                  ? 'bg-orange-500 text-white dark:bg-orange-600'
                  : 'bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-800'}`}
            >
              <GridViewIcon />
              <span className="ml-1">Dashboard</span>
            </li>

            {/* Report Link */}
            <li
              onClick={() => { navigate('/dashboard/reports'); if (sidebarOpen) setSidebarOpen(false); }}
              className={`flex w-40 p-2 text-[14px] rounded-[8px] cursor-pointer mb-[32px] items-center gap-2
                ${location.pathname === '/dashboard/reports'
                  ? 'bg-orange-500 text-white dark:bg-orange-600'
                  : 'bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-800'}`}
            >
              <WatchLaterOutlinedIcon />
              <span className="ml-1">Report</span>
            </li>

            {/* Logistics Link */}
            <li
              onClick={() => { navigate('/dashboard/logistics'); if (sidebarOpen) setSidebarOpen(false); }}
              className={`flex w-40 p-2 text-[14px] rounded-[8px] cursor-pointer mb-[32px] items-center gap-2
                ${location.pathname === '/dashboard/logistics'
                  ? 'bg-orange-500 text-white dark:bg-orange-600'
                  : 'bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-800'}`}
            >
              <LocalShippingOutlinedIcon />
              <span className="ml-1">Logistics</span>
            </li>
          </ul>
        </nav>

        {/* User Actions */}
        <div>
          <ul>
            {/* Profile */}
            <li
              onClick={() => { navigate('/dashboard/user-profile'); if (sidebarOpen) setSidebarOpen(false); }}
              className={`flex w-40 p-2 text-[14px] rounded-[8px] cursor-pointer mb-[32px] items-center gap-2
                ${location.pathname === '/dashboard/user-profile'
                  ? 'bg-orange-500 text-white dark:bg-orange-600'
                  : 'bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-800'}`}
            >
              <Avatar src={`${user?.user?.avatar}?v=${Date.now()}` || undefined} sx={{ height: 20, width: 20 }} />
              <span className="ml-1">Profile</span>
            </li>

            {/* Logout */}
            <li
              onClick={handleLogout}
              aria-disabled={loggingOut}
              className={`flex w-40 p-2 text-[14px] rounded-[8px] mb-[32px] items-center gap-2
                bg-transparent text-gray-900 dark:text-gray-100
                ${loggingOut
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:bg-gray-300 dark:hover:bg-slate-800'}`}
            >
              {loggingOut
                ? <MuiCircularProgress size={20} thickness={5} sx={{ color: 'inherit' }} />
                : <LogoutOutlinedIcon sx={{ height: 20, width: 20 }} />
              }
              <span className="ml-1">{loggingOut ? 'Logging out...' : 'Logout'}</span>
            </li>
          </ul>
        </div>
      </aside>

      {/* Hamburger for mobile */}
      <div className="sm:hidden absolute top-4 left-4 z-30">
        <IconButton onClick={toggleSidebar}>
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>

      <button
        className="bg-gray-300 h-[24px]"
        onClick={() => navigate(-1)}
      >
        <ChevronLeftOutlinedIcon />
      </button>

      {/* Main Content */}
      <main className="flex-1 flex flex-col -ml-6 sm:px-6 pt-5 max-w-screen-xl mx-auto">
        {/* App Bar */}
        <div className="border-b border-[#D9D9D9] dark:border-[#2f3a4a] bg-white dark:bg-[#0b111f] mx-4">
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{
              backgroundColor: isDarkMode ? '#0b111f' : 'white',
            }}
          >
            <Toolbar className="flex justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/dashboard/GenerateTrackingID')}
                  className={`flex items-center gap-1.5 w-[130px] md:w-fit px-3 sm:px-4 ml-8 sm:ml-5 py-1.5 sm:py-2 leading-5 font-medium text-[12px] sm:text-[14px] rounded-[6px] cursor-pointer transition-all duration-200
    ${location.pathname === '/dashboard/GenerateTrackingID'
                      ? 'bg-[#E3E2DC] dark:bg-gradient-to-r dark:from-gray-500 dark:to-gray-700 dark:shadow-[0_0_14px_rgba(249,115,22,0.45)] dark:ring-1 dark:ring-orange-400/50 text-[#ABABAB] dark:text-white dark:font-semibold'
                      : 'bg-primary dark:bg-[#1e2738] dark:border dark:border-orange-500/40 dark:hover:border-orange-400 dark:hover:bg-[#252d3d] text-white dark:text-orange-100 sm:-ml-5'}`}
                >
                  <span className="sm:hidden text-base leading-none">＋</span>
                  <span className="hidden sm:inline">Generate Tracking ID</span>
                  <span className="sm:hidden">Track ID</span>
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div><ThemeToggle /></div>
                <IconButton>
                  <NotificationsNoneOutlinedIcon
                    sx={{ color: isDarkMode ? '#94a3b8' : 'inherit' }}
                  />
                </IconButton>
                <div className="flex items-center space-x-2">
                  <Avatar
                    src={`${user?.user?.avatar}?v=${Date.now()}` || undefined}
                    sx={{ height: 20, width: 20 }}
                  />
                  <span className="text-gray-700 dark:text-gray-200 font-semibold hidden sm:inline">
                    {loading ? 'Loading...' : error ? 'Error' : `Welcome, ${user?.user?.name || 'User'}`}
                  </span>
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </div>

        {/* Dynamic Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;