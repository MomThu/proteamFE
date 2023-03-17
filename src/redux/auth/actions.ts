/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api/request';
import url from 'api/url';
import { getMessageError } from 'utils/common';
import { AuthLogin, AuthLogout } from './type';

export const actionAuthLogin = createAsyncThunk(
  'auth/actionAuthLogin',
  async (payload: AuthLogin, { rejectWithValue }) => {
    try {
      const { data } = await api.post<BaseResponse<UserInfo>>(url.login, payload);
      if (data.ref) throw rejectWithValue(data);

      return data.data;
    } catch (error: any) {
      if (error?.ref) throw rejectWithValue(error);
      throw new Error(getMessageError(error));
    }
  }
);
export const actionAuthLogout = createAsyncThunk(
  'auth/actionAuthLogout',
  async (payload: AuthLogout, { rejectWithValue }) => {
    try {
      const { data } = await api.post<BaseResponse<any>>(url.logout, payload);
      if (data.ref) throw rejectWithValue(data);

      return data.data;
    } catch (error: any) {
      if (error?.ref) throw rejectWithValue(error);
      throw new Error(getMessageError(error));
    }
  }
);

