import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useMediaQuery } from 'react-responsive';
import { Badge, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';



const Header = () => {
  const profileImage = 'https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg';
  const books = useSelector(state => state.cart.products);
  const navigate = useNavigate()

  const iconSize = '2rem'; 

  return (
    <>
      <motion.div 
        initial={{ x: "100"}}
        animate={{ x: "0%" }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
        style={{ 
          display: 'flex', 
          gap: '.7rem', 
          justifyContent: 'flex-end', 
          alignItems: 'center',
        }}
      >
     
     
      <div onClick={() => navigate('/cart')}
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100px',
          position: 'relative',
          width: '70px',
          cursor: 'pointer'
        }}
      >
        <ShoppingCartOutlinedIcon color="action" style={{ fontSize: iconSize, color: '#fff' }} />
        <motion.div 
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, bounce: 0.5, delay: 0.5 }}

          className="" style={{maxWidth: '30px', 
          maxHeight: '30px',
          overflow: 'hidden', 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '10px', 
          background: books.length === 0 ? null : 'blue', 
          position: 'absolute',
          top: '25px',
          right: '5px',
          color: '#fff',
          borderRadius: '100%', 
          alignItems: 'center'}}
        
        >{books.length === 0 ? null : books.length}</motion.div>
      </div>
      
      <Avatar alt="User Profile" src={profileImage} />
    </motion.div>
    </>
    
  );
}

export default Header;


