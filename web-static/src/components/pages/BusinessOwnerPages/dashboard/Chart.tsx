import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
} from 'recharts';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import axios from 'axios';

// ---------- Types ----------
interface DataPoint {
  day: string;
  orders: number;
}

// ---------- Main Component ----------
const ParcelChart: React.FC = () => {
  const [filter, setFilter] = useState<'last7Days' | 'monthly'>('last7Days');
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ---------- API Endpoints ----------
  const API_ENDPOINTS = {
    last7Days: 'https://trackerr.live/api/v1/trackings/charts/weekly/',
    monthly: 'https://trackerr.live/api/v1/trackings/charts/monthly/',
  };

  // ---------- Transform API Response to Recharts Data ----------
  const transformChartData = (dataObj: Record<string, number>): DataPoint[] => {
    return Object.entries(dataObj).map(([day, orders]) => ({
      day, // 'Mon', 'Tue', etc.
      orders, // Number of orders
    }));
  };

  // ---------- Fetch Data Function ----------
  const fetchChartData = async (key: keyof typeof API_ENDPOINTS) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('access');
    if (!token) {
      setError('Authentication token missing. Please login again.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(API_ENDPOINTS[key], {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`Fetched ${key} data:`, response.data);
      const transformedData = transformChartData(response.data); // ✅ Transform data
      setChartData(transformedData);
    } catch (err: any) {
      console.error(`Error fetching ${key} data:`, err);
      setError('Failed to load chart data.');
    } finally {
      setLoading(false);
    }
  };

  // ---------- Fetch on Filter Change ----------
  useEffect(() => {
    fetchChartData(filter);
  }, [filter]);

  // ---------- Handle Filter Change ----------
  const handleFilterChange = (event: SelectChangeEvent<'last7Days' | 'monthly'>) => {
    setFilter(event.target.value as typeof filter);
  };

  // ---------- Render ----------
  return (
    <div className="h-full flex flex-col bg-white rounded text-secondary p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold">Activity Chart</h2>
        <FormControl variant="outlined" size="small">
          <Select value={filter} onChange={handleFilterChange}>
            <MenuItem value="last7Days">Last 7 Days</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Loading and Error Handling */}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-center">Loading chart...</p>}

      {/* Chart */}
      {!loading && !error && chartData.length > 0 && (
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
              <XAxis dataKey="day" />
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
      )}

      {/* No Data */}
      {!loading && !error && chartData.length === 0 && (
        <p className="text-center text-gray-500">No data available.</p>
      )}
    </div>
  );
};

export default ParcelChart;
