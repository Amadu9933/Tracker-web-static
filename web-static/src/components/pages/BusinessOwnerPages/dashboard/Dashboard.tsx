import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Avatar, IconButton } from '@mui/material';

import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';

import DashboardMain from './DashboardMain';
import Logo from '../../../../assets/Logo.png';
import GridViewIcon from '@mui/icons-material/GridView';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const Dashboard: React.FC = () => {
  return (
    <div className=" flex ">
      {/* Sidebar */}
      <aside className="bg-gray-200  text-secondary w-[220px] px-[28px] flex flex-col justify-between">
        <nav className="flex flex-col ">
          <h2 className=" ">
            <img className="h-7 my-[32px] w-20" src={Logo} alt="logo" />
          </h2>
          <ul className="flex-grow ">
            <li className=" flex p-2 text-[14px] active:rounded-[4px] active:bg-primary active:text-white cursor-pointer mb-[32px]">
              <div className=" ">
                <GridViewIcon />
              </div>
              <button className=" ml-1 ">Dashboard</button>
            </li>
            <li className=" flex p-2 text-[14px] active:rounded-[4px] active:bg-primary active:text-white cursor-pointer mb-[32px]">
              <div className=" ">
                <WatchLaterOutlinedIcon />
              </div>
              <button className=" ml-1 ">Report</button>
            </li>
            <li className=" flex p-2 text-[14px] active:rounded-[4px] active:bg-primary active:text-white cursor-pointer mb-[32px]">
              <div className=" ">
                <LocalShippingOutlinedIcon />
              </div>
              <button className=" ml-1 ">Logistics</button>
            </li>
            <li className=" flex p-2 text-[14px] active:rounded-[4px] active:bg-primary active:text-white cursor-pointer mb-[32px]">
              <div className=" ">
                <InsertLinkIcon />
              </div>
              <button className=" ml-1 ">Integration</button>
            </li>
          </ul>
        </nav>
        <div>
          <ul>
            <li className=" flex p-2 text-[14px] active:rounded-[4px] active:bg-primary active:text-white cursor-pointer mb-[32px]">
              <div className=" ">
                <Avatar sx={{ height: 20, width: 20 }} />
              </div>
              <button className="ml-1  ">Dashboard</button>
            </li>
            <li className=" flex p-2 text-[14px] active:rounded-[4px] active:bg-primary active:text-white cursor-pointer mb-[32px]">
              <div className=" ">
                <LogoutOutlinedIcon sx={{ height: 20, width: 20 }} />
              </div>
              <button className="ml-1  ">Dashboard</button>
            </li>
          </ul>
        </div>
      </aside>
      <div className="bg-gray-300 h-[24px]">
        {' '}
        <ChevronLeftOutlinedIcon />{' '}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col mx-8 pt-5">
        {/* App Bar */}
        <div className="border-b border-[#D9D9D9] bg-white mx-4">
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ backgroundColor: 'white' }}
          >
            <Toolbar className="flex justify-between">
              {/* Empty space for left alignment */}
              <div></div>

              {/* Right-aligned section */}
              <div className="flex items-center space-x-4">
                <button className="p-1 px-2 h-auto bg-[#FF833C] hover:bg-orange-300 text-white text-sm rounded">
                  Generate Tracking ID
                </button>

                <IconButton>
                  <NotificationsNoneOutlinedIcon />
                </IconButton>
                <div className="flex items-center space-x-2">
                  <Avatar sx={{ width: 30, height: 30 }}></Avatar>
                  <span className="text-gray-700 font-semibold">Welcome, </span>
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </div>

        {/* Dashboard Content */}
        <DashboardMain />
      </main>
    </div>
  );
};

export default Dashboard;
