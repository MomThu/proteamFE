import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'redux/auth/reducer';
import networkReducer from 'redux/network/reducer';
import userReducer from 'redux/profile/reducer';

const createRootReducer = () => {
  return combineReducers({
    auth: authReducer,
    user: userReducer,
    network: networkReducer
  });
};

export default createRootReducer;
