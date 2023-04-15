export interface NetworkState {
  friends: User.Profile[],
  requests: User.RequestFriend[],
  searchUsers: User.Profile[],
}