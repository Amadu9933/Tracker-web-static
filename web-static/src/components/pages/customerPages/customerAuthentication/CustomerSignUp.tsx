import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './CustomerSignUp.css';
import MyButton from '../../../common/buttons/Mybutton';

interface RegistrationFormData {
  username: string;
  email: string;
  password: string;
  companyName?: string; 
  companyDescription?: string; 
  phoneEmail?: string; 
}

const CustomerSignUp: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  const initialFormData: RegistrationFormData = {
    username: '',
    email: '',
    password: '',
    companyName: '', // Initialize new fields for Business Owner
    companyDescription: '',
    phoneEmail: '',
  };

  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [isBusinessOwner, setIsBusinessOwner] = useState(false); // Track whether the user is a Business Owner

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRadioChange = (value: 'Customer' | 'BusinessOwner') => {
    setIsBusinessOwner(value === 'BusinessOwner');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const endpoint = isBusinessOwner ? 'http://localhost:8000/register-business-owner/' : 'http://localhost:8000/register-customer/';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      // Handle success or redirect to a success page
    } catch (error) {
      console.error('Error submitting registration:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className='box-item' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: '#D9E1E7', border: '1px solid #ddd', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className='header-item' style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <ArrowBackIcon /> {/* Add the ArrowBackIcon here */}
          <h2  style={{ marginLeft: '10px' }}>Create Account</h2>
        </div>
        <div className='radio'>
          <label >
            <input
              type="radio"
              name="userType"
              value="Customer"
              checked={!isBusinessOwner}
              onChange={() => handleRadioChange('Customer')}
            />
            Customer
          </label>
          <label >
            <input
              type="radio"
              name="userType"
              value="BusinessOwner"
              checked={isBusinessOwner}
              onChange={() => handleRadioChange('BusinessOwner')}
            />
            Business Owner
          </label>
        </div>
        <form onSubmit={handleSubmit} >
          <div  >
            <div style={{ display: 'block', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
            <label>
              Username:
              <input className='input-filed' type="text" name="username" onChange={handleChange} />
            </label>
          </div>

          <div style={{ display: 'block', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
            <label>
            Email/Phone number:
              <input className='input-filed' type="text" name="email" onChange={handleChange} />
            </label>
          </div>
          </div>

          {isBusinessOwner && (
            <>
            {/* Additional fields for Business Owner */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
                <label style={{width:'500px'}}>
                  Company Name:
                  <input  type="text" name="companyName" onChange={handleChange} />
                </label>
              </div>
              
            </>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', position: 'relative' }}>
            <label style={{ width: '100%' }}>
              Password:
              <div className='password' style={{ position: 'relative', width: '500px' }}>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={handleChange}
                  style={{ width: '500px', padding: '8px', borderRadius: '8px', margin: '4px 0' }}
                />
                {/* Eye icon to toggle password visibility */}
                {showPassword ? (
                  <FiEyeOff
                    style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                    onClick={handleTogglePassword}
                    aria-label="Hide Password"
                  />
                ) : (
                  <FiEye
                    style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                    onClick={handleTogglePassword}
                    aria-label="Show Password"
                  />
                )}
              </div>
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
            <MyButton onClick={handleClick} label="Sign Up" state="Primary" size="Small" background="#FF833C" />
            <p>Already have an Account? Sign in</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerSignUp;
