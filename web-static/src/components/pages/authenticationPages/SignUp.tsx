import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormControlLabel, Radio, RadioGroup, IconButton, InputAdornment, TextField, Grid } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userType, setUserType] = useState("businessOwner");
  const [showPassword, setShowPassword] = useState(false);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  function submitForm(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-12 m-4 mt-0 ml-0 mr-0 ">
        <div className="rounded-none  col-span-5 h-64  bg-white ">
          <img
            src="./src/assets/RegImage.png"
            alt="Login"
            className="bg-contain"
          />
        </div>
        <div className="rounded-none col-span-7 h-64 bg-white py-20 px-20">
          <div>
            <Link to="/">
              <div className="welcome-back font-inter mb-5 text-black text-2xl font-medium leading-10 w-56 h-10 gap-0">
                <ArrowBackIcon />
                <span>Create Account</span>
              </div>
            </Link>
            <div className="radio-group inline-flex items-center gap-8 mb-10 ">
        
              <RadioGroup aria-label="userType" row value={userType} onChange={(e) => setUserType(e.target.value)}>
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
          </div>
        
      <div className="flex justify-center">
        <form className="max-w-md w-full gap-4">
          <Grid container spacing={2} direction="column">
            {currentPage === 1 && (
              <>
                <h2><label>Personal Information</label>Step 1 of 3</h2>
                <Grid item>
                  <TextField
                    type="text"
                    placeholder={userType === "businessOwner" ? "Business Name" : "Logistic Name"}
                    className="p-3 md:p-6"
                    required

                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="email"
                    placeholder={userType === "businessOwner" ? "Business Email" : "Logistic Email"}
                    className="p-3 md:p-6"
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="tel"
                    placeholder="Phone number"
                    className="px-6"
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    required
                  />
                </Grid>
              </>
            )}

            {currentPage === 2 && (
              <>
                <h2>Step 2 of 3</h2>
                {userType === "businessOwner" ? (
                  <>
                    <Grid item>
                      <TextField
                        type="text"
                        placeholder="Services"
                        required
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="text"
                        placeholder="Address"
                        required
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item>
                      <TextField
                        type="text"
                        placeholder="Services 01"
                        required
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="text"
                        placeholder="Address 01"
                        required
                      />
                    </Grid>
                  </>
                )}
              </>
            )}

            {currentPage === 3 && (
              <>
                <h2>Step 3 of 3</h2>
                {/* Allow user to add profile image */}
                <Grid item>
                  <IconButton>
                    <PhotoCameraIcon />
                  </IconButton>
                </Grid>
              </>
            )}
          </Grid>
          {currentPage === 1 && <button type="button" onClick={nextPage}>Next</button>}
          {currentPage === 2 && <button type="button" onClick={prevPage}>Previous</button>}
          {currentPage === 2 && <button type="button" onClick={nextPage}>Next</button>}
          {currentPage === 3 && (
            <>
              <button type="button" onClick={prevPage}>Previous</button>
              <button type="button" onClick={submitForm}>Submit</button>
            </>
          )}
        </form>
      </div>
    </div>
    </div>
      </div>
  );
};

export default SignUp;
