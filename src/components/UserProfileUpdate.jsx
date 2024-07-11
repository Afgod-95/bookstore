import React, { useEffect, useState } from "react";
import { FormControl, Button, Avatar, Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { motion } from "framer-motion";
import { bgColor, buttonsBgColor } from "../constants/Colors";
import { useMediaQuery } from 'react-responsive';
import { GoEyeClosed, GoEye } from "react-icons/go";

const UserProfileUpdate = ({ onClose, user }) => {
  const [values, setValues] = useState({
    profilePicture: '',
    name: '',
    email: '',
  });

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  
  useEffect(() => {
    if (user) {
      setValues({
        profilePicture: user.profileImage || '',
        name: user.username || '',
        email: user.email || '',
      });
    }
  }, [user]);

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


  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
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
          <h3 style={{alignSelf: 'center', paddingTop: '20px'}}>Update Profile</h3>
          
          <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
            <Avatar
              alt="Profile Picture"
              src={values.profilePicture}
              sx={{ width: 70, height: 70, alignSelf: 'center' }}
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
                Edit Profile Picture
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
            sx={{color: '#fff'}}
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
            sx={{color: '#fff'}}
          />

          <Box mt={2} textAlign="center">
            <Button variant="contained" sx={{ backgroundColor: buttonsBgColor, width: '50%' }} onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfileUpdate;
