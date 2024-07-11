import React, { useEffect, useState } from "react";
import { Button, Avatar, Box, TextField } from '@mui/material';
import { motion } from "framer-motion";
import { bgColor, buttonsBgColor } from "../constants/Colors";
import { useMediaQuery } from 'react-responsive';

const AddBookModal = ({ onClose, book }) => {
  const [values, setValues] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    image: '',
    year: '',
    price: '',
  });

  const [yearType, setYearType] = useState('text');

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValues({ ...values, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
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
          padding: isMobile ? '20px' : '40px',
          width: isMobile ? '80%' : isTablet ? '50%' : '30%', 
          backgroundColor: bgColor,
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          maxHeight: '90vh',
          display: "flex",
          flexDirection: "column",
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ alignSelf: 'center', paddingTop: '10px', marginBottom: '1rem' }}>Add Book</h3>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem', padding: '10px' }}>
          <Avatar
            alt="Profile Picture"
            src={values.image}
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
              Add Book Cover 
            </Button>
          </label>
        </div>

        <div style={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <TextField
            id="name"
            label="Name"
            variant="standard"
            value={values.title}
            onChange={handleChange('title')}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            sx={{ color: '#fff', marginBottom: '1rem',
              borderBottom: isFocused ? 'none' : 'thin solid #acadac',
            }}
            fullWidth
          />

          <TextField
            id="author"
            label="Author's Name"
            variant="standard"
            type="text"
            value={values.author}
            onChange={handleChange('author')}
            InputLabelProps={{
              style: { color: '#fff' }
            }}
            sx={{ color: '#fff', marginBottom: '1rem',
              borderBottom: isFocused ? 'none' : 'thin solid #acadac',
            }}
            fullWidth
          />

          <TextField
            id="description"
            label="Description"
            variant="standard"
            multiline
            rows={4}
            value={values.description}
            onChange={handleChange('description')}
            InputLabelProps={{
              style: { color: '#fff' }
            }}
            sx={{ color: '#fff', marginBottom: '1rem',
              borderBottom: isFocused ? 'none' : 'thin solid #acadac',
            }}
            fullWidth
          />

          <TextField
            id="category"
            label="Category"
            variant="standard"
            type="text"
            value={values.category}
            onChange={handleChange('category')}
            InputLabelProps={{
              style: { color: '#fff' }
            }}
            sx={{ color: '#fff', marginBottom: '1rem',
              borderBottom: isFocused ? 'none' : 'thin solid #acadac',
            }}
            fullWidth
          />

          <TextField
            id="year"
            label="Year Published"
            variant="standard"
            type={yearType}
            onFocus={() => setYearType('date')}
            onBlur={() => setYearType(values.year ? 'date' : 'text')}
            value={values.year}
            onChange={handleChange('year')}
            InputLabelProps={{
              style: { color: '#fff' }
            }}
            sx={{ color: '#fff', marginBottom: '1rem',
              borderBottom: isFocused ? 'none' : 'thin solid #acadac',
            }}
            fullWidth
          />

          <TextField
            id="price"
            label="Price"
            variant="standard"
            type="number"
            value={values.price}
            onChange={handleChange('price')}
            InputLabelProps={{
              style: { color: '#fff' }
            }}
            sx={{ color: '#fff', marginBottom: '1rem',
              borderBottom: isFocused ? 'none' : 'thin solid #acadac',
            }}
            fullWidth
          />
        </div>

        <Box mt={2} textAlign="center" sx={ { height: '50px'}}>
          <Button variant="contained" sx={{ backgroundColor: buttonsBgColor, width: '50%' }} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </motion.div>
    </div>
  );
};

export default AddBookModal;
