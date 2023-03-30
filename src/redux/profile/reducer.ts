import { createReducer } from '@reduxjs/toolkit';
import { actionGetProfile, actionGetProfileSkills, actionGetSkills, actionGetUserProfile } from './actions';
import { UserState } from './type';

const initState: UserState = {
  profile: {},
  userProfile: {},
  skills: [],
  profileSkill: [],
};

const userReducer = createReducer(initState, (builder) => {
  builder.addCase(actionGetProfile.fulfilled, (state, action) => {    
    state.profile = action.payload;
  });
  builder.addCase(actionGetUserProfile.fulfilled, (state, action) => {    
    state.userProfile = action.payload;
  });
  builder.addCase(actionGetSkills.fulfilled, (state, action) => {    
    state.skills = action.payload;
  });
  builder.addCase(actionGetProfileSkills.fulfilled, (state, action) => {    
    state.profileSkill = action.payload;
  });
});

export default userReducer;
