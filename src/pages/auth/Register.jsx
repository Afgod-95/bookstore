import React, { useEffect, useState } from "react";
import { FormControl, Button, Avatar, Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { motion } from "framer-motion";
import {  buttonsBgColor, bgColor } from "../../constants/Colors";
import { GoEyeClosed, GoEye } from "react-icons/go";
import localStorage from "redux-persist/es/storage";
import { toast } from "react-hot-toast";
import CircularLoader from "../../components/Loaders";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = ({ onclose }) => {
  const [values, setValues] = useState({
    profilePicture: '',
    name: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValues({ ...values, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Getting user data from local storage 
  useEffect(() => {
    const getUser = async () => {
      const user = await localStorage.getItem('users');
      if (user) {
        setUser(JSON.parse(user)); 
      }
    };
    getUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(false);

      const { profilePicture, name, email, password } = values;

      if (!(profilePicture && name && email && password)) {
        return toast.error('All fields are required');
      }

      if (user && email === user.email) {
        return toast.error('Email already exists');
      }
      else { 
        await localStorage.setItem('users', JSON.stringify(values));
        toast.success('User created successfully');
        const newUser = { profilePicture, name, email}
        dispatch(setUser(newUser))
        navigate('/dashboard', {state: { item:  newUser }})
        setIsLoading(false);
      }
      
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      toast.error(error.message);
    }
  };


  return (

      <motion.div
        style={{width: '90%', margin: 'auto'}}
      >
        <div style={{ display: "flex", flexDirection: 'column', gap: "1.3rem", justifyContent: 'center' }}>
          <h3 style={{alignSelf: 'center', paddingTop: '20px'}}>Register</h3>
          
          <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
            <Avatar
              alt="Profile Picture"
              src={values.profilePicture}
              sx={{ width: 100, height: 100, alignSelf: 'center' }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }} 
              id="profile-picture-input"
            />
            <label htmlFor="profile-picture-input" style={{ alignSelf: 'center' }}>
              <Button variant="contained" component="span" sx={{ backgroundColor: buttonsBgColor }}>
               Upload a profile
              </Button>
            </label>
          </div>

          <TextField
            id="name"
            label="Name"
            variant="standard"
            value={values.name}
            onChange={handleChange('name')}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            sx={{ color: '#fff', marginBottom: '1rem',
              borderBottom: isFocused ? 'none' : 'thin solid #acadac',
            }}
          />

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
         
          <FormControl sx={{color: '#fff', widows: '100%'}}>
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              sx={{ color: '#fff', marginBottom: '1rem',
                borderBottom: isFocused ? 'none' : 'thin solid #acadac',
              }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
            />
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              style={{ color: '#fff', position: 'absolute', right: '10px', top: '5px' }}
            >
              {values.showPassword ?  <GoEye /> : <GoEyeClosed />}
            </IconButton>
          </FormControl>

          <Box mt={2} textAlign="center">
            <Button variant="contained"
              sx={{ backgroundColor: buttonsBgColor, width: '70%' }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <CircularLoader size={15} /> : 'Submit'}
            </Button>
          </Box>

          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '20px',}}>
          <p style={{color: '#fff' }}>Don't have an account? </p>
            <p style={{color: 'orange', cursor: 'pointer'}} onClick={onclose} >Click here to sign in</p>
          </div>

        </div>
      </motion.div>
   
  );
};

export default Register;
