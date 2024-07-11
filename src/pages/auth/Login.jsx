import React, { useEffect, useState } from "react";
import { FormControl, Button, Avatar, Box, TextField, IconButton } from '@mui/material';
import { motion } from "framer-motion";
import { buttonsBgColor, bgColor } from "../../constants/Colors";
import { GoEyeClosed, GoEye } from "react-icons/go";
import Register from "./Register";
import BottomSheet from "../../components/BottomSheet";
import Forgot_password from "./Forgot_password";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import CircularLoader from "../../components/Loaders";
import { useMediaQuery } from 'react-responsive';
import localStorage from "redux-persist/es/storage";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import usersReducer from "../../react-redux/usersReducer";

const Login = () => {
  const [values, setValues] = useState({
    profilePicture: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const [user, setUser] = useState(null)

  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch()
  //getting user data from local storage 
  useEffect(() => {

    const getUser =  async () => {
        const users = await localStorage.getItem('users')
        console.log(`User ${users.name}`)
        setUser(JSON.parse(users))
    } 
    getUser
   
  },[])
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(false)
     
      const {  email, password } = values
      
      
      
      if (!(email && password)) {
        return toast.error('All fields are required');
      }

      if (user && email !== user.email) {
        return toast.error('Email not found');
      }



      if (user && password !== user.password){
        return  toast.error('Passwords do not match')
      }
      else {
        setIsLoading(true)
        setTimeout(() => {
          toast.success('Login Successful')
          setIsLoading(false)
          navigate('/dashboard')
        }, 2000)
        
        setValues({...user})
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: 'wrap'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: 1, y: "0%" }}
        exit={{ opacity: 0, y: "-100%" }}
        transition={{ type: "spring", stiffness: 100 }}
        style={{
          justifyContent: "flex-start",
          display: "flex",
          flexDirection: "column",
          flexWrap: 'wrap',
          gap: "10px",
          padding: '20px',
          width: isMobile ? '80%' : isTablet ? '60%' : '30%', 
          backgroundColor: bgColor,
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", flexDirection: 'column', gap: "1.3rem", justifyContent: 'center' }}>
          <h3 style={{ alignSelf: 'center', paddingTop: '20px' }}>Login In</h3>
          
          <Avatar
            alt="Profile Picture"
            src={values.profilePicture}
            sx={{ width: 100, height: 100, alignSelf: 'center' }}
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
            sx={{ color: '#fff', marginBottom: '1rem', borderBottom: isFocused ? 'none' : 'thin solid #acadac',}}
          />
         
          <FormControl sx={{ color: '#fff', width: '100%' }}>
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
              sx={{ color: '#fff', marginBottom: '1rem',  borderBottom: isFocused ? 'none' : 'thin solid #acadac', }}
            />
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              style={{ color: '#fff', position: 'absolute', right: '10px', top: '5px' }}
            >
              {values.showPassword ? <GoEye style={{ top: '0px' }} /> : <GoEyeClosed />}
            </IconButton>
          </FormControl>
        
          <div style={{ cursor: 'pointer', color: '#fff'  }} onClick={() => setShowForgotPasswordModal(true)}>
            <p style={{color: '#fff' , textAlign: 'right'}}>Forgot Password?</p>
          </div>

          <Box mt={2} textAlign="center">
            <Button variant="contained"
              sx={{ backgroundColor: buttonsBgColor, width: '70%' }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <CircularLoader size={10} /> : 'Login'}
            </Button>
          </Box>

          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '20px' }}>
            <p style={{color: '#fff' }}>Don't have an account? </p>
            <p style={{ color: 'orange', cursor: 'pointer' }} onClick={() => setShowRegisterModal(true)}>Click here to register</p>
          </div>
        </div>
      </motion.div>

      {showRegisterModal &&
        <BottomSheet
          onClose={() => setShowRegisterModal(false)}
          isOpen={showRegisterModal}
        >
          <Register  onclose={() => setShowRegisterModal(false)}/>
        </BottomSheet>
      }

      {showForgotPasswordModal &&
        <BottomSheet
          onClose={() => setShowForgotPasswordModal(false)}
          isOpen={showForgotPasswordModal}
        >
          <Forgot_password />
        </BottomSheet>
      }
    </div>
  );
};

export default Login;
