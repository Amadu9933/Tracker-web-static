
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Avatar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../../../api/users';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { logoutUser } from '../../../../api/auth';
import Logo from '../../../../assets/Logo.png';
import CircularProgress from '../../customerPages/CustomerTrackingDetails/CustomerNotification/CircularProgress';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        console.log('Fetched User Data:', userProfile); // Debugging log
        console.log(userProfile);
        setUser(userProfile);
      } catch (err) {
        setError('Failed to fetch user details.');
        console.error('Error fetching user details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Show loading screen while fetching user data
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="flex relative">
      {/* backdrop for mobile when sidebar is open */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-10 sm:hidden" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'} transform transition-transform duration-200 ease-in-out
        fixed sm:relative inset-y-0 left-0 w-56 sm:w-[220px] bg-gray-200 text-secondary pl-[28px] flex flex-col justify-between z-20`}>
        <nav className="flex flex-col">
          <h2 >
            <img className="h-7 my-[32px] w-20" src={Logo} alt="logo" onClick={() => navigate('/')} />
          </h2>
          <ul className="flex-grow">
            {/* Dashboard Link */}
            <li
              onClick={() => { navigate('/dashboard/home'); if (sidebarOpen) setSidebarOpen(false); }}
              className={`flex w-40  p-2 text-[14px] rounded-[8px] cursor-pointer mb-[32px] 
                ${location.pathname === '/dashboard/home' ? 'bg-primary text-white' : 'hover:bg-gray-300'}`}
            >
              <GridViewIcon />
              <button className="ml-1">Dashboard</button>
            </li>

            {/* Report Link */}
            <li
              onClick={() => { navigate('/dashboard/reports'); if (sidebarOpen) setSidebarOpen(false); }}
              className={`flex w-40 p-2 text-[14px] rounded-[8px] cursor-pointer mb-[32px] 
                ${location.pathname === '/dashboard/reports' ? 'bg-primary text-white' : 'hover:bg-gray-300'}`}
            >
              <WatchLaterOutlinedIcon />
              <button className="ml-1">Report</button>
            </li>

            {/* Logistics Link */}
            <li onClick={() => { navigate('/dashboard/logistics'); if (sidebarOpen) setSidebarOpen(false); }}
              className={`flex w-40 p-2 text-[14px] rounded-[8px] cursor-pointer mb-[32px] 
                ${location.pathname === '/dashboard/logistics' ? 'bg-primary text-white' : 'hover:bg-gray-300'}`}>
              <LocalShippingOutlinedIcon />
              <button className="ml-1">Logistics</button>
            </li>

            {/* Integration Link */}
            <li onClick={() => { navigate('/dashboard/integration'); if (sidebarOpen) setSidebarOpen(false); }}
              className={`flex w-40 p-2 text-[14px] rounded-[8px] cursor-pointer mb-[32px] 
                ${location.pathname === '/dashboard/integration' ? 'bg-primary text-white' : 'hover:bg-gray-300'}`}>
              <InsertLinkIcon />
              <button className="ml-1">Integration</button>
            </li>
          </ul>
        </nav>

        {/* User Actions */}
        <div>
          <ul>
            <li onClick={() => navigate('/dashboard/user-profile')}
              className={`flex w-40 p-2 text-[14px] rounded-[8px] cursor-pointer mb-[32px] 
                ${location.pathname === '/dashboard/user-profile' ? 'bg-primary text-white' : 'hover:bg-gray-300'}`}>
              <Avatar src={`${user?.user?.avatar}?v=${Date.now()}` || undefined} sx={{ height: 20, width: 20 }} />

              <button className="ml-1">Profile</button>
            </li>
            <li onClick={logoutUser}
              className="flex p-2 text-[14px] hover:bg-gray-300 rounded-[4px] cursor-pointer mb-[32px]">
              <LogoutOutlinedIcon sx={{ height: 20, width: 20 }} />
              <button className="ml-1">Logout</button>
            </li>
          </ul>
        </div>
      </aside>

      {/* hamburger for mobile */}
      <div className="sm:hidden absolute top-4 left-4 z-30">
        <IconButton onClick={toggleSidebar}>
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>

      <div className="bg-gray-300 onClick={() => navigate('/dashboard/user-profile')} h-[24px] " onClick={() => navigate(-1)} >
        <ChevronLeftOutlinedIcon />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col -ml-6 sm:px-6 pt-5 max-w-screen-xl mx-auto">
        {/* App Bar */}
        <div className="border-b border-[#D9D9D9] bg-white mx-4">
          <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: 'white' }}>
            <Toolbar className="flex justify-between">
              <div className="flex items-center">
                {/* hide text on small screens to save space */}
                <button
                  onClick={() => navigate('/dashboard/GenerateTrackingID')}
                  className={` sm:flex flex w-fit px-4 ml-5 py-2 leading-5 font-medium text-[14px] rounded-[6px] cursor-pointer  
    ${location.pathname === '/dashboard/GenerateTrackingID'
                      ? 'bg-[#E3E2DC] text-[#ABABAB]'  // Active state
                      : 'bg-primary text-white ml-5 sm:-ml-5'}`}
                >
                  Generate Tracking ID
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <IconButton>
                  <NotificationsNoneOutlinedIcon />
                </IconButton>
                <div className="flex items-center space-x-2">
                  <Avatar src={`${user?.user?.avatar}?v=${Date.now()}` || undefined} sx={{ height: 20, width: 20 }} />

                  <span className="text-gray-700 font-semibold hidden sm:inline">
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
    </div >
  );
};

export default Dashboard;
