import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomizedTables from './HistoryTable';
import RecentUpdate from './RecentUpdate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../../../../context/AuthContext';


/**
 * Fetches tracking data for a customer based on the provided email.
 *
 * @param {void} No parameters
 * @return {void} No return value
 */
const CustomerNotification: React.FC = () => {
  // const { paramEmail } = useParams<{ paramEmail: string }>();
  const navigate = useNavigate();
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
    <div className="m-[80px]">
      <div className="flex text-[#040404]">
        <ArrowBackIcon onClick={() => navigate(-1)} />
        <p className="font-bold ml-[5px] ">Parcel History</p>
      </div>
      <div className="border-b-2 border-[#D9E1E7] mb-2 mt-10 text-left">
        <p className="text-[#5D5D4C]">Recent update</p>
      </div>
      <div>
        <RecentUpdate trackingData={trackingData} />
      </div>
      <div className="border-b-2 border-[#D9E1E7] mb-2 mt-10 text-left">
        <p className="text-[#5D5D4C]">History</p>
      </div>
      <div>
        <CustomizedTables trackingData={trackingData} />
      </div>
    </div>
  );
};

export default CustomerNotification;
