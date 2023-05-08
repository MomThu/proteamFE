import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'redux/auth/reducer';
import networkReducer from 'redux/network/reducer';
import postReducer from 'redux/post/reducer';
import userReducer from 'redux/profile/reducer';
import statsReducer from 'redux/statistic/reducer';

const createRootReducer = () => {
  return combineReducers({
    auth: authReducer,
    user: userReducer,
    network: networkReducer,
    post: postReducer,
    stats: statsReducer,
  });
};

export default createRootReducer;
