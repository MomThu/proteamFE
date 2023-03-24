/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api/request';
import url from 'api/url';
import { getMessageError } from 'utils/common';
import { Profile } from './type';

// login
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


