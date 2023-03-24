import { RootState } from 'app/store';

export const selectorProfile = (state: RootState): Profile => {
  return state.user?.profile;
};
