import { createReducer } from '@reduxjs/toolkit';
import { actionGetProfile } from './actions';

interface AuthState {
  profile: Profile;
}

const initState: AuthState = {
  profile: {},
};

const userReducer = createReducer(initState, (builder) => {
  builder.addCase(actionGetProfile.fulfilled, (state, action) => {
    state.profile = action.payload;
  });
});

export default userReducer;
