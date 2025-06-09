import { Back, Carbon } from '../../../../assets/asset';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DetailTable from './DetailTable';
import LiveTrackingMap from './LiveTrackingMap';

/**
 * Renders the customer tracking details component.
 *
 * @return {JSX.Element} The rendered customer tracking details component.
 */
const CustomerTrackingDetails: React.FC = () => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const [mapOpened, setMapOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [origin, setOrigin] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);

  const openMap = () => {
    setMapOpened((prev) => !prev);
  };

  // Fetch tracking details for map (origin/destination)
  useEffect(() => {
    if (!mapOpened || !trackingNumber) return;
    setLoading(true);
    setError(null);
    fetch(`https://trackerr.live/api/v1/trackings/${trackingNumber}/`)
      .then((res) => res.json())
      .then((data) => {
        // Try to get business_owner as origin, customer as destination
        let originCoords = null;
        let destCoords = null;
        if (data.business_owner_lat && data.business_owner_lng) {
          originCoords = { lat: parseFloat(data.business_owner_lat), lng: parseFloat(data.business_owner_lng) };
        } else if (data.rider_lat && data.rider_lng) {
          originCoords = { lat: parseFloat(data.rider_lat), lng: parseFloat(data.rider_lng) };
        }
        if (data.customer_lat && data.customer_lng) {
          destCoords = { lat: parseFloat(data.customer_lat), lng: parseFloat(data.customer_lng) };
        } else if (data.destination_lat && data.destination_lng) {
          destCoords = { lat: parseFloat(data.destination_lat), lng: parseFloat(data.destination_lng) };
        }
        setOrigin(originCoords);
        setDestination(destCoords);
        setLoading(false);
      })
      .catch((e) => {
        setError('Failed to load map data.');
        setLoading(false);
      });
  }, [mapOpened, trackingNumber]);

  // Define Button styling
  const buttonStyles = {
    backgroundColor: '#FF833C',
    color: 'white',
    borderColor: '#FF833C',
    paddingTop: '12px',
    paddingRight: '18px',
    paddingBottom: '12px',
    paddingLeft: '18px',
    borderRadius: '8px',
    '&:focus': {
      borderColor: '#FF833C',
      backgroundColor: '#FF833C',
      color: 'white',
    },
    '&:hover': {
      backgroundColor: '#FF833C',
      color: 'white',
      borderColor: '#FF833C',
    },
    fontSize: '16px',
    fontWeight: 'medium',
    textTransform: 'none',
    width: { xs: 'contain', md: '100%' },
    marginLeft: { xs: '0', md: '0' },
  };

  console.log('Rendering CustomerTrackingDetails component');


  return (
    <div className="  justify-right ">

      <div className="flex justify-center mb-10 ">
        <Link to="/">
          <img
            className="md:w-[48px] md:h-[48px] w-6 h-6 md:mt-0 mt-[6px] mr-4"
            src={Back}
            alt="return"
          />
        </Link>
        <h1 className="font-bold  text-[#354755] md:text-[3.5rem] text-2xl ">
          Track your parcel today!
        </h1>

      </div>

      {/* Map  */}
      {mapOpened && (
        <div className="flex justify-center mt-6">
          <div className="p-6 rounded-md text-center w-[90%]">
            {loading && <div>Loading map...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && origin && destination && trackingNumber && (
              <LiveTrackingMap
                trackingNumber={trackingNumber}
              />
            )}
            {!loading && !error && (!origin || !destination) && (
              <div className="text-gray-500">Location data not available for this parcel.</div>
            )}
          </div>
        </div>
      )}
      <div className=" flex justify-center">
        <div
          className="bg-[#FFF6F2]  py-14 text-base font-normal text-[#423e26] md:text-[16px] text-[14px]
                rounded-[22px] md:px-[4.5rem] px-[30px] md:w-[48.125rem]  w-[346px] 
                "
        >
          <div className=" text-left">
            <img
              className="bg-[#FFD6BE] rounded-full mb-[1rem]"
              src={Carbon}
              alt=""
            />
            <h1 className="md:text-[2rem] text-[1.125rem] font-medium text-[#37372D]">
              Parcel Tracking
            </h1>
            <p className="md:text-[1rem] text-[12px] text-[#37372D] font-normal pt-2">
              Your Parcel is on its way to you!
            </p>
          </div>

          <div className="my-10">
            <DetailTable />
          </div>

          <Button variant="outlined" sx={buttonStyles} onClick={openMap} >
            {mapOpened ? 'Hide live location' : 'View live location'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerTrackingDetails;
