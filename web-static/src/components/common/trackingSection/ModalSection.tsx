import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '../../pages/customerPages/customerTrackingDetails/customerNotification/Data';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '23.25rem',
  width: { xs: '285px', md: '29.4rem' },
  bgcolor: 'white',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: '0.5rem',
  paddingTop: '2.5rem',
  paddingBottom: '2.5rem',
  paddingLeft: { xs: '24px' },
  paddingRight: { xs: '24px' },
};

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
  width: { xs: '100%', md: '100%' },
  marginLeft: { xs: '0', md: '0' },
  marginTop: '1.5rem',
};

interface TrackingModalProps {
  open: boolean;
  handleClose: () => void;
}

/**
 * Handles the form submission for viewing order history.
 *
 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
 * @return {void} This function does not return anything.
 */
const TrackingModal: React.FC<TrackingModalProps> = ({ open, handleClose }) => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /**
   * Updates the email state with the value entered in the input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   * @return {void} This function does not return anything.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value changed:', event.target.value);
    setEmail(event.target.value);
    // Clear previous errors
    setError(null);
  };

  /**
   * Simulates a network request failure and returns a Promise that resolves or rejects after a random delay.
   *
   * @param {string} _email - The email to be used in the simulation. Currently not used.
   * @return {Promise<{success: boolean}>} A Promise that resolves with an object containing a boolean indicating success or rejects with an Error object indicating a failure to fetch data.
   */
  const mockFetchRequest = (_email: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a network request failure
        if (Math.random() < 0.5) {
          console.log('Simulating network request failure');
          reject(new Error('Failed to fetch data'));
        } else {
          console.log('Simulating successful network request');
          resolve({ success: true });
        }
      }, 1000);
    });
  };

  /**
   * Handles the form submission for viewing order history.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @return {Promise<void>} A Promise that resolves when the form submission is complete.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form submitted');
    e.preventDefault();
    if (!email) {
      console.log('Email is empty');
      alert('Please enter an email address');
      return;
    }

    console.log('Setting loading state to true');
    setLoading(true);
    setError(null);

    try {
      console.log('Mocking network request');
      await mockFetchRequest(email);
      console.log('Navigating to /customer-notification/${email}');
      navigate(`/customer-notification/${email}`);
    } catch (err) {
      console.log('Error fetching data:', err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      console.log('Setting loading state to false');
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {loading ? (
        <div className="border-none">
          <CircularProgress />
        </div>
      ) : (
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h1"
            sx={{
              color: '#354755',
              fontWeight: '700',
              fontSize: { xs: '20px', md: '2rem' },
            }}
          >
            View order history
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontWeight: '400',
              fontSize: '1rem',
              color: '#354755',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            To view your order history please enter your email address
            associated with your orders.
          </Typography>
          <label className="text-[#354755] font-bold" htmlFor="">
            Email
          </label>
          <form onSubmit={handleSubmit}>
            <div className="search-container mt-3">
              <input
                className=""
                type="text"
                placeholder="example@gmail.com"
                value={email}
                onChange={handleInputChange}
                disabled={loading} // Disable input while loading
              />
              <i className="search-icon"></i>
            </div>

            <Button type="submit" variant="outlined" sx={buttonStyles}>
              Proceed
            </Button>
          </form>
          {error && (
            <Typography sx={{ color: 'red', mt: 2 }}>{error}</Typography>
          )}
        </Box>
      )}
    </Modal>
  );
};

export default TrackingModal;
