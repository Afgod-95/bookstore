import React, { useEffect, useState } from "react";
import { FormControl, Button, Avatar, Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { motion } from "framer-motion";
import {  buttonsBgColor, bgColor } from "../../constants/Colors";
import { GoEyeClosed, GoEye } from "react-icons/go";

const Forgot_password = () => {
  const [values, setValues] = useState({
    email: '',
  });

  const [isFocused, setIsFocused] = useState(false)


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    onClose();
  };

  return (

      <motion.div
        style={{width: '90%', margin: 'auto'}}
      >
        <div style={{ display: "flex", flexDirection: 'column', gap: "1.3rem", justifyContent: 'center' }}>
          <h3 style={{alignSelf: 'center', paddingTop: '20px'}}>Forgot Password</h3>
          <TextField
            id="email"
            label="Email"
            variant="standard"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            InputLabelProps={{
              style: { color: '#fff' }
            }}
            sx={{ color: '#fff', marginBottom: '1rem',
              borderBottom: isFocused ? 'none' : 'thin solid #acadac',
            }}
          />
         
          {/* 
            <FormControl sx={{color: '#fff', widows: '100%'}}>
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
            />
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              style={{ color: '#fff', position: 'absolute', right: '10px', top: '5px' }}
            >
              {values.showPassword ? <GoEyeClosed /> : <GoEye />}
            </IconButton>
          </FormControl>
          
          */}
          <Box mt={2} textAlign="center">
            <Button variant="contained" sx={{ backgroundColor: buttonsBgColor, width: '70%' }} onClick={handleSubmit}>
              Submit
            </Button>
          </Box>

        </div>
      </motion.div>
   
  );
};

export default Forgot_password;
