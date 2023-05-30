/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api/request';
import url from 'api/url';
import { getMessageError } from 'utils/common';
import { ConversationListResponse, MessageResponse, CreateConversationResponse } from './type';

export const getConversationByUserId = createAsyncThunk('chat/getConversationList', async (id: number) => {
  try {
    const { data } = await api.get<BaseResponse<ConversationListResponse>>(`${url.allConversation}/${id}`);
    return data.data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});

export const createConversation = createAsyncThunk('chat/createConversation', async (info: ICreateConversation) => {
  try {
    const { data } = await api.post<BaseResponse<CreateConversationResponse>>(`${url.createConversation}`, info);
    return data.data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});

export const createMessage = createAsyncThunk('chat/createMessage', async (info: ICreateMessage) => {
  try {
    const { data } = await api.post<BaseResponse<MessageResponse>>(`${url.createMessage}`, info);
    return data.data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});
