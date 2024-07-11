import React, { useState } from "react";
import { Button, Box, CircularProgress, Typography } from '@mui/material';
import { motion } from "framer-motion";
import { buttonsBgColor, bgColor } from "../constants/Colors";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

const Page_Not_Found = () => {
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
        <div style={{ display: "flex", flexDirection: 'column', gap: "1.3rem", color: '#fff', justifyContent: 'center', alignItems: 'center' }}> 
          <h3>404 NOT FOUND</h3>
          <p>
            While attempting to navigate we encountered the following error:
            404 Not Found. The server can not find the requested resource. In the 
            browser, this means the URL is not recognized. In an API, this can also mean
            that the endpoint is valid but the resource itself does not exist. Servers may 
            also send this response instead of 403 Forbidden to hide the existence of a 
            resource from an unauthorized client. This response code is probably the most 
            well known due to its frequent occurrence on the web.
          </p>
          <Box mt={2} textAlign="center">
            <Button variant="contained"
              sx={{ backgroundColor: buttonsBgColor, width: '100%', height: '50px' }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Return To Login Page'}
            </Button>
          </Box>
        </div>
      </motion.div>
    </div>
  );
};

export default Page_Not_Found;
