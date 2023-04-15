import { createReducer } from '@reduxjs/toolkit';
import { actionGetFriend, actionGetRequestFriend, actionSearchUser } from './actions';
import { NetworkState } from './type';

const initState: NetworkState = {
  friends: [],
  requests: [],
  searchUsers: [],
};

const networkReducer = createReducer(initState, (builder) => {
  builder.addCase(actionGetFriend.fulfilled, (state, action) => {    
    state.friends = action.payload;
  });
  builder.addCase(actionGetRequestFriend.fulfilled, (state, action) => {    
    state.requests = action.payload;
  });
  builder.addCase(actionSearchUser.fulfilled, (state, action) => {    
    state.searchUsers = action.payload;
  });
});

export default networkReducer;
