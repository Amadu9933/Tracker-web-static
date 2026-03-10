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
import { motion } from 'framer-motion';
import axios from 'axios';

const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST;

interface DataPoint {
  day: string;
  orders: number;
}

const ParcelChart: React.FC = () => {
  const [filter, setFilter] = useState<'last7Days' | 'monthly'>('last7Days');
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_ENDPOINTS = {
    last7Days: `${TRACKERR_HOST}/trackings/charts/weekly/`,
    monthly: `${TRACKERR_HOST}/trackings/charts/monthly/`,
  };

  const transformChartData = (dataObj: Record<string, number>): DataPoint[] =>
    Object.entries(dataObj).map(([day, orders]) => ({ day, orders }));

  const fetchChartData = async (key: keyof typeof API_ENDPOINTS) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('access');
    if (!token) {
      setError('Authentication token missing. Please login again.');
      setLoading(false);
      return;
    }

    const cacheKey = `chartData:${key}`;
    const cached = localStorage.getItem(cacheKey);
    if (!navigator.onLine && cached) {
      setChartData(JSON.parse(cached));
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(API_ENDPOINTS[key], {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      });
      const transformedData = transformChartData(response.data);
      setChartData(transformedData);
      localStorage.setItem(cacheKey, JSON.stringify(transformedData));
    } catch (err: any) {
      if (cached) {
        setChartData(JSON.parse(cached));
      } else {
        setError('Failed to load chart data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData(filter);
  }, [filter]);

  const handleFilterChange = (event: SelectChangeEvent<'last7Days' | 'monthly'>) => {
    setFilter(event.target.value as typeof filter);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col bg-white rounded-xl text-secondary p-3 sm:p-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex justify-between items-center mb-4"
      >
        <h2 className="text-sm sm:text-base font-semibold">Activity Chart</h2>
        <FormControl variant="outlined" size="small">
          <Select
            value={filter}
            onChange={handleFilterChange}
            sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
          >
            <MenuItem value="last7Days">Last 7 Days</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </motion.div>

      {/* Error */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-xs sm:text-sm text-center"
        >
          {error}
        </motion.p>
      )}

      {/* Loading */}
      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs sm:text-sm text-center text-gray-500"
        >
          Loading chart...
        </motion.p>
      )}

      {/* Chart */}
      {!loading && !error && chartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0.95 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-grow min-h-[180px] sm:min-h-[220px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B5EFF9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FEFEFE" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                interval={0}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{ fontSize: '0.75rem' }}
              />
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
        </motion.div>
      )}

      {/* No data */}
      {!loading && !error && chartData.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs sm:text-sm text-gray-500"
        >
          No data available.
        </motion.p>
      )}
    </motion.div>
  );
};

export default ParcelChart;