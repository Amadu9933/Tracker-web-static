import React from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './LoginPage.css'; 

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <div className="image-container">
        {/* Your image goes here */}
        <img src="BOI.png" alt="Login" className="login-image" />
      </div>
      <div>
      <div className="form-container flex-col">
        {/* Label with arrow icon */}
        <div className="welcome-back">
          <ArrowBackIcon /> Welcome Back!
        </div>
        <div className='radio-group'>
        <RadioGroup aria-label="userType" defaultValue="businessOwner" >
          <FormControlLabel
            value="businessOwner"
            control={<Radio />}
            label="Business Owner"
          />
          <FormControlLabel
            value="logisticsPartner"
            control={<Radio />}
            label="Logistics Partner"
          />
        </RadioGroup>
        </div>
       
        <div>
          <form className="login-form">
          <input type="text" placeholder="Username" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <button type="submit" className="submit-button">Login</button>
        </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
