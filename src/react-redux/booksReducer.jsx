import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state for books
const initialStateBooks = {
    books: [],
};

// Asynchronous thunk action
export const resetBook = createAsyncThunk('book/resetBook', async (_, { dispatch }) => {
    dispatch(bookSlice.actions.clearBooks());
});

// Book slice
const bookSlice = createSlice({
    name: 'book',
    initialState: initialStateBooks,
    reducers: {
        setBook: (state, action) => {
            state.books = action.payload; // Correct: Replace the array with a new one
        },
        updateBook: (state, action) => {
            const { id, authorsName, image, title, description, price, category, year } = action.payload;
            const updatedBooks = state.books.map(book => {
                if (book.id === id) {
                    return { ...book, authorsName, image, title, description, price, category, year };
                }
                return book;
            });
            state.books = updatedBooks;
        },
        saveBook: (state, action) => {
            state.books = [...state.books, action.payload]; // Correct: Add a new book to the array
        },
        hideBook: (state, action) => {
            const { id } = action.payload;
            state.books = state.books.map(book =>
                book.id === id ? { ...book, hidden: true } : book
            );
        },
        showBook: (state, action) => {
            const { id } = action.payload;
            state.books = state.books.map(book =>
                book.id === id ? { ...book, hidden: false } : book
            );
        },
        markAsRead: (state, action) => {
            const { id } = action.payload;
            state.books = state.books.map(book =>
                book.id === id ? { ...book, read: true } : book
            );
        },
        markAsUnread: (state, action) => {
            const { id } = action.payload;
            state.books = state.books.map(book =>
                book.id === id ? { ...book, read: false } : book
            );
        },
        deleteBook: (state, action) => {
            const { id } = action.payload;
            state.books = state.books.filter(book => book.id !== id); // Correct: Filter out the deleted book
        },
        clearBooks: (state) => {
            state.books = []; // Correct: Clear the array
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetBook.fulfilled, (state) => {
            state.books = []; // Correct: Reset the array
        });
    },
});

// Exporting actions
export const {
    setBook,
    updateBook,
    saveBook,
    deleteBook,
    clearBooks,
    hideBook,
    showBook,
    markAsRead,
    markAsUnread,
} = bookSlice.actions;

export default bookSlice.reducer;
