import React, { useEffect, useState } from "react";
import { Button, Box } from '@mui/material';
import { motion } from "framer-motion";
import { buttonsBgColor, bgColor } from "../constants/Colors";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, resetCart, updateQuantity } from "../react-redux/cartReducer";
import { useMediaQuery } from 'react-responsive';
import { toast } from "react-hot-toast";
import CircularLoader from "../components/Loaders";
import { IoIosArrowBack } from "react-icons/io";
import { DeleteOutline } from "@mui/icons-material";

const BooksCart = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  const [isReset, setIsReset] = useState(false)

  const books = useSelector(state => state.cart.products);
  const total = useSelector(state => state.cart.books);
  const dispatch = useDispatch();
  console.log('Total Price', total)


  //function to reset cart to null
  const resetBookCart = () => {
    setIsReset(true)

    setTimeout(()=>{
        setIsReset(false)
        dispatch(resetCart());
        toast.success("Cart Resetted successfully")
    }, 1000)
  };

  //update quantity 
  const handleUpdateQuantity = (bookId, newQuantity) => {
    dispatch(updateQuantity({ id: bookId, quantity: newQuantity }));
  };

  //delete book by id 
  const deleteBookById = (book_ID, title) => {
    if (book_ID){
        setTimeout(() => {
            dispatch(removeItem(book_ID))
            toast.success(`Book with titled ${title} removed successfully`)
        },1000)
    }
  }

  const handleSubmit = () => {
    toast.success('Processing your request');
  };

  //go back to previous screen 
    const goBack = () => {
        window.history.back();
    };

  return (
    <motion.div
      initial={{ opacity: 0, x: '-100%' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      style={{
        overflow: isMobile ? 'scroll' : 'hidden',
      }}
    >
      <motion.div
        className="middle"
        style={{...styles.middle, }}

        initial={{ opacity: 0, x: '-100%' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 20 }}
      >
        <motion.div
            style={{...styles.middleMain, marginTop: isMobile ? '30px': '30px' }}
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100, damping: 20 }}
        >
            <motion.div
                style={styles.back}
                onClick={goBack}
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, bounce: 0.5 }}
            >
                <IoIosArrowBack  />
                <h4 style={{fontSize: '1rem'}}>Back</h4>
            </motion.div>
            <div style={{ display: "flex", flexDirection: 'column', gap: "1rem", justifyContent: 'center' }}>
                <h3 style={{ alignSelf: 'center', paddingTop: '20px' }}>Books In Cart</h3>
                <p style={{color: '#fff'}}>{books.length === 0 ? 'There Is No Book Added To Cart' : `Total Number Of Bokks Added To Cart: ${books.length}`}</p>

                <div style={styles.line}></div>
                <div style={{overflowY: 'scroll', height: books.length === 0 ? null : '45vh'}}>
                    {books.map((book, index) => (
                    <>
                        <motion.div key={index}
                            
                            style={{
                                marginBlock: '10px', 
                                display: 'flex', 
                                flexDirection: isMobile ? 'column' : 'row', 
                                justifyContent: 'space-between', 
                                alignItems: isMobile ? 'flex-start' : 'center'
                            }}
                        >
                            <div style={{ display: 'flex', gap: '1rem'}} >
                                <div style={styles.imageContainer}>
                                    <img src={book.image} alt={book.title} style={styles.image} />
                                </div>
                                <div style={styles.bookNameContainer}>
                                    <h4 style={styles.bookName}>{book.title}</h4>
                                    <p style={styles.bookPrice}>{book.price}</p>
                                </div>
                            </div>
                            <div style={{...styles.quantityContainer, marginTop: '10px'}}>
                               <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                    <button
                                        style={{ ...styles.quantity, backgroundColor: buttonsBgColor }}
                                        onClick={() => handleUpdateQuantity(book.id, book.quantity ? 1 : -1)}
                                    >
                                        -
                                    </button>
                                    <span>{book.quantity}</span>
                                    <button
                                        style={{ ...styles.quantity, backgroundColor: buttonsBgColor }}
                                        onClick={() => handleUpdateQuantity(book.id, book.quantity + 1)}
                                    >
                                        +
                                    </button>
                               </div>
                                <button onClick={() => deleteBookById(book.id, book.title)}
                                    style={{ ...styles.quantity, backgroundColor: 'red', color: '#fff' }}
                                >   
                                    <DeleteOutline />
                                </button>  
                            </div>
                        </motion.div>
                        <div style={styles.line}></div>
                    </>
                    
                    ))}
                </div>
                <div>
                    <p>Total Price: {total}</p>
                </div>
                <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                    <Button
                    variant="contained"
                    sx={{ backgroundColor: buttonsBgColor, flex: 1, height: '40px', fontSize: isMobile ? '13px' : '16px' }}
                    onClick={resetBookCart}
                    disabled = {isReset}
                    >
                    {isReset ? <CircularLoader size={10} /> : 'Reset Cart' } 
                    </Button>
                    <Button
                    variant="contained"
                    sx={{ backgroundColor: 'green', flex: 1, height: '40px', fontSize: isMobile ? '13px' : '16px' }}
                    onClick={handleSubmit}
                    disabled={isLoading}
                    >
                    {isLoading ? <CircularLoader size={10} /> : 'Checkout'}
                    </Button>
                </div>
            </div>        

        </motion.div>
        
        
      </motion.div>
    </motion.div>
  );
};

const styles = {
    middle: {
        backgroundColor: '#242A4B',
        borderTopLeftRadius: '50px',
        height: '100vh'
    },
    middleMain: {
        width: '90%',
        margin: '3% auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        color: '#fff'
    },
    back: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '.2rem',
        color: '#fff',
        cursor: 'pointer'
    },
    line: {
        width: '100%',
        height: '1px',
        backgroundColor: '#acadac',
        opacity: '0.2'
    },
    imageContainer: {
        width: '100px',
        height: '120px',
        position: 'relative'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '10px'
    },
    bookNameContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem',
    },
    bookName: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    bookPrice: {
        fontSize: '0.8rem',
        color: '#acadac'
    },
    quantityContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4rem',
    },
    quantity: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50px',
        height: '50px',
        borderRadius: '5px',
        border: 'none',
        color: '#fff'
    }
}


export default BooksCart;




  

