import React, { useState }  from "react";
import { Link } from 'react-router-dom'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormControlLabel, Radio, RadioGroup, IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login: React.FC = () => {

	const [showPassword, setShowPassword] = useState(false);
	
	const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

	return (
	<div className="grid grid-cols-1 sm:grid-cols-12  m-4 mt-0 ml-0 mr-0">
  		<div className="rounded-none  col-span-5 h-64  bg-blue-500">
		  <img
    		src="./src/assets/LoginImage.png"
    		alt="Login"
    		className="bg-contain"/>
		</div>
  		<div className="rounded-none col-span-7 h-256 bg-white py-20 px-20">
			<div>
          	<Link to="/">
            	<div className="welcome-back font-inter mb-5 text-black text-2xl font-medium leading-10 w-56 h-10 gap-0" >
              	<ArrowBackIcon /><span>Welcome Back!</span>
            	</div>
			</Link>
				<div className='radio-group inline-flex items-center gap-8 mb-5'>
            	<RadioGroup aria-label="userType" row defaultValue="businessOwner"  >
              		<FormControlLabel
                		value="businessOwner"
                		control={<Radio />}
                		label="Business Owner"
                		className="radio-label"/>
              		<FormControlLabel
                		value="logisticsPartner"
                		control={<Radio />}
                		label="Logistics Partner"
                		className="radio-label"/>
            	</RadioGroup>
          		</div>
				<div className="w-14 h-7  font-inter  text-lg font-medium leading-7 text-left"><label>Sign In</label></div>	
				
            <div className="w-522px h-auto gap-0 py-10">
			<form >
              <input type="text" placeholder="janedoe@gmail.com" className="mb-10 w-full px-4 py-2  bg-gray-100 rounded "/>
              <TextField
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full px-4 py-2  bg-gray-100 rounded mb-10"
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
			  
              <Link to="/forgot-password" className="font-inter text-xs font-normal leading-5 text-left w-435 h-5 mb-5">Password MUST contain a least one uppercase, one lowercase, one number</Link>
              <div>
			  <button type="submit" className="submit-button mt-10">Sign In</button>
			  </div>
            </form>
			
			</div>
			{/* <div className="w-full max-w-xs">
  				<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    			<div className="mb-4">
      			<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        		Username
      			</label>
      			<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
    			</input>
				</div>
    		<div className="mb-6">
      			<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        		Password
      			</label>
      			<input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
      			<p className="text-red-500 text-xs italic">Please choose a password.</p>
    			</input>
				</div>
    			<div className="flex items-center justify-between">
      			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        		Sign In
      			</button>
      			<a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        		Forgot Password?
      			</a>
    		</div>
  			</form>
  			<p className="text-center text-gray-500 text-xs">
    			&copy;2020 Acme Corp. All rights reserved.
  			</p>
			</div> */}
          </div>
          <p>Do not have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
	</div>
	);
};

export default Login;
