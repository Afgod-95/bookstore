import React from 'react'
import { motion } from 'framer-motion'
import { buttonsBgColor } from '../constants/Colors'

const BooksCategoryContainer = ({ category, image, desc }) => {
  return (
    <motion.button 
    initial={{ opacity: 0, x: '-100%' }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 1.5, type: 'spring', stiffness: 100, damping: 20 }}
  
    style={{
      width: '250px',
      height: '100px',
      background: buttonsBgColor,
      borderRadius: '20px',
      display: 'flex', 
      justifyContent: 'flex-start',
      gap: '1rem',
      alignItems: 'center',
      color: '#fff',
      cursor: 'pointer'  
    }}
  >

      <div style={{position: 'relative', width: '80px', height: '100%', border: 'thin solid blue'}}>
        <img src= { image } alt= {'/image'} />
      </div>
  
      <div style={{textAlign: 'left'}}>
        <h4>{category}</h4>
        <p>{desc}</p>
      </div>
    
  </motion.button>
  )
}

export default BooksCategoryContainer