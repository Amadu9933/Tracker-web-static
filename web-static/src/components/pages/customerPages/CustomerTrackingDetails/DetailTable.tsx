import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

/**
 * Renders a table with tracking details based on the provided tracking number.
 *
 * @return {JSX.Element} A table with tracking details or an error message if an error occurred.
 */
const DetailTable: React.FC = () => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      console.log('Fetching tracking details for:', trackingNumber);

      try {
        const response = await axios.get(
          `https://trackerr.live/api/v1/trackings/realtime/?parcel_number=${trackingNumber}`
        );

        console.log('Response data:', response.data);

        const data = response.data;

        // Prepare only the fields needed for display
        const filteredData = {
          'Parcel number': data.parcel_number,
          'Date of purchase': data.date_of_purchase,
          'Estimated delivery date': data.delivery_date,
          'Shipping address': data.shipping_address,
          'Vendor': data.vendor,
          'Status': data.status,
        };

        console.log('Filtered data:', filteredData);
        setTrackingData(filteredData);
        setError(null);
      } catch (error: any) {
        console.error('Error fetching tracking details:', error);
        setError(
          error.response?.data?.detail ||
          error.message ||
          'An unknown error occurred'
        );
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
    return <p className="text-red-500 text-xl">Error: {error}</p>;
  }

  if (!trackingData) {
    return <p className="text-gray-600 text-xl">Loading tracking data...</p>;
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
