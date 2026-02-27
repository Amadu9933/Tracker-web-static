import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from './CustomerNotification/CircularProgress';
import title from '@components/utils/title';

const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST; // Use environment variable for base URL

/**
 * Renders a table with tracking details based on the provided tracking number.
 *
 * @return {JSX.Element} A table with tracking details or an error message if an error occurred.
 */

interface DetailTableProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setCanTrack: React.Dispatch<React.SetStateAction<any>>;
}

const DetailTable: React.FC<DetailTableProps> = ({ setStatus, setCanTrack }) => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      console.log('Fetching tracking details for:', trackingNumber);
      const cacheKey = `detailTable:${trackingNumber}`;
      const cached = localStorage.getItem(cacheKey);
      if (!navigator.onLine && cached) {
        setTrackingData(JSON.parse(cached));
        setError(null);
        return;
      }
      try {
        const response = await axios.get(
          `${TRACKERR_HOST}/trackings/${trackingNumber}/`
        );

        console.log('Response data:', response.data);

        const data = response.data;

        setStatus(data.status);
        setCanTrack(data.track_now);

        const tracking_status = (data.status === 'in transit' && data.track_now)? data.status : 'Your parcel is with the courier. Real-time tracking will begin shortly when they start your delivery.' 

        // Prepare only the fields needed for display
        const filteredData = {
          'Parcel number': data.parcel_number,
          'Date of purchase': data.date_of_purchase,
          'Estimated delivery date': data.delivery_date,
          'Shipping address': title(data.shipping_address),
          'Vendor': title(data.vendor),
          'Status': title(tracking_status),
        };

        console.log('Filtered data:', filteredData);
        setTrackingData(filteredData);
        setError(null);
        localStorage.setItem(cacheKey, JSON.stringify(filteredData));
      } catch (error: any) {
        console.error('Error fetching tracking details:', error);
        if (cached) {
          setTrackingData(JSON.parse(cached));
          setError(null);
        } else {
          if (error.status === 404) {
            setError('Invalid tracking number provided.');
            return;
          }
          setError(
            error.response?.data?.detail ||
            error.message ||
            'An unknown error occurred'
          );
        }
      }
    };

    if (trackingNumber) {
      fetchTrackingDetails();
    } else {
      setError('Invalid tracking number provided.');
    }
  }, [trackingNumber]);

  // Loading and error states
  if (error) {
    return <p className="text-orange-500 text-xl text-center">{error}</p>;
  }

  if (!trackingData) {
    return <CircularProgress />;
  }

  // Final table display
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full">
        <tbody>
          {Object.entries(trackingData).map(([key, value], index) => (
            <tr key={index} className="last:border-b-0">
              <td className="text-left font-medium py-3 pr-8 text-gray-700">
                {key}
              </td>
              <td
                className={`text-left py-3 ${key === 'Status' && String(value).toLowerCase() === 'pending'
                  ? 'text-yellow-600 font-semibold'
                  : key === 'Parcel number'
                    ? 'text-orange-500 font-semibold'
                    : 'text-gray-600'
                  }`}
              >
                {String(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailTable;
