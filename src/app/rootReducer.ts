import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'redux/auth/reducer';
import networkReducer from 'redux/network/reducer';
import postReducer from 'redux/post/reducer';
import userReducer from 'redux/profile/reducer';
import chatReducer from 'redux/chat/reducer';
import notificationReducer from 'redux/notification/reducer';
import statsReducer from 'redux/statistic/reducer';

const createRootReducer = () => {
  return combineReducers({
    auth: authReducer,
    user: userReducer,
    network: networkReducer,
    post: postReducer,
    chat: chatReducer,
    stats: statsReducer,
    noti: notificationReducer,
  });
};

export default createRootReducer;
