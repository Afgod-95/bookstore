import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomeBgColor, bookPlaceHolder, buttonsBgColor, userPlaceHolder } from '../constants/Colors';
import AddUserModal from '../components/AddUserModal.jsx';
import EditUserModal from '../components/EditUserModal.jsx'; // Assuming you have created this component
import { useMediaQuery } from 'react-responsive';
import SearchBar from '../components/SearchBar.jsx';
import AddBookModal from '../components/AddBookModal.jsx';
import EditBookModal from '../components/EditBookModal.jsx';
import toast from 'react-hot-toast';

const TableComponent = () => {
  const initialBooks = [
    { id: 1, name: 'Book 1', selected: false, Author: 'Godwin 1', Description: 'Description 1', Category: 'Category 1', Image: '', Year: 2021, Price: '$20' },
    { id: 2, name: 'Books 2', selected: false, Author: 'Author 2', Description: 'Description 2', Category: 'Category 2', Image: '', Year: 2022, Price: '$25' },
    { id: 3, name: 'Baoked 3', selected: false, Author: 'Author 3', Description: 'Description 3', Category: 'Category 3', Image: '', Year: 2023, Price: '$30' },
    // Add more initial books as needed
  ];

  const initialUsers = [
    { id: 1, profile: 'User 1', selected: false, Username: 'User', Email: 'Description 1', Password: 'Category 1', },
    { id: 2, profile: 'User 2', selected: false, Username: 'Godwin 1', Email: 'Description 2', Password: 'Category 2', },
    { id: 3, profile: 'User 3', selected: false, Username: 'Hello', Email: 'Description 3', Password: 'Category 3', },
    { id: 3, profile: 'User 3', selected: false, Username: 'Qhsh', Email: 'Description 3', Password: 'Category 3', },
    { id: 2, profile: 'User 2', selected: false, Username: 'Godwin 1', Email: 'Description 2', Password: 'Category 2', },
    
    // Add more initial users as needed
  ];

  const [books, setBooks] = useState(initialBooks);
  const [users, setUsers] = useState(initialUsers);
  const [selectAll, setSelectAll] = useState(false);
  const [manage, setManage] = useState('Users');
  const [editUser, setEditUser] = useState(null);
  const [editBook, setEditBook] = useState(null);

  // Modal state for users
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  // Modal state for books
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const [searchBook, setSearchBook] = useState('')
  const [searchUser, setSearchUser] = useState('')
 
  useEffect(() => {
    // Bouncing animation when component initially renders
    const bounceAnimation = {
      scale: [1.1, 1],
      transition: {
        duration: 0.5,
        ease: 'linear',
      },
    };

   
    const buttons = document.querySelectorAll('.button.switch');
    buttons.forEach(button => {
      button.style.setProperty('transform-origin', 'center');
      button.animate(bounceAnimation);
    });

    // Cleaning up animation
    return () => {
      buttons.forEach(button => button.style.setProperty('transform', 'none'));
    };
  }, []);

  // Toggle selection of a single item
  const toggleSelect = (id, type) => {
    const listToUpdate = type === 'Books' ? books : users;
    const updatedList = listToUpdate.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );

    if (type === 'Books') {
      setBooks(updatedList);
      setSelectAll(updatedList.every(item => item.selected));
    } else {
      setUsers(updatedList);
      setSelectAll(updatedList.every(item => item.selected));
    }
  };

  //searching function for all books 
  const handleSearch = (text) => {
    if (manage === 'Books') {
      setSearchBook(text);
    } else {
      setSearchUser(text);
    }
  };
  

   // Filtered lists based on search input
   const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchBook.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.Username.toLowerCase().includes(searchUser.toLowerCase())
  );


  // Toggle selection of all  books items
  const toggleSelectAll = () => {
    const updatedBooks = books.map(item => ({ ...item, selected: !selectAll }));
    setBooks(updatedBooks);
    setSelectAll(!selectAll);
  };

  //toggle selection of all users
  const toggleUserSelectAll = () => {
    const updatedUsers = users.map(item => ({ ...item, selected: !selectAll }));
    setUsers(updatedUsers);
    setSelectAll(!selectAll);
  }

  // Delete selected items
  const deleteSelected = (type) => {
    if (type === 'Books') {
      const filteredBooks = books.filter(item => !item.selected);
      setBooks(filteredBooks);
      setSelectAll(false);
    } else {
      const filteredUsers = users.filter(item => !item.selected);
      setUsers(filteredUsers);
      setSelectAll(false);
    }
  };

 
 // Edit selected user
  const editSelectedUser = () => {
    const selectedUser = users.find(item => item.selected);
    if (selectedUser) {
      setEditUser(selectedUser);
      setSelectAll(false);
      setShowEditUserModal(true);
    } else {
      toast.error('Select a user to edit');
    }
  };

  // Edit selected book
  const editSelectedBook = () => {
    const selectedBook = books.find(item => item.selected);
    if (selectedBook) {
      setEditBook(selectedBook);
      setSelectAll(false);
      setShowEditBookModal(true);
    } else {
      toast.error('Select a book to edit');
    }
  };

  //


  return (
    <div className="homeContainer" style={{ backgroundColor: HomeBgColor, height: '100vh', borderTopLeftRadius: '50px' }}>
      <div style={{ display: 'flex', gap: '1rem', width: '90%', margin: isMobile ? '10% auto' : '3% auto' }}>
        <motion.button
          className={`switch ${manage === 'Books' ? 'button' : 'buy-button'}`}
          initial={{ opacity: 0, x: '-100%' }}
          style={{height: isMobile && '30px'}}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, type: 'spring', stiffness: 100, damping: 20 }}
          onClick={() => setManage('Users')}
        >
          <p style={{ color: '#fff' }}>Manage Users</p>
        </motion.button>
        <motion.button
          className={`switch ${manage === 'Users' ? 'button' : 'buy-button'}`}
          style={{height: isMobile && '30px'}}
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 100, damping: 20 }}
          onClick={() => setManage('Books')}
        >
          <p style={{ color: '#fff' }}>Manage Books</p>
        </motion.button>
      </div>
      
      <div style={{ width: isMobile ? '90%' : '70%', margin: isMobile ? 'auto' : 'auto 55px', paddingBottom: '15px', alignSelf: 'flex-start'}}>
        <SearchBar 
          placeholder={manage === 'Books' ? bookPlaceHolder  : userPlaceHolder}
          onChange={handleSearch}
          search={manage === 'Books' ? searchBook : searchUser}
          setSearch={manage === 'Books' ? setSearchBook : setSearchUser}
        />
      </div>

      <motion.div
        className="container"
        style={{ width: '90%', margin: '2% auto', padding: isMobile ? '15px' : '30px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: buttonsBgColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="table-title" style={{textAlign: 'start', fontSize: isMobile && '1rem'}}>{`${manage} Management System`}</h2>
        <AnimatePresence>
          <motion.div
            key={manage}
            style={{ maxHeight: isMobile ? '70vh' : '50vh', overflow: 'auto' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          >
            {manage === 'Books' && (
              <>
                <div className="button-group" style={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'center', gap: '1rem', marginBottom: '20px',}}>
                  <motion.button
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3, type: 'spring', stiffness: 100, damping: 20 }}
                    className="button delete"
                    onClick={() => deleteSelected(manage)}
                  >
                    Delete Selected
                  </motion.button>
                  <motion.button
                    className="button edit"
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4, type: 'spring', stiffness: 100, damping: 20 }}
                    onClick={() => editSelectedBook('Books')}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, type: 'spring', stiffness: 100, damping: 20 }}
                    className="button add"
                    onClick={() => setShowAddBookModal(true)}
                  >
                    Add
                  </motion.button>
                </div>
                <motion.table
                  key="books"
                  className="table"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                
                >
                
                    <thead>
                      <tr >
                        <th>
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={toggleSelectAll}
                          />
                        </th>
                        <th>Book ID</th>
                        <th>Book Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Year</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                  
                 
                    <tbody >
                      {filteredBooks.map(item => (
                        <tr key={item.id} className={item.selected ? 'selected' : ''}>
                          <td>
                            <input
                              type="checkbox"
                              checked={item.selected}
                              onChange={() => toggleSelect(item.id, 'Books')}
                            />
                          </td>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.Author}</td>
                          <td>{item.Description}</td>
                          <td>{item.Category}</td>
                          <td><img src={item.Image} alt="" /></td>
                          <td>{item.Year}</td>
                          <td>{item.Price}</td>
                        </tr>
                      ))}
                    </tbody>

                
                 
                </motion.table>
              </>
            )}
            {manage === 'Users' && (
              <>
                <div className="button-group" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end', alignContent: 'center', gap: '1rem',  }}>
                  <motion.button
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3, type: 'spring', stiffness: 100, damping: 20 }}
                    className="button delete"
                    onClick={() => deleteSelected(manage)}
                  >
                    Delete Selected
                  </motion.button>
                  <motion.button
                    className="button edit"
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4, type: 'spring', stiffness: 100, damping: 20 }}
                    onClick={() => editSelectedUser(manage)}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, type: 'spring', stiffness: 100, damping: 20 }}
                    className="button add"
                    onClick={() => setShowAddUserModal(true)}
                  >
                    Add
                  </motion.button>
                </div>
                <motion.table
                  key="users"
                  className="table"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={toggleUserSelectAll}
                        />
                      </th>
                      <th>User ID</th>
                      <th>Profile</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Password</th>
                    </tr>
                  </thead>
                
                
                  <tbody>
                    {filteredUsers.map(item => (
                      <tr key={item.id} className={item.selected ? 'selected' : ''}>
                        <td>
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => toggleSelect(item.id, 'Users')}
                          />
                        </td>
                        <td>{item.id}</td>
                        <td><img src={item.profile} alt="" /></td>
                        <td>{item.Username}</td>
                        <td>{item.Email}</td>
                        <td>{item.Password}</td>
                      </tr>
                    ))}
                  </tbody>
                 
                </motion.table>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showAddUserModal && (
          <AddUserModal
            isOpen={showAddUserModal}
            onClose={() => setShowAddUserModal(false)}
          />
        )}

        {showEditUserModal && manage === 'Users' && editUser && (
          <EditUserModal
            user={editUser}
            isOpen={showEditUserModal}
            onClose={() => setShowEditUserModal(false)}
          />
        )}

        {showAddBookModal  && (
          <AddBookModal
            isOpen={showAddBookModal}
            onClose={() => setShowAddBookModal(false)}
          />
        )}

        {showEditBookModal && manage === 'Books' && editBook && (
          <EditBookModal
            book ={editBook}
            isOpen ={showEditBookModal}
            onClose={() => setShowEditBookModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TableComponent;
