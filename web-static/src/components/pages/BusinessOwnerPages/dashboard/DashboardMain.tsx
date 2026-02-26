import { useEffect, useState } from 'react';
import Overview from './Overview';
import ParcelChart from './Chart';
import CreateWallet from './CreateWallet';
import CustomizedTables from './RecentTracking';
import { fetchTrackingData } from '../../../../api/tracking';

const DashboardMain = () => {
  const [, setTrackingData] = useState<any[]>([]); // State to hold tracking data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tracking data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access'); // ✅ Get token from localStorage

      if (!token) {
        setError('No token found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchTrackingData('trackings/');
        setTrackingData(data.results || []); // ✅ Set data or empty array fallback
        console.log('Tracking Data:', data); // ✅ Correct console.log
      } catch (err: any) {
        console.error('Failed to fetch tracking data:', err);
        setError(err.response?.data?.detail || 'Failed to fetch tracking data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call function
  }, []); // Run once on mount

  return (
    <div className="w-full">
      <div className="w-full">
        <Overview />
      </div>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mt-12">
        <div className="w-full md:flex-1 md:h-[300px] h-64">
          <ParcelChart />
        </div>
        <div className="w-full md:flex-1 flex justify-center md:justify-end">
          <CreateWallet />
        </div>
      </div>
      <div className="">
        <div className="mb-2 mt-10 text-left flex justify-between">
          <p className="text-secondary font-bold">Recent</p>
          <p>View all</p>
        </div>

        {loading && <p className="text-center">Loading recent trackings...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && (
          <div>
            <CustomizedTables limit={5} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMain;
