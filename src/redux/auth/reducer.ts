import { createReducer } from '@reduxjs/toolkit';
import { removeAllStorage, setDataStorage, STORAGE_KEY } from 'utils/storage';
import { actionAuthLogin, actionAuthLogout } from './actions';

interface AuthState {
  token?: string;
  userInfo: UserInfo;
}

const initState: AuthState = {
  token: '',
  userInfo: {},
};

const authReducer = createReducer(initState, (builder) => {
  builder.addCase(actionAuthLogout.fulfilled, (state) => {
    state.token = '';
    state.userInfo = {};

    removeAllStorage();
  });
  builder.addCase(actionAuthLogin.fulfilled, (state, action) => {
    state.token = action.payload.token;
    state.userInfo = action.payload;

    setDataStorage(STORAGE_KEY.ACCESS_TOKEN, action.payload.token);
    setDataStorage(STORAGE_KEY.USER_INFO, action.payload);
  });
});

export default authReducer;
