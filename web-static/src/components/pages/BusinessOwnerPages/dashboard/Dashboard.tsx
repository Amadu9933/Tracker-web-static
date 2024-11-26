import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Avatar, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getUserProfile } from "../../../../api/users"; // Mock API to get user profile
import ParcelChart from "./Chart";
import CreateWallet from "./CreateWallet";
import Logo from "../../../../assets/Logo.png"
import GridViewIcon from '@mui/icons-material/GridView';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile(); // Fetch mock user profile
        setUser(profile);
      } catch (err) {
        setError("Failed to load user profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-200  text-secondary w-[220px] px-[28px] flex flex-col justify-between">
        <nav className="flex flex-col ">
          <h2 className=" "><img className="h-7 w-24" src={Logo} alt="logo" /></h2>
          <ul className="flex-grow ">
            <li className=" flex p-2 text-[14px] active:rounded-[4px] active:bg-primary active:text-white cursor-pointer mb-[32px]"><div className=" "><GridViewIcon /></div><button className=" ml-1 ">Dashboard</button></li>
            <li className=" flex p-2 text-[14px] active:rounded-[4px] active:bg-primary active:text-white cursor-pointer mb-[32px]"><div className=" "><GridViewIcon /></div><button className=" ml-1 ">Dashboard</button></li>
            <li className=" flex p-2 text-[14px] active:rounded-[4px] active:bg-primary active:text-white cursor-pointer mb-[32px]"><div className=" "><GridViewIcon /></div><button className=" ml-1 ">Dashboard</button></li>


          </ul>
        </nav>
        <div>
          <ul>
            <li className=" flex  active:bg-primary cursor-pointer mb-[32px]"><div className=" "><GridViewIcon /></div><button className=" ">Dashboard</button></li>
            <li className=" flex  active:bg-primary cursor-pointer mb-[32px]"><div className=" "><GridViewIcon /></div><button className=" ">Dashboard</button></li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-gray-100">
        {/* App Bar */}
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar className="flex justify-between">
            {/* Empty space for left alignment */}
            <div></div>

            {/* Right-aligned section */}
            <div className="flex items-center space-x-4">
              <Button variant="contained" color="primary">
                Generate Tracking ID
              </Button>
              <IconButton>
                <NotificationsIcon />
              </IconButton>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 font-semibold">{user.name}</span>
                <Avatar>{user.name[0]}</Avatar>
              </div>
            </div>
          </Toolbar>
        </AppBar>

        {/* Dashboard Content */}
        <div className="p-6">
          <h1 className="text-3xl mb-4">Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
          <p>You are in your Dashboard because you successfully logged in.</p>
          <div className="flex bg-red-600 h-[300px] justify-between gap-4 mt-6">
            {/* ParcelChart */}
            <div className="flex-1">
              <ParcelChart />
            </div>
            {/* CreateWallet */}
            <div className="flex-1">
              <CreateWallet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
