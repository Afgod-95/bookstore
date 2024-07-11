import React, { useState } from "react";
import { Button, Box, CircularProgress, Typography } from '@mui/material';
import { motion } from "framer-motion";
import { buttonsBgColor, bgColor } from "../constants/Colors";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

const OnLoadPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login"); 
    }, 2000);
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
        <div style={{ display: "flex", flexDirection: 'column', gap: "1.3rem", color: '#fff', justifyContent: 'center' }}>
          <Typography variant="h5" align="center" sx={{fontFamily: 'Bastro', lineHeight: '40px'}} gutterBottom>Welcome to BookStore</Typography>
          <Typography variant="body1" gutterBottom>
            Discover your next great read with us! Our BookStore offers a vast collection of books across various genres.
            Join our community and start exploring today.
          </Typography>
          
          <Box mt={2} textAlign="center">
            <Button variant="contained"
              sx={{ backgroundColor: buttonsBgColor, width: '70%' }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Get Started'}
            </Button>
          </Box>
        </div>
      </motion.div>
    </div>
  );
};

export default OnLoadPage;
