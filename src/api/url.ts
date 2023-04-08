const url = {
  // auth
  login: '/auth/login',
  logout: '/auth/logout',
  getGoogleLoginLink: '/auth/google-login-link',
  loginWithGoogle: '/auth/google-login',
  resetPassword: 'auth/reset-password',
  forgottenPassword: 'auth/reset-password-link',

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

  // post 
  allPosts: '/posts/all',
  post: '/posts',
};

export default url;
