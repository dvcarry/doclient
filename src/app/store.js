import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import habitsReducer from './habitsReducer';
import taskReducer from './taskReducer'


export default configureStore({
  reducer: {
    state: taskReducer,
    habits: habitsReducer
  },
  middleware: getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // по необходимости
});
