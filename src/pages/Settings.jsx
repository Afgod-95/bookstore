import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { buttonsBgColor } from '../constants/Colors';
import Avatar from '@mui/material/Avatar';
import { CiLogout } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { GoBookmarkSlash } from "react-icons/go";
import { toast } from 'react-hot-toast'



const Settings = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

   const onItemClick = (id) => {
    const selectedItem = items.find(item => item.id === id);
    console.log("You clicked on this button");
    navigate(`/book-details/${id}`, { state: { item: selectedItem } });
  };

  const logOut = async () => {
    try{
      setTimeout(() => {
        navigate('/login')
        toast.success('You have successfully logged out')
      },2000)
      toast.success('Redirecting...')
     
    }
    catch(error){
      console.log(error);
    }
  }

  const profileImage = 'https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg';
  
  const Card = ({icon, title, email, username, onClick, delay }) => {
    return(
      <motion.button 
        initial={{ opacity: 0, x: '-100%' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay, type: 'spring', stiffness: 100, damping: 20 }} 
        style={{
          minWidth: '250px',
          height: '100px',
          background: buttonsBgColor,
          borderRadius: '20px',
          display: 'flex', 
          justifyContent: 'center',
          gap: '1rem',
          alignItems: 'center',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '1.5rem' 
        }}
        onClick = { onClick }
      >

         
          {icon}

          <div style={{textAlign: 'left', fontSize: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '.2rem'}}>
            <h4>{title}</h4>
            <p style={{color: '#acadac', fontSize: '13px'}}>{username}</p>
            <span style={{color: '#acadac', fontSize: '13px'}}>{email}</span>
          </div>
        
      </motion.button>
    )
  }


  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <motion.div
        className="middle"
        style={{...styles.middle, }}
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 20 }}
      >
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem'}}
        >
          <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '15px'}}>
            <Card 
              delay = {1.0}
              title={"Update Profile"} 
              icon={ <Avatar alt="User" src={profileImage}  sx = {{height: 70, width: 70}}/>}
              username = "Afari Godwin"
              email = "afgod98@gmail.com"
            />
            
            <Card title={"View Unread Books"} 
              delay = {1.2}
              icon={<GoBookmarkSlash />}
             
              username = "Number of unread books"
              email = {null}
            />
            <Card title={"View Hidden Books"} 
              username = "Number of hidden books"
              icon={<IoBookOutline />}
              delay = {1.3}
            />

            <Card title={"Logout"} 
              icon={<CiLogout/>}
              delay = {1.3}
              onClick={() => logOut()}
            />

          </div>
        </motion.div>
        
      </motion.div>
    </motion.div>
  );
}

const styles = {
  middle: {
    backgroundColor: '#242A4B',
    borderTopLeftRadius: '50px',
    height: '100vh'
  },
  middleMain: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
};

export default Settings;
