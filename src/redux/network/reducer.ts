import { createReducer } from '@reduxjs/toolkit';
import { actionGetFriend, actionGetRequestFriend } from './actions';
import { NetworkState } from './type';

const initState: NetworkState = {
  friends: [],
  requests: [],
};

const networkReducer = createReducer(initState, (builder) => {
  builder.addCase(actionGetFriend.fulfilled, (state, action) => {    
    state.friends = action.payload;
  });
  builder.addCase(actionGetRequestFriend.fulfilled, (state, action) => {    
    state.requests = action.payload;
  });
});

export default networkReducer;
