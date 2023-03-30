const url = {
  // auth
  login: '/auth/login',
  logout: '/auth/logout',
  getGoogleLoginLink: '/auth/google-login-link',
  loginWithGoogle: '/auth/google-login',

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
};

export default url;
