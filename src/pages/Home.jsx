import React, { useState, useEffect, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import UserProfile from '../components/UserProfile';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-web';
import Animation from '../assets/Book-Animation.json'; 
import { bgColor, buttonsBgColor, searchPlaceHolder } from '../constants/Colors';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios'
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import localStorage from 'redux-persist/es/storage';


const Home = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const [items, setItems] = useState([
    { id: 1, title: 'Bald Bearded Boss',date: '24-05-2023', author: 'George Gosling', rating: 2.5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkoQ7a8RHWRwj8hrha4KJERrAAPW3RmSvtTw&s', price: '$10' },
    { id: 2, title: 'Hello', rating: 3,image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkoQ7a8RHWRwj8hrha4KJERrAAPW3RmSvtTw&s', price: '$15' },
    { id: 3, title: 'Bald Bearded Boss',rating: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkoQ7a8RHWRwj8hrha4KJERrAAPW3RmSvtTw&s', price: '$20' },
    { id: 4, title: 'Bald Bearded Boss', rating: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkoQ7a8RHWRwj8hrha4KJERrAAPW3RmSvtTw&s', price: '$25' },
    { id: 5, title: 'Bald Bearded Boss',rating: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkoQ7a8RHWRwj8hrha4KJERrAAPW3RmSvtTw&s', price: '$30' },
    { id: 6, title: 'Bald Bearded Boss',rating: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkoQ7a8RHWRwj8hrha4KJERrAAPW3RmSvtTw&s', price: '$35' },
    { id: 7, title: 'Bald Bearded Boss',rating: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkoQ7a8RHWRwj8hrha4KJERrAAPW3RmSvtTw&s', price: '$20' },
    { id: 8, title: 'Bald Bearded Boss',rating: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkoQ7a8RHWRwj8hrha4KJERrAAPW3RmSvtTw&s', price: '$25' },
    { id: 9, title: 'Bald Bearded Boss',rating: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkoQ7a8RHWRwj8hrha4KJERrAAPW3RmSvtTw&s', price: '$30' },
    { id: 10, title: 'Bald Bearded Boss',rating: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkoQ7a8RHWRwj8hrha4KJERrAAPW3RmSvtTw&s', price: '$35' },
  ]);

  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  
  // function to search for items
  const searchBooks = (text) => {
    setSearch(text);
    if (text === '') {
      setFilteredItems([]);
    } else {
      const filtered = items.filter((item) => {
        return item.title.toLowerCase().includes(text.toLowerCase());
      });
      setFilteredItems(filtered);
    }
  };

  const onItemClick = (id) => {
    const selectedItem = items.find(item => item.id === id);
    console.log("You clicked on this button");
    navigate(`/book-details/${id}`, { state: { item: selectedItem } });
  };

  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setScrollWidth(scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth);
    }
  }, [filteredItems, items]);

  useEffect(() => {
    // Load Lottie animation
    const animationContainer = document.querySelector('.lottie');
    if (animationContainer) {
      Lottie.loadAnimation({
        container: animationContainer,
        animationData: Animation,
        loop: true,
        autoplay: true,
      });
    }
  }, []);


  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = scrollContainerRef.current;
        console.log(`scrollTop: ${scrollTop}, clientHeight: ${clientHeight}, scrollHeight: ${scrollHeight}`);
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
      setScrollWidth(scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  //react slick settings 
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.8,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 1
        }
      },

      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1
        }
      },

      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: '-100%' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      style={{
        display: !isMobile && 'grid',
        gridTemplateColumns: isMobile ? 'none' : 'auto 20vw',
        overflow: isMobile ? 'scroll' : 'hidden',
      }}
    >
      <motion.div
        className="middle"
        style={{...styles.middle }}

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
          <SearchBar search={search} setSearch={searchBooks} placeholder={searchPlaceHolder} />

          <div style={{overflowY: 'scroll', height: '100vh'}} ref = {scrollContainerRef}>
            <motion.div
              className="information-container"
              style={{...styles.informationContainer, 
                flexDirection: isMobile ? 'column-reverse' : '',
                padding: isMobile ? '15px' : '15px',
              }}
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
            >
              <div className="user-info"
                style={{...styles.userInfo, 
                  width: isMobile ? '100%': '', 
                  marginTop: isMobile ? '20px' : ''}}
                >

                <h3 style={{ fontSize: isMobile ? '20px' : '', textAlign: 'left'}}>Hi, Reader </h3>

                <p style={{textAlign: 'left', color: '#fff' }}>Here is a customized world of books for you</p>
                <div className="button" style={styles.button} 
                  onClick={() => navigate('/all-books')}
                >
                  <p style={{ color: '#fff' }}>Browse All Books</p>
                </div>
              </div>
              <div className="lottie" 
                style={{ width: isMobile ? '200px' : '300px', height: '200px', border: '0.1px solid rgba(255,288,255,0.1)', borderRadius: '10px' }} 
              />
            </motion.div>
            {search ? (
              <motion.div
                className="search-results"
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 100, damping: 20 }}
              >
                <p style={{ marginTop: '20px', color: '#fff' }}>Searched Results</p>
                <motion.div style={{paddingBottom: '100px'}}>
                  {filteredItems.length > 0 ? (
                    <Slider {...settings}>
                      {filteredItems.map(item => (
                        <div>
                          <BookCard
                            key={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            author = {item.author}
                            {...item}
                            onClick={() => onItemClick(item.id)}
                          />
                        </div> 
                       
                      ))}
                    </Slider>
                  ) : (
                    <motion.div style={{ ...styles.scrollMenuContainer}}>
                      <motion.div
                        style={{ width: '100%' }}
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0, type: 'spring', stiffness: 100, damping: 20 }}
                      >
                        <p style={{ color: '#fff', textAlign: 'center' }}>Results not found</p>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className="recommend"
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 100, damping: 20 }}
              >
                <p style={{ margin: '20px 0px 20px', textAlign: 'left', color: '#fff' }}>Recommended For You</p>
                <div style={{paddingBottom: '150px'}}>
                      <Slider {...settings}>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      style={styles.scrollMenuContainer}
                      initial={{ opacity: 0, x: '-100%' }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0, type: 'spring', stiffness: 100, damping: 20 }}
                    >
                       <div>
                          <BookCard
                            key={item.id}
                            title={item.title}
                            image={item.image}
                            rating={item.rating}
                            price={item.price}
                            author = {item.author}
                            {...item}
                            onClick={() => onItemClick(item.id)}
                          />
                        </div> 
                       
                    </motion.div>
                  ))}
                </Slider>
                </div>
                
              </motion.div>
            )}

          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="left"
        initial={{ opacity: 0, x: '-100%' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 100, damping: 20 }}
      >
        <UserProfile />
      </motion.div>
    </motion.div>
  );
}

const styles = {
  middle: {
    backgroundColor: '#242A4B',
    borderTopLeftRadius: '50px',
    maxHeight: '800vh'
  },
  middleMain: {
    width: '90%',
    margin: '3% auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  informationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: buttonsBgColor,
    borderRadius: '10px',
    padding: '25px',
  },
  userInfo: {
    width: '60%',
  },
  button: {
    width: '150px',
    height: '45px',
    marginTop: '20px',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor,
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },

};

export default Home;
