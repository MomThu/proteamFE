import { createReducer } from '@reduxjs/toolkit';
import { actionGetFriend, actionGetRequestFriend, actionSearchUser } from './actions';
import { NetworkState } from './type';

const initState: NetworkState = {
  friends: [],
  requests: [],
  searchUsers: [],
  hasMoreSearch: true,
};

const networkReducer = createReducer(initState, (builder) => {
  builder.addCase(actionGetFriend.fulfilled, (state, action) => {
    state.friends = action.payload;
  });
  builder.addCase(actionGetRequestFriend.fulfilled, (state, action) => {
    state.requests = action.payload;
  });
  builder.addCase(actionSearchUser.fulfilled, (state, action) => {
    // let setHasMore;
    // if (action.payload !== undefined) {
    //   setHasMore = action.payload.length !== 0 ? true : false;
    // } else {
    //   setHasMore = false;
    // }
    // state.searchUsers = state.hasMoreSearch !== true ? state.searchUsers : state.searchUsers.concat(action.payload);
    // state.hasMoreSearch = setHasMore;
    state.searchUsers = action.payload;
  });
});

export default networkReducer;
