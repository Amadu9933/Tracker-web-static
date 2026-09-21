import { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import TermsAndConditions from '../reusable/TermsAndConditions';

const year = new Date().getFullYear();

const Footer: React.FC = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const termsAndConditionsModalOpen = () => {
    setShowTermsModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };

  const buttonStyles = {
    marginTop: '10px',
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

  return (
    <footer className="footer pt-8 px-4 md:pt-12 md:px-10 lg:px-32 bg-secondary dark:bg-background-dark">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* First column */}
          <div className="space-y-2">
            <h2 className="font-medium text-white text-2xl md:text-3xl">
              Join To Get Started
            </h2>
            <p className="text-sm md:text-base text-white/80">
              Your Parcel's journey your way.
            </p>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button fullWidth variant="outlined" sx={buttonStyles}>
                Get started
              </Button>
            </Link>
          </div>

          {/* Second column */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <Link to="/how-it-works" className="block text-sm text-white/80 hover:text-white cursor-pointer transition-colors">
              How it works
            </Link>
            <Link to="/career" className="block text-sm text-white/80 hover:text-white cursor-pointer transition-colors">
              Career
            </Link>
            <Link to="/legal" className="block text-sm text-white/80 hover:text-white cursor-pointer transition-colors">
              Legal
            </Link>
          </div>

          {/* Third column */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Help</h3>
            <Link to="/privacy-policy" className="block text-sm text-white/80 hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </Link>
            <Link to="/refund-policy" className="block text-sm text-white/80 hover:text-white cursor-pointer transition-colors">
              Refund Policy
            </Link>
            <Link to="/track-your-order" className="block text-sm text-white/80 hover:text-white cursor-pointer transition-colors">
              Track Your Order
            </Link>
          </div>

          {/* Fourth column */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <Link to="/feedback" className="block text-sm text-white/80 hover:text-white cursor-pointer transition-colors">
              Feedback
            </Link>
            <Link to="/contact-us" className="block text-sm text-white/80 hover:text-white cursor-pointer transition-colors">
              Contact Us
            </Link>
            <Link to="/terms-and-condition" className="block text-sm text-white/80 hover:text-white cursor-pointer transition-colors">
              Terms &amp; condition
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/20 pt-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs md:text-sm text-white/70 text-center sm:text-left">
            Trackerr &copy; {year}. All rights reserved
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-xs md:text-sm text-white/70 hover:text-white cursor-pointer transition-colors"
              onClick={termsAndConditionsModalOpen}
            >
              Cookies
            </button>
          </div>
        </div>
      </div>

      {showTermsModal && (
        <TermsAndConditions
          terms={termsAccepted}
          onToggle={() => setTermsAccepted((accepted) => !accepted)}
          onClose={closeTermsModal}
        />
      )}
    </footer>
  );
};

export default Footer;