import React from 'react'
import './App.css'

import Navigations from './route/Navigations';
import { Toaster } from 'react-hot-toast';
import { bgColor, buttonsBgColor, HomeBgColor } from './constants/Colors';


const App = () => {
  return (
      
        <div className="App">
          <Toaster position='top-right'  
            toastOptions={{
              duration: 2000, 
              style: { 
                backgroundColor: bgColor, 
                color: '#fff',
                fontSize: '12px'
              }
            }}
          />
          <Navigations />

        </div>
     
  )
}

export default App