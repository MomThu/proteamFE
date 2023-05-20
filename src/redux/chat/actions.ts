/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api/request';
import url from 'api/url';
import { getMessageError } from 'utils/common';
import { ConversationListResponse } from './type';

export const getConversationByUserId = createAsyncThunk('chat/getConversationList', async (id: number) => {
  try {
    const { data } = await api.get<BaseResponse<ConversationListResponse>>(`${url.allConversation}/${id}`);
    return data.data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});
