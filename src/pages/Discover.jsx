import React, { useState, useEffect, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import UserProfile from '../components/UserProfile';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bgColor, buttonsBgColor, searchPlaceHolder } from '../constants/Colors';
import { useMediaQuery } from 'react-responsive';
import BooksCategoryContainer from '../components/BooksCategoryContainer';


const Discover = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const [items, setItems] = useState([
    { id: 1, title: 'Bald Bearded Boss',rating: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkoQ7a8RHWRwj8hrha4KJERrAAPW3RmSvtTw&s', price: '$10' },
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
        <div style={{width: isMobile ? '90%' : '70%', margin: isMobile ? '8% auto': '3% auto', alignSelf: 'flex-start'}}>
          <SearchBar search={search} setSearch={searchBooks} placeholder={searchPlaceHolder} />
        </div>
        <div style={{overflowY: 'scroll', height: '90vh'}} >
            <div 
              style={{
                display: 'flex', 
                flexDirection: 'row', 
                flexWrap: 'wrap', 
                gap: '1rem',
                width: '90%', 
                margin: 'auto', 
                paddingBottom: '50px'
              }} 
            >
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0, type: 'spring', stiffness: 100, damping: 20 }}
                  >
                    <BookCard
                      title={item.title}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                      onClick={() => onItemClick(item.id)}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div>
                    <motion.div
                      style={{width: '100%'}}
                      initial={{ opacity: 0, x: '-100%' }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0, type: 'spring', stiffness: 100, damping: 20 }}
                    >
                      
                      <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '15px'}}>
                        <BooksCategoryContainer />
                        <BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer />
                        <BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer /><BooksCategoryContainer />
                      </div>


                      

                    </motion.div>
                </motion.div>
              )}
          </div>
          
        </div>
         
  
      </motion.div>
    </motion.div>
  );
}

const styles = {
  middle: {
    backgroundColor: '#242A4B',
    borderTopLeftRadius: '50px',
    maxHeight: '100vh'
  },
  middleMain: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
};

export default Discover;
