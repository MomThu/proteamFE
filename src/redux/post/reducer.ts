import { createReducer } from '@reduxjs/toolkit';
import { actionGetPost, actionGetAllPosts } from './actions';
import { PostState } from './type';

const initState: PostState = {
  allPosts: [],
  post: {},
};

const postReducer = createReducer(initState, (builder) => {
  builder.addCase(actionGetPost.fulfilled, (state, action) => {    
    state.post = action.payload;
  });
  builder.addCase(actionGetAllPosts.fulfilled, (state, action) => {    
    state.allPosts = action.payload;
  });
});

export default postReducer;
