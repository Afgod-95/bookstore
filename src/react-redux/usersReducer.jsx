import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define your async thunk
export const resetUser = createAsyncThunk('user/resetUser', async (_, { dispatch }) => {
    dispatch(userSlice.actions.setUser([]));
});

// Initial state for users
const initialState = {
    users: [],
}

// User slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.users = action.payload;
        },
        updateUser: (state, action) => {
            const { id, profileImage, username, email, password } = action.payload;
            const user = state.users.find(user => user.id === id );
            if (user) {
                user.profileImage = profileImage;
                user.username = username;
                user.email = email;
                user.password = password;
            }
        },

        updateUserProfileImage: (state, action) => {
            const { id, profileImage } = action.payload;
            const user = state.users.find(user => user.id === id)
            if (user) {
                user.profileImage = profileImage
            }
        },
        
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        clearUser: (state) => {
            state.users = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetUser.fulfilled, (state, action) => {
            state.users = action.payload; // Assuming payload is the updated user list
        });
    },
});

// Exporting actions
export const { setUser, updateUser, updateUserProfileImage, deleteUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
