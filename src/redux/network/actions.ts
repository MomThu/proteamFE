/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api/request';
import url from 'api/url';
import { getMessageError } from 'utils/common';

// get friend
export const actionGetFriend = createAsyncThunk('user/actionGetFriend', async () => {
  try {
    const { data } = await api.get<User.Profile[]>(url.friends);
    return data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});

// get request friends
export const actionGetRequestFriend = createAsyncThunk('user/actionGetRequestFriend', async () => {
  try {
    const { data } = await api.get<User.RequestFriend[]>(url.requests);
    return data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});

// request friend
export const actionRequestFriend = createAsyncThunk(
  'user/actionRequestFriend',
  async (payload: { friend_id: number }) => {
    try {
      const { data } = await api.post<any>(url.requestFriend, payload);
      return data;
    } catch (error: any) {
      throw new Error(getMessageError(error));
    }
  }
);

// accept friend
export const actionAcceptFriend = createAsyncThunk(
  'user/actionAcceptFriend',
  async (payload: { id: number; status: number }) => {
    try {
      const { data } = await api.patch<any>(url.acceptFriend, payload);
      return data;
    } catch (error: any) {
      throw new Error(getMessageError(error));
    }
  }
);

// unfriend
export const actionUnFriend = createAsyncThunk('user/actionUnFriend', async (payload: { friend_id: number }) => {
  try {
    const { data } = await api.delete<any>(url.unfriend, { data: payload });
    return data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});

// request friend
export const actionSearchUser = createAsyncThunk('user/actionSearchUser', async (payload: any) => {
  try {
    const { data } = await api.post<any>(url.searchUser, payload);
    return data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});
