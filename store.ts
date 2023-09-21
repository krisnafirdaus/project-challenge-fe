import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    ui: uiReducer,
  },
});

export default store;
