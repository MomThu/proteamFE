import { createReducer } from '@reduxjs/toolkit';
import { actionGetPost, actionGetAllPosts, actionGetAllPostsUser, actionFilterPost } from './actions';
import { PostState } from './type';

const initState: PostState = {
  allPosts: [],
  allUserPosts: [],
  post: {},
  filterPosts: [],
};

const postReducer = createReducer(initState, (builder) => {
  builder.addCase(actionGetPost.fulfilled, (state, action) => {    
    state.post = action.payload;
  });
  builder.addCase(actionGetAllPosts.fulfilled, (state, action) => {    
    state.allPosts = action.payload;
  });
  builder.addCase(actionFilterPost.fulfilled, (state, action) => {    
    state.filterPosts = action.payload;
  });
  builder.addCase(actionGetAllPostsUser.fulfilled, (state, action) => {    
    state.allUserPosts = action.payload;
  });
});

export default postReducer;
