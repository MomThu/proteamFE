import { RootState } from 'app/store';

export const selectorProfile = (state: RootState): User.Profile => {
  return state.user?.profile;
};

export const selectorUserProfile = (state: RootState): User.Profile => {
  return state.user?.userProfile;
};

export const selectorSkills = (state: RootState): User.Skill[] => {
  return state.user?.skills;
};

export const selectorProfileSkills = (state: RootState): User.Skill[] => {
  return state.user?.profileSkill;
};
