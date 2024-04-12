import React, { useState } from 'react';
import { FormControlLabel, Radio, RadioGroup, IconButton, InputAdornment, TextField } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './LoginPage.css'; 

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="image-container">
        {/* Your image goes here */}
        <img src="./src/assets/LoginImage.png" alt="Login" className="login-image" />
      </div>
      <div>
        <div className="form-container flex-col">
          {/* Label with arrow icon */}
          <Link to="/">
            <div className="welcome-back">
              <ArrowBackIcon /> Welcome Back!
            </div>
          </Link>
          <div className='radio-group'>
            <RadioGroup aria-label="userType" defaultValue="businessOwner" >
              <FormControlLabel
                value="businessOwner"
                control={<Radio />}
                label="Business Owner"
                className="radio-label"
              />
              <FormControlLabel
                value="logisticsPartner"
                control={<Radio />}
                label="Logistics Partner"
                className="radio-label"
              />
            </RadioGroup>
          </div>
          <p>Sign In</p>
          <div>
            <form className="login-form">
              <input type="text" placeholder="janedoe@gmail.com" className="input-field" />
              <TextField
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="input-field"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Link to="/forgot-password" className="forget-password">Forget password?</Link>
              <button type="submit" className="submit-button">Sign In</button>
            </form>
          </div>
          <p>Do not have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
