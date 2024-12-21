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
    /**
     * Fetches tracking details for a given tracking number and filters the response data to include only the desired fields.
     *
     * @return {Promise<void>} - A promise that resolves when the tracking details are fetched and filtered successfully, or rejects with an error if an error occurs.
     */
    const fetchTrackingDetails = async () => {
      console.log('Fetching tracking details for:', trackingNumber);
      try {
        const response = await axios.get(
          `https://trackerr.live/api/v1/trackings/realtime/${trackingNumber}`
        );

        console.log('Response data:', response.data);

        // Filter the tracking data to include only the desired fields
        const filteredData = {
          'Parcel number': response.data.parcel_number,
          'Date of purchase': response.data.date_of_purchase,
          'Estimated delivery date': response.data.delivery_date,
          'Shipping address': response.data.shipping_address,
          Vendor: response.data.vendor,
          Status: response.data.status,
        };
        console.log('Filtered data:', filteredData);
        setTrackingData(filteredData);
        setError(null);
      } catch (error: any) {
        console.error('Error fetching tracking details:', error);
        setError(error.message || 'An unknown error occurred');
      }
    };
    fetchTrackingDetails();
  }, [trackingNumber]);

  if (error) {
    console.log('Error:', error);
    return <p className="text-2xl">Error: {error}</p>;
  }

  if (!trackingData) {
    console.log('Loading data...');
    return <p className="text-2xl">Loading data...</p>;
  }

  return (
    <div>
      <table>
        <tbody>
          {/* Iterate over the filtered data to create rows */}
          {Object.entries(trackingData).map(([key, value], index) => {
            console.log('Row data:', { key, value });
            return (
              <tr key={index}>
                <td className="text-left md:pr-36 pr-4">{key}</td>
                <td
                  className={
                    key === 'Status' && value === 'Pending'
                      ? 'text-[#6EA011] text-left'
                      : key === 'Parcel number'
                        ? 'text-[#FF833C] text-left'
                        : 'text-left py-[8px]'
                  }
                >
                  {String(value)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DetailTable;
