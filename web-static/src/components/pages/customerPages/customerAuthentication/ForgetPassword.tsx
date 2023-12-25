import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MyButton from '../../../common/buttons/Mybutton';

interface ForgetPasswordFormData {
  email: string;
}


const ForgetPassword: React.FC = () => {
  const initialFormData: ForgetPasswordFormData = {
    email: '',
  };

  const [isBusinessOwner, setIsBusinessOwner] = useState(false); // Track whether the user is a Business Owner


  const [formData, setFormData] = useState<ForgetPasswordFormData>(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRadioChange = (value: 'Customer' | 'BusinessOwner') => {
    setIsBusinessOwner(value === 'BusinessOwner');
  };
  const handleNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can add password recovery logic here
    console.log('Password recovery initiated:', formData.email);
  };

  return (
    <div className='box-item' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: '#D9E1E7', border: '1px solid #ddd', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className='header-item' style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <ArrowBackIcon />
          <h2 style={{ marginLeft: '10px' }}>Forget Password</h2>
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
        <form onSubmit={handleNext}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
            <label>
              Enter Email:
              <input className='input-filed' type="text" name="email" onChange={handleChange} />
            </label>
          </div>
          <div style={{ display: 'flex',  alignItems: 'center', padding: '2rem' }}>
          <h2 style={{ marginLeft: '10px' }}>Next</h2>
            <FiArrowRight/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
