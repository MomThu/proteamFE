const url = {
  // auth
  login: '/auth/login',
  logout: '/auth/logout',
  getGoogleLoginLink: '/auth/google-login-link',
  loginWithGoogle: '/auth/google-login',
  resetPassword: 'auth/reset-password',
  forgottenPassword: 'auth/reset-password-link',
  changePassword: 'auth/change-password',

  // profile
  profile: '/user/profile',
  skills: '/user/skills',
  profileSkills: '/user/profile/skills',
  updateProfileSkills: '/user/profile/update-skills',

  // network
  friends: '/user/friends',
  requests: '/user/requests',
  requestFriend: '/user/friend-request',
  acceptFriend: '/user/accept-friend',
  unfriend: '/user/unfriend',
  searchUser: '/user/search',

  // post
  allPosts: '/posts/all',
  post: '/posts',
  filterPost: '/posts/search',
  allPostsUser: '/posts/user',

  // chat
  allConversation: '/chats/conversation/get-by-user-id',
  // statistic
  allStats: 'stats/user_stats',
  gpaStats: 'stats/gpa',
  schoolStats: 'stats/school',
  skillStats: 'stats/skill',
};

export default url;
