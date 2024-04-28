import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormControlLabel, Radio, RadioGroup, IconButton, InputAdornment, TextField, Grid, Button } from '@mui/material';
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

  function submitForm(event) {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 m-4 mt-0 ml-0 mr-0 ">
      <div className="sm:col-span-5 h-90 mb-0 bg-white ">
        <img
          src="./src/assets/RegImage.png"
          alt="Login"
          className="bg-contain h-full w-full"
        />
      </div>
      <div className="sm:col-span-7 h-64 bg-white py-20 px-20">
        <div>
          <Link to="/">
            <div className="welcome-back font-inter mb-5 text-black text-2xl font-medium leading-10 w-56 h-10 gap-0 flex items-center">
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
                  <h2 className="mb-5"><label>Personal Information</label> Step 1 of 3</h2>
                  <Grid item>
                    <TextField
                      type="text"
                      placeholder={userType === "businessOwner" ? "Business Name" : "Logistic Name"}
                      className="p-3 md:p-6 w-full"
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="email"
                      placeholder={userType === "businessOwner" ? "Business Email" : "Logistic Email"}
                      className="p-3 md:p-6 w-full"
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="tel"
                      placeholder="Phone number"
                      className="p-3 md:p-6 w-full"
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
                      className="p-3 md:p-6 w-full"
                      required
                    />
                  </Grid>
                </>
              )}

              {currentPage === 2 && (
                <>
                  <h2 className="mb-5">Step 2 of 3</h2>
                  {userType === "businessOwner" ? (
                    <>
                      <Grid item>
                        <TextField
                          type="text"
                          placeholder="Services"
                          className="p-3 md:p-6 w-full"
                          required
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="text"
                          placeholder="Address"
                          className="p-3 md:p-6 w-full"
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
                          className="p-3 md:p-6 w-full"
                          required
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="text"
                          placeholder="Address 01"
                          className="p-3 md:p-6 w-full"
                          required
                        />
                      </Grid>
                    </>
                  )}
                </>
              )}

              {currentPage === 3 && (
                <>
                  <h2 className="mb-5">Step 3 of 3</h2>
                  {/* Allow user to add profile image */}
                  <Grid item>
                    <IconButton>
                      <PhotoCameraIcon />
                    </IconButton>
                  </Grid>
                </>
              )}

              {currentPage === 1 && <Button type="button" onClick={nextPage} className="py-3 px-6 bg-blue-500 text-white rounded-lg">Next</Button>}
              {currentPage === 2 && <Button type="button" onClick={prevPage} className="py-3 px-6 bg-gray-500 text-white rounded-lg">Previous</Button>}
              {currentPage === 2 && <Button type="button" onClick={nextPage} className="py-3 px-6 bg-blue-500 text-white rounded-lg">Next</Button>}
              {currentPage === 3 && (
                <>
                  <Button type="button" onClick={prevPage} className="py-3 px-6 bg-gray-500 text-white rounded-lg">Previous</Button>
                  <Button type="button" onClick={submitForm} className="py-3 px-6 bg-green-500 text-white rounded-lg">Submit</Button>
                </>
              )}
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
