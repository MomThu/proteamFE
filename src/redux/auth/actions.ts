/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api/request';
import url from 'api/url';
import { getMessageError } from 'utils/common';
import { AuthLogin } from './type';

// login
export const actionAuthLogin = createAsyncThunk(
  'auth/actionAuthLogin',
  async (payload: AuthLogin, { rejectWithValue }) => {
    try {
      const { data } = await api.post<BaseResponse<UserResponse>>(url.login, payload);
      if (data.ref) throw rejectWithValue(data);  
      return data.data;
    } catch (error: any) {
      if (error?.ref) throw rejectWithValue(error);
      throw new Error(getMessageError(error));
    }
  }
);

// logout
export const actionAuthLogout = createAsyncThunk(
  'auth/actionAuthLogout',
  async () => {
    try {
      const { data } = await api.post<BaseResponse<any>>(url.logout);
      return data;
    } catch (error: any) {
      throw new Error(getMessageError(error));
    }
  }
);

// set info user
export const AUTH_SET_INFO_USER = 'AUTH_SET_INFO_USER';
export const AUTH_SET_ACCESS_TOKEN = 'AUTH_SET_ACCESS_TOKEN';

export const actionAuthSetInfoUser = createAction<UserInfo>(AUTH_SET_INFO_USER);
export const actionAuthSetAccessToken = createAction<string>(AUTH_SET_ACCESS_TOKEN);


