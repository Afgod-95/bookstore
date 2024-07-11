import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { buttonsBgColor, HomeBgColor } from '../constants/Colors';
import { CiBookmark } from "react-icons/ci";
import { BsEyeSlash } from "react-icons/bs";
import { IoBookOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addToCart } from '../react-redux/cartReducer';
import { hideBook, markAsRead, markAsUnread } from '../react-redux/booksReducer';
import BookRating from '../components/BookRating';

const Book_Details = () => {
    const location = useLocation();
    const { id } = useParams();
    const { item } = location.state || {};
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const [addedToCart, setAddedToCart] = useState(false);

    const goBack = () => {
        window.history.back();
    };

    const dispatch = useDispatch();
    const books = useSelector(state => state.book.books);
    const hiddenBooks = books.filter(book => book.hidden);
    const readBooks = books.filter(book => book.read);
    console.log(`Books Found: `, books)
    console.log(`Hidden Books: `, hiddenBooks)
    console.log(`Read Books: ${readBooks}`)


    // Adding item to cart
    const addBookToCart = (item) => {
        if (item) {
            dispatch(addToCart(item));
            setAddedToCart(true);
            toast.success('Item added to cart');
            console.log(item);
        } else {
            setAddedToCart(false);
            toast.error('Failed to Add to Cart');
        }
    };

    // Hide book function
    const hideBookFunction = (book) => {
        if (book) {
            dispatch(hideBook(book));
            toast.success('Book Hidden');
        } else {
            toast.error('Failed to Hide');
        }
    };

    // Mark book as read
    const markBookAsRead = (book) => {
        if (book) {
            toast.success('Marked Book As Read');
            dispatch(markAsRead(book));
        } else {
            toast.error('Failed to mark book as read');
        }
    };

    // Mark book as unread
    const markBookAsUnread = (book) => {
        if (book) {
            toast.success('Book marked as unread successfully');
            dispatch(markAsUnread(book));
        } else {
            toast.error('Failed to mark book as unread');
        }
    };

    return (
        <motion.div 
            style={{ background: HomeBgColor, borderTopLeftRadius: '40px', height: '100vh' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }} 
            transition={{ type: 'spring', stiffness: 100, damping: 20, bounce: 0.5 }}
        >
            <motion.div
              style={styles.container}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, bounce: 0.5 }}
            >
                <Header />
                <motion.div
                  style={styles.back}
                  onClick={goBack}
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, bounce: 0.5 }}
                >
                  <IoIosArrowBack />
                  <h4 style={{ fontSize: '1rem' }}>Back</h4>
                </motion.div>
                <motion.div
                  style={{ ...styles.bookDetailsContainer, width: isMobile ? '100%' : '82%', height: isMobile && '70vh', paddingBottom: isMobile && '100px', overflowY: isMobile && 'scroll' }}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, bounce: 0.5 }}
                >
                  <motion.div
                    className="image"
                    style={styles.imageContainer}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20, bounce: 0.5 }}
                  >
                    <img src={item?.image} alt="book" style={styles.image} />
                  </motion.div>
                  <motion.div
                    className="content"
                    style={{ ...styles.bookContentContainer, width: isMobile ? '100%' : '70%' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5, bounce: 0.5 }}
                  >
                    <motion.div
                      className="book-title"
                      style={{ display: 'flex', flexDirection: 'column', padding: isMobile ? '15px' : '40px', gap: '1rem' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5, bounce: 0.5 }}
                    >
                      <div style={{color: '#fff'}}>
                        <h4 style={styles.text}>{item?.title}</h4>
                        <BookRating rating={item?.rating}/>
                        <p style={{color: '#acadac'}}>By: {item?.author} | {item?.date}</p>
                      </div>
                      <div style={{ display: 'flex', gap: isMobile ? '.5rem' : '1rem', alignItems: 'center' }}>
                          <div className="button" style={{ cursor: 'none', height: isMobile && '30px' }}>
                              <p style={{ color: '#fff' }}>Price: {item?.price}</p>
                          </div>
                          <div className="button" style={{ cursor: 'none', maxWidth: '200px', height: isMobile && '30px' }}>
                              <p style={{ color: '#fff' }}>Cat:{item?.category}</p>
                          </div>
                      </div>
                      <p style={{ lineHeight: '25px', color: '#f2f2f2', fontFamily: 'sans-serif' }}>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut molestiae quidem, enim nihil nostrum temporibus tenetur, praesentium doloribus ut veniam necessitatibus! Porro, autem ipsa animi commodi fuga facere assumenda reiciendis.
                      </p>
                    </motion.div>
                    <div style={styles.buttonGroup}>
                        <div style={styles.buttons} onClick={() => hideBookFunction({ id: item?.id, ...item })}>
                            <BsEyeSlash 
                                style={{ ...styles.icons, fontSize: isMobile && '.8rem', width: isMobile && '15px' }} 
                            />
                            <p style={{ color: '#fff', fontSize: isMobile ? '10px' : '12px', textAlign: isMobile && 'center' }}>Hide</p>
                        </div>
                        <button style={{ ...styles.buttons, background: 'transparent' }} onClick={() => markBookAsRead({ id: item?.id, ...item })}>
                            <IoBookOutline 
                                style={{ ...styles.icons, fontSize: isMobile && '.8rem' }}
                            />
                            <p style={{ color: '#fff', fontSize: isMobile ? '10px' : '12px', textAlign: isMobile && 'center' }}>Mark As Read</p>
                        </button>
                        <button style={{ ...styles.buttons, borderRight: 'none', backgroundColor: addedToCart ? 'transparent' : 'orange' }} disabled={addedToCart}>
                            <p onClick={() => addBookToCart({ id: id, ...item })} style={{ color: '#fff', fontSize: isMobile ? '10px' : '12px', textAlign: isMobile && 'center' }}>
                                {addedToCart ? 'Added To Cart' : 'Add To Cart'}
                            </p>
                        </button>
                    </div>
                  </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        margin: 'auto',
        padding: '25px'
    },
    back: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '.2rem',
        color: '#fff',
        cursor: 'pointer'
    },
    bookDetailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap',
        margin: 'auto',
    },
    imageContainer: {
        position: 'relative',
        width: '150px',
        height: '200px'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: '15px',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
    },
    bookContentContainer: {
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        border: '.3px solid rgba(255,255,255, 0.1)',
        borderRadius: '10px',
    },
    text: {
        fontSize: '1.2rem',
        color: '#fff',
        textAlign: 'start'
    },
    buttonGroup: {
        width: '100%',
        backgroundColor: buttonsBgColor,
        position: 'relative',
        height: '50px',
        display: 'flex'
    },
    icons: {
        width: '20px',
        fontSize: '1.5rem',
        color: '#fff'
    },
    buttons: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '.3rem',
        borderRight: '.3px solid rgba(255,255,255, 0.1)',
        cursor: 'pointer'
    }
};

export default Book_Details;
