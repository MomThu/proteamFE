import { RootState } from 'app/store';

export const selectorUserInfo = (state: RootState): UserInfo => {
  return state.auth?.userInfo;
};
