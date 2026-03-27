import Button from '@mui/material/Button'; // Importing Button component from Material-UI
import { Link } from 'react-router-dom'; // Importing Link for navigation

const Footer: React.FC = () => {

  const year = new Date().getFullYear()
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

  return (
    <footer
      className="footer pt-8 px-4 md:pt-12 md:px-10 lg:px-32 bg-secondary dark:bg-background-dark text-text-secondary dark:text-text-secondary"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* First column */}
          <div className="space-y-4">
            <h2 className="font-medium text-text-primary dark:text-text-primary text-2xl md:text-3xl">Join To Get Started</h2>
            <p className="text-sm md:text-base text-text-secondary dark:text-text-secondary">
              Your Parcel's journey your way.
            </p>
            <Link to="/Login" style={{ textDecoration: 'none' }}>
              <Button fullWidth variant="outlined" sx={buttonStyles}>
                Get started
              </Button>
            </Link>
          </div>

          {/* Second column */}
          <div className="space-y-3">
            <h3 className="text-lg text-text-primary dark:text-text-primary">Company</h3>
            <p className="text-sm text-text-secondary dark:text-text-secondary">How it works</p>
            <p className="text-sm text-text-secondary dark:text-text-secondary">Career</p>
            <p className="text-sm text-text-secondary dark:text-text-secondary">Legal</p>
          </div>

          {/* Third column */}
          <div className="space-y-3">
            <h3 className="text-lg text-text-primary dark:text-text-primary">Help</h3>
            <p className="text-sm text-text-secondary dark:text-text-secondary">Privacy Policy</p>
            <p className="text-sm text-text-secondary dark:text-text-secondary">Refund Policy</p>
            <p className="text-sm text-text-secondary dark:text-text-secondary">Track Your Order</p>
          </div>

          {/* Fourth column */}
          <div className="space-y-3">
            <h3 className="text-lg text-text-primary dark:text-text-primary">Support</h3>
            <p className="text-sm text-text-secondary dark:text-text-secondary">Feedback</p>
            <p className="text-sm text-text-secondary dark:text-text-secondary">Contact Us</p>
            <p className="text-sm text-text-secondary dark:text-text-secondary">Customer Service</p>
            <p className="text-sm text-text-secondary dark:text-text-secondary">Terms & condition</p>
          </div>
        </div>

        <div className="mt-8 border-t border-border-light dark:border-border-dark pt-6">
          <p className="copy-right text-xs md:text-sm text-text-secondary dark:text-text-secondary">
            Trackerr &copy; {year}. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
