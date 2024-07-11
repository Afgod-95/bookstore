import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Login from '../pages/auth/Login';
import Home from '../pages/Home';
import Discover from '../pages/Discover';
import Settings from '../pages/Settings';
import Book_Details from '../pages/Book_Details';
import Create from '../pages/Create';
import AllBooks from '../pages/AllBooks';
import OnLoadPage from '../pages/OnLoadPage';
import BooksCart from '../pages/BooksCart';


const Navigations = () => {
    const location = useLocation();
    const isLogin = location.pathname === '/login';
    const isWelcomeScreen = location.pathname === '/'

    return (
      <>
          
          {!isLogin && !isWelcomeScreen && (
            <>
                <Sidebar>
                    <Routes>
                        <Route path="/dashboard" element={<Home />} />
                        <Route path="/discover" element={<Discover />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path='/book-details/:id' element = { <Book_Details/> } />
                        <Route path='/manage' element = { <Create/> } />
                        <Route path='/all-books' element = { <AllBooks/> } />
                        <Route path='/cart' element = { <BooksCart/> } />
                    </Routes>
                </Sidebar>
            </>
                
                
            )}
            
            <Routes>
                <Route path='/' element = { <OnLoadPage />} />
                <Route path="/login" element={<Login />} />
                
            </Routes>
      
      
      </>
      
    );
}

export default Navigations;
