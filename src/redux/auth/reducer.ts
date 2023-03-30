import { createReducer } from '@reduxjs/toolkit';
import { convertUserInfoInterface } from 'common/hepler';
import { removeAllStorage, setDataStorage, STORAGE_KEY } from 'utils/storage';
import {
  actionAuthLogin,
  actionAuthLogout,
  actionAuthSetAccessToken,
  actionAuthSetInfoUser,
  loginWithGoogle,
} from './actions';

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
    const userInfo = convertUserInfoInterface(action.payload.information);
    state.token = action.payload.accessToken?.token;
    state.userInfo = userInfo || {};
    setDataStorage(STORAGE_KEY.ACCESS_TOKEN, action.payload.accessToken?.token);
    setDataStorage(STORAGE_KEY.REFRESH_TOKEN, action.payload.refreshToken?.token);
    setDataStorage(STORAGE_KEY.USER_INFO, userInfo);
  });

  builder.addCase(actionAuthSetInfoUser, (state, action) => {
    state.userInfo = action.payload;
  });

  builder.addCase(actionAuthSetAccessToken, (state, action) => {
    state.token = action.payload;
  });

  builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
    const userInfo = convertUserInfoInterface(action.payload.information);
    state.token = action.payload.accessToken?.token;
    state.userInfo = userInfo || {};
    setDataStorage(STORAGE_KEY.ACCESS_TOKEN, action.payload.accessToken?.token);
    setDataStorage(STORAGE_KEY.REFRESH_TOKEN, action.payload.refreshToken?.token);
    setDataStorage(STORAGE_KEY.USER_INFO, userInfo);
  });
});

export default authReducer;
