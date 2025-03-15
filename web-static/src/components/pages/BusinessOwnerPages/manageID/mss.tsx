import { useEffect, useState } from 'react';
import Overview from './Overview';
import ParcelChart from './Chart';
import CreateWallet from './CreateWallet';
import { useAuth } from '../../../../context/AuthContext';
import CustomizedTables from '@components/pages/customerPages/customerTrackingDetails/customerNotification/HistoryTable';
import RecentTracking from './RecentTracking'

const DashboardMain = () => {

  const [trackingData, setTrackingData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { email } = useAuth();
  useEffect(() => {
    /**
     * Fetches the tracking history for a customer based on their email.
     *
     * @return {Promise<void>} A promise that resolves when the tracking history is fetched and set.
     * @throws {Error} If the email is not provided or if there is an error fetching the tracking history.
     */
    const fetchTrackingData = async () => {
      try {
        if (!email) {
          console.log('No email provided');
          throw new Error('No email provided');
        }

        console.log(`Fetching tracking history for email: ${email}`);
        const response = await fetch(
          `https://trackerr.live/api/v1/trackings/history/?email=${email}`
        );
        if (!response.ok) {
          console.log(
            `Error fetching tracking history: ${response.statusText}`
          );
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched tracking history:', data);
        setTrackingData(data);
      } catch (error: any) {
        console.log('Error fetching tracking history:', error);
        setErrorMessage(error.message);
      }
    };

    fetchTrackingData();
  }, [email]);

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!trackingData) {
    return <div>Loading tracking history...</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <Overview />
      </div>
      <div className="flex h-[300px]  justify-between gap-4 mt-12">
        <div className="flex-1 h-[300px] ">
          <ParcelChart />
        </div>
        <div className="flex-1 flex">
          <CreateWallet />
        </div>
      </div>
      <div className="">

        <div className=" mb-2 mt-10 text-left flex justify-between">
          <p className="text-secondary font-bold">Recent</p>
          <p>View all</p>
        </div>
        <div>
          <RecentTracking trackingData={trackingData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
