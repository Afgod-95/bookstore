import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartReducer from './cartReducer';
import booksReducer from './booksReducer';
import usersReducer from './usersReducer';

// Combine all reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  book: booksReducer,
  user: usersReducer,
});

// Configuration for persistence
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Apply persistence to the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create and configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);
