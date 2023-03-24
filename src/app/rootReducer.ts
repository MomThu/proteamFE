import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'redux/auth/reducer';
import userReducer from 'redux/profile/reducer';

const createRootReducer = () => {
  return combineReducers({
    auth: authReducer,
    user: userReducer,
  });
};

export default createRootReducer;
