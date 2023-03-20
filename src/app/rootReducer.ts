import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'redux/auth/reducer';

const createRootReducer = () => {
  return combineReducers({
    auth: authReducer,
  });
};

export default createRootReducer;
