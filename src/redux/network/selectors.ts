import { RootState } from 'app/store';

export const selectorFriends = (state: RootState): User.Profile[] => {
  return state.network?.friends;
};

export const selectorRequests = (state: RootState): User.RequestFriend[] => {
  return state.network?.requests;
};

export const selectorSearchUsers = (state: RootState): User.Profile[] => {
  return state.network?.searchUsers;
};

