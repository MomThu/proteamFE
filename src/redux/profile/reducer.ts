import { createReducer } from '@reduxjs/toolkit';
import { actionGetProfile } from './actions';

interface UserState {
  profile: Profile;
}

const initState: UserState = {
  profile: {},
};

const userReducer = createReducer(initState, (builder) => {
  builder.addCase(actionGetProfile.fulfilled, (state, action) => {
    state.profile = action.payload;
  });
});

export default userReducer;
