import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormControlLabel, Radio, RadioGroup, IconButton, InputAdornment, TextField, Grid } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Button from "@mui/material/Button";


const SignUp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userType, setUserType] = useState("businessOwner");
  const [showPassword, setShowPassword] = useState(false);

  const buttonStyles = {
    backgroundColor: "#FF833C",
    color: "white",
    borderColor: "#FF833C",
    paddingTop: "12px",
    paddingRight: "18px",
    paddingBottom: "12px",
    paddingLeft: "18px",
    borderRadius: "8px",
    "&:focus": {
      borderColor: "#FF833C",
      backgroundColor: "#FF833C",
      color: "white",
    },
    "&:hover": {
      backgroundColor: "#FF833C",
      color: "white",
      borderColor: "#FF833C",
    },
    fontSize: "16px",
    fontWeight: "medium",
    textTransform: "none",
    width: { xs: "100%", md: "100%" },
    marginLeft: { xs: "0", md: "0" },
    marginTop: "1.5rem",
  };
  

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
      <div className="grid grid-cols-1 sm:grid-cols-12  m-4 mt-0 ml-0 mr-0">
        <div className="rounded-none  col-span-5 h-64  bg-white">
          <img
            src="./src/assets/RegImage.png"
            alt="Login"
            className="bg-contain"
          />
        </div>
        <div className="rounded-none col-span-7 h-256 bg-white py-20 px-20">
          <div>
            <Link to="/">
              <div className="welcome-back font-inter mb-5 text-black text-2xl font-medium leading-10 w-56 h-10 gap-0">
                <ArrowBackIcon />
                <span>Create Account</span>
              </div>
            </Link>
            <div className="radio-group inline-flex items-center gap-8 mb-5">
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
        
      <div className="flex justify-center py-5">
        <form className="max-w-md w-full gap-4">
          <Grid container spacing={2} direction="column" >
            {currentPage === 1 && (
              <>
                <h2><label>Personal Information</label>Step 1 of 3</h2>
                <Grid item>
                  <TextField
                    type="text"
                    className="flex w-full  rounded-none"
                    placeholder={userType === "businessOwner" ? "Business Name" : "Logistic Name"}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="email"
                    className="w-full rounded-lg"
                    placeholder={userType === "businessOwner" ? "Business Email" : "Logistic Email"}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="tel"
                    className="w-full mb-5"
                    placeholder="Phone number"
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full mb-5"
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
                        className="w-full mb-5"
                        placeholder="Services"
                        required
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="text"
                        placeholder="Address"
                        className="w-full mb-5"
                        required
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item>
                      <TextField
                        type="text"
                        className="w-full mb-5"
                        placeholder="Services 01"
                        required
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="text"
                        className="w-full mb-5"
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
          {currentPage === 1 && <Button variant="outlined" sx={buttonStyles} type="button" onClick={nextPage}>Continue</Button>}
          {/* {currentPage === 2 && <Button variant="outlined" sx={buttonStyles} type="button" onClick={prevPage}>Previous</Button>} */}
          {currentPage === 2 && <Button variant="outlined" sx={buttonStyles} type="button" onClick={nextPage}>Continue</Button>}
          {currentPage === 3 && (
            <>
              {/* <Button variant="outlined" sx={buttonStyles} type="button" onClick={prevPage}>Previous</Button> */}
              <Button variant="outlined" sx={buttonStyles} type="button" onClick={submitForm}>Submit</Button>
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
