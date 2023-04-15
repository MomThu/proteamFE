import { createReducer } from '@reduxjs/toolkit';
import { actionGetPost, actionGetAllPosts, actionGetAllPostsUser } from './actions';
import { PostState } from './type';

const initState: PostState = {
  allPosts: [],
  allUserPosts: [],
  post: {},
};

const postReducer = createReducer(initState, (builder) => {
  builder.addCase(actionGetPost.fulfilled, (state, action) => {    
    state.post = action.payload;
  });
  builder.addCase(actionGetAllPosts.fulfilled, (state, action) => {    
    state.allPosts = action.payload;
  });
  builder.addCase(actionGetAllPostsUser.fulfilled, (state, action) => {    
    state.allUserPosts = action.payload;
  });
});

export default postReducer;
