import React, { useState } from 'react';
import { FormControlLabel, Radio, RadioGroup, IconButton, InputAdornment, TextField } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import './Login.css'; 

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src="./src/assets/LoginImage.png" 
        style={{ 
          width: '612px',
          height: '1026px',
          left: '-2px',
         }}
        alt="Login" className="login-image" />
      </div>
      <div className="form-container">
        <div className="flex-col">
          <Link to="/">
            <div className="welcome-back" style={{marginBottom:'30px', fontSize: '25px'}}>
              <ArrowBackIcon /><span>Welcome Back!</span>
            </div>
          </Link>
          <div className='radio-group' style={{
            width: '346px',
            height: '24px',
            top: '272px',
            left: '730px',
            gap: '32px',
            marginBottom:'30px',
          }}>
            <RadioGroup aria-label="userType" row defaultValue="businessOwner"  >
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
          
           <div className="sign" style={{ 
            width: '58px',
            height: '27px',
            top: '320px',
            left: '730px',
            gap: '250px',
            opacity: 1,
           }}>Sign In</div>
          
          <div>
            <form className="login-form" style={{
            width: '522px',
            height: '341px',
            top: '392px',
            left: '730px',
            gap: '32px'
           }}
            
            ><label >Email
              <input type="text" placeholder="janedoe@gmail.com" className="input-field" style={{ marginBottom: '30px' }}/>
              </label>
              <label >Password
              <TextField 
              
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="input-field"
                style={{ marginBottom: '5px' }}
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
              </label>
              <Link to="/forgot-password" className="forget-password" >Forget password?</Link>
              <button type="submit" className="submit-button">Sign In</button>

              
              Do not have an account? <Link to="/signup">Sign Up</Link>
            </form>
            
          </div>
        </div>
        
              
              
      </div>
    </div>
  );
};

export default Login;
