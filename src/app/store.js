import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import taskReducer from './taskReducer'


export default configureStore({
  // reducer: {
  //   state: taskReducer
  // },
  reducer: taskReducer  ,
  middleware: getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // по необходимости
});
