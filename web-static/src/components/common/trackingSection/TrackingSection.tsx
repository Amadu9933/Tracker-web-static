// TrackingSection.tsx
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TrackingSection.css';
import { Carbon } from '../../../assets/asset';
import ModalSection from './ModalSection';
import { motion } from "framer-motion";

const TrackingSection: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const trackingInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (location.state?.focusTrackingInput) {
      trackingInputRef.current?.focus();
    }
  }, [location.state]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingNumber(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      
      navigate(`/tracking/${trackingNumber}`);
    }
  };

  return (
    <section className="track-section">
      <div className="track-container">
        {/* Logo */}
        <motion.img
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          src={Carbon}
          alt="Logo"
          className="carbon-delivery"
          onClick={() => navigate('/')}
        />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Parcel Tracking
        </motion.h2>

        {/* Tracking ID label + history button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="enter-tracking"
        >
          <p>Tracking I.D</p>
          <div className="my-parcels">
            <p
              onClick={handleOpen}
              className='  cursor-pointer text-sm sm:text-base text-orange-700/70  transition-colors duration-200 hover:text-orange-700/90 '


            >
              View Tracking History
            </p>

            <ModalSection open={open} handleClose={handleClose} />
          </div>
        </motion.div>

        {/* Search input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="search-container mt-3"
        >
          <input
            ref={trackingInputRef}
            style={{ backgroundColor: '#fdefe8' }}
            type="text"
            placeholder="Enter tracking number and press Enter"
            value={trackingNumber}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className={`
              w-full px-4 py-3.5
              bg-[#fdefe8] text-gray-800 
              border border-orange-200 rounded-xl
              text-sm sm:text-base    
              placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base
              placeholder:text-orange-700/70
              focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400
              transition-all duration-200
              indent-[15px]
              pt-[clamp(0.75rem,1.265rem,1.5vw)]
              pb-[clamp(0.75rem,1.265rem,1.5vw)]
              pr-[clamp(2.5vw,5%,2.5rem)]
              pl-[clamp(20px,4vw,40px)]
            `}
          />
          <i className="search-icon"></i>
        </motion.div>

      </div>
    </section>
  );
};

export default TrackingSection;