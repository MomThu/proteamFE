/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api/request';
import url from 'api/url';
import { getMessageError } from 'utils/common';

// get all stats
export const actionGetStatsAll = createAsyncThunk('stats/actionGetStatsAll', async () => {
  try {
    const { data } = await api.get<any>(url.allStats);
    return data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});

// get gpa stats
export const actionGetStatsGpa = createAsyncThunk(
  'stats/actionGetStatsGpa',
  async (payload?: any) => {
    try {
      const { data } = await api.get<any>(`${url.gpaStats}`, {
        params: {
          school: payload?.school || null,
          major: payload?.major || null,
          skill: payload?.skill || null,
        }
      });
      return data;
    } catch (error: any) {
      throw new Error(getMessageError(error));
    }
  }
);

// get school stats
export const actionGetStatsSchool = createAsyncThunk(
  'stats/actionGetStatsSchool',
  async (payload?: any) => {
    try {
      const { data } = await api.get<any>(`${url.schoolStats}`, {
        params: {
          school: payload?.school || null
        }
      });
      return data;
    } catch (error: any) {
      throw new Error(getMessageError(error));
    }
  }
);

// get skill stats
export const actionGetStatsSkill = createAsyncThunk(
  'stats/actionGetStatsSkill',
  async (payload?: any) => {
    try {
      const { data } = await api.get<any>(`${url.skillStats}`, {
        params: {
          school: payload?.school || null,
          major: payload?.major || null,
          hoc_luc: payload?.hoc_luc || null,
        }
      });
      return data;
    } catch (error: any) {
      throw new Error(getMessageError(error));
    }
  }
);

