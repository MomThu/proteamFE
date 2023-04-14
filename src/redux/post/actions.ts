/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api/request';
import url from 'api/url';
import { getMessageError } from 'utils/common';
import { CreatePost } from './type';

// get post
export const actionGetAllPostsUser = createAsyncThunk('post/actionGetAllPostsUser', async () => {
  try {
    const { data } = await api.get<Post.Post[]>(url.allPostsUser);
    return data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});

// get post by id
export const actionGetPost = createAsyncThunk('post/actionGetPost', async (payload: { id: number }) => {
  try {
    const { data } = await api.get<Post.Post>(`${url.post}/${payload?.id}`, {
      params: {
        id: payload.id,
      },
    });
    return data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});

// update post
export const actionUpdatePost = createAsyncThunk('post/actionUpdatePost', async (payload: any, { rejectWithValue }) => {
  try {
    const { data } = await api.patch<any>(url.post, payload, {
      params: {
        post_id: payload.post_id,
      },
    });
    return data;
  } catch (error: any) {
    if (error?.message) throw rejectWithValue(error);
    throw new Error(getMessageError(error));
  }
});

// create post
export const actionCreatePost = createAsyncThunk(
  'post/actionCreatePost',
  async (payload: CreatePost, { rejectWithValue }) => {
    try {
      const { data } = await api.post<Post.Post>(url.post, payload);
      return data;
    } catch (error: any) {
      if (error?.message) throw rejectWithValue(error);
      throw new Error(getMessageError(error));
    }
  }
);

// delete post
export const actionDeletePost = createAsyncThunk(
  'post/actionDeletePost',
  async (payload: { post_id?: number }, { rejectWithValue }) => {
    try {
      const { data } = await api.delete<any>(url.post, { params: payload });
      return data;
    } catch (error: any) {
      if (error?.message) throw rejectWithValue(error);
      throw new Error(getMessageError(error));
    }
  }
);

// get post
export const actionGetAllPosts = createAsyncThunk('post/actionGetAllPosts', async () => {
  try {
    const { data } = await api.get<Post.Post[]>(url.allPosts);
    return data;
  } catch (error: any) {
    throw new Error(getMessageError(error));
  }
});

// get all posts
export const actionFilterPost = createAsyncThunk('post/actionFilterPost', async (payload: any, { rejectWithValue }) => {
  try {
    const { data } = await api.post<Post.Post[]>(url.filterPost, payload);
    return data;
  } catch (error: any) {
    if (error?.message) throw rejectWithValue(error);
    throw new Error(getMessageError(error));
  }
});
