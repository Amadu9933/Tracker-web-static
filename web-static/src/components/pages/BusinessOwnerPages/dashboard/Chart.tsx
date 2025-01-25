import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
} from 'recharts';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const dummyData = {
  today: [
    { time: '8 AM', orders: 50 },
    { time: '10 AM', orders: 75 },
    { time: '12 PM', orders: 100 },
    { time: '2 PM', orders: 85 },
    { time: '4 PM', orders: 120 },
  ],
  yesterday: [
    { time: '8 AM', orders: 40 },
    { time: '10 AM', orders: 70 },
    { time: '12 PM', orders: 95 },
    { time: '2 PM', orders: 80 },
    { time: '4 PM', orders: 110 },
  ],
  last7Days: [
    { day: 'Mon', orders: 400 },
    { day: 'Tue', orders: 450 },
    { day: 'Wed', orders: 420 },
    { day: 'Thu', orders: 480 },
    { day: 'Fri', orders: 500 },
    { day: 'Sat', orders: 520 },
    { day: 'Sun', orders: 600 },
  ],
};

const ParcelChart: React.FC = () => {
  const [filter, setFilter] = useState<'today' | 'yesterday' | 'last7Days'>(
    'today'
  );

  const handleFilterChange = (
    event: SelectChangeEvent<'today' | 'yesterday' | 'last7Days'>
  ) => {
    setFilter(event.target.value as 'today' | 'yesterday' | 'last7Days');
  };

  const chartData =
    filter === 'last7Days'
      ? dummyData.last7Days
      : filter === 'today'
        ? dummyData.today
        : dummyData.yesterday;

  return (
    <div className="h-full flex flex-col bg-white rounded text-secondary p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base">Activity Chart</h2>
        <FormControl variant="outlined" size="small">
          <Select value={filter} onChange={handleFilterChange}>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="yesterday">Yesterday</MenuItem>
            <MenuItem value="last7Days">Last 7 Days</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B5EFF9" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FEFEFE" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis dataKey={filter === 'last7Days' ? 'day' : 'time'} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#1e90ff"
              fill="url(#colorGradient)"
              fillOpacity={1}
            />
            <Line type="monotone" dataKey="orders" stroke="#1e90ff" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ParcelChart;
