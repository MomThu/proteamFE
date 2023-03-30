/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api/request';
import url from 'api/url';
import { getMessageError } from 'utils/common';

// get profile
export const actionGetProfile = createAsyncThunk('user/actionGetProfile', async () => {
  try {
    const { data } = await api.get<User.Profile>(url.profile);
    return data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});

// update profile
export const actionUpdateProfile = createAsyncThunk(
  'user/actionUpdateProfile',
  async (payload: User.Profile, { rejectWithValue }) => {
    try {
      const { data } = await api.patch<User.Profile>(url.profile, payload);
      return data;
    } catch (error: any) {
      if (error?.message) throw rejectWithValue(error);
      throw new Error(getMessageError(error));
    }
  }
);

// get skills
export const actionGetSkills = createAsyncThunk('user/actionGetSkills', async () => {
  try {
    const { data } = await api.get<User.Skill[]>(url.skills);
    return data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});

// get user skills
export const actionGetProfileSkills = createAsyncThunk('user/actionGetProfileSkills', async () => {
  try {
    const { data } = await api.patch<User.Skill[]>(url.profileSkills);
    return data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});

// update profile skills
export const actionUpdateProfileSkills = createAsyncThunk(
  'user/actionUpdateProfileSkills',
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await api.patch<User.Skill>(url.updateProfileSkills, payload);
      return data;
    } catch (error: any) {
      if (error?.message) throw rejectWithValue(error);
      throw new Error(getMessageError(error));
    }
  }
);
