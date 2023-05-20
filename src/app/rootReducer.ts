import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'redux/auth/reducer';
import networkReducer from 'redux/network/reducer';
import postReducer from 'redux/post/reducer';
import userReducer from 'redux/profile/reducer';
import chatReducer from 'redux/chat/reducer';

const createRootReducer = () => {
  return combineReducers({
    auth: authReducer,
    user: userReducer,
    network: networkReducer,
    post: postReducer,
    chat: chatReducer,
  });
};

export default createRootReducer;
