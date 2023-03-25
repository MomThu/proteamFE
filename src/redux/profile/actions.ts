/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api/request';
import url from 'api/url';
import { getMessageError } from 'utils/common';
import { Profile } from './type';

// get profile
export const actionGetProfile = createAsyncThunk(
  'user/actionGetProfile',
  async () => {
    try {
      const { data } = await api.get<BaseResponse<Profile>>(url.profile);      
      return data.data;
    } catch (error: any) {
      throw new Error(getMessageError(error));
    }
  }
);

// update profile
export const actionUpdateProfile = createAsyncThunk(
  'user/actionUpdateProfile',
  async (payload: Profile, { rejectWithValue }) => {
    try {
      const { data } = await api.patch<BaseResponse<UserResponse>>(url.profile, payload);
      if (data.ref) throw rejectWithValue(data);
      return data.data;
    } catch (error: any) {
      if (error?.ref) throw rejectWithValue(error);
      throw new Error(getMessageError(error));
    }
  }
);


