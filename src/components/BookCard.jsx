import React from 'react'
import { bgColor, buttonsBgColor } from '../constants/Colors'
import BookRating from './BookRating'

//Parsing image, descriptions, price, author, rate, name

const BookCard = ({ image,  price, title, author, onClick, rating }) => {
  return (
    <div style={styles.container}>
        <div className="imageContainer" style={styles.imageContainer}>
            <img src= { image }  alt="/" style={styles.image}/>
        </div>
        <div className="details" style={styles.detail}>
            <div className="book" style={styles.book}>
                <div>
                    <p style = {{color: '#fff', fontSize: '15px', textAlign: 'left'}}>{title}</p>
                    <p style = {{color: '#acadac', fontSize: '13px', textAlign: 'left'}}>By | {author}</p>
                    <BookRating rating = {rating} />
                    <p style={{color: 'orange', textAlign: 'left'}}>Price: {price}</p>
                </div>
                <div className="buy-button" style={{width: '60px'}} onClick= { onClick } >
                  <p style={{color: '#fff',}}  >View</p>
                </div>
            </div>
        </div>
    </div>
  )
}

const styles = {
    container: {
        width: '180px',
        maxWidth: '200px',
        minHeight: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '15px',
        overflow: 'hidden'
    },

    imageContainer: {
        backgroundColor: bgColor,
        width: '100%',
        height: '180px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: '-50px'
    },

    image: {
        width: '100px',
        height: '120px',
        borderRadius: '5px',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
    },
    detail: {
        width: '100%',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: buttonsBgColor
    },
    book: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },  
}

export default BookCard