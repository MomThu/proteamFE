/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api/request';
import url from 'api/url';
import { getMessageError } from 'utils/common';
import { NotificationListResponse } from './type';

export const getNotificationListByUserId = createAsyncThunk('notification/getNotificationList', async (id?: number) => {
  try {
    const { data } = await api.get<BaseResponse<NotificationListResponse>>(`${url.allNotification}/${id}`);
    return data.data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});
