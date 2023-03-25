export interface AuthLogin {
  email: string;
  password: string;
}

export interface IGoogleLoginLinkParams {
  redirectUri: string;
  state?: string;
}
export interface IGoogleLoginForm {
  redirectUri?: string;
}

export interface ILoginResponse {
  accessToken: {
    token: string;
    expiresIn: string;
  };
  refreshToken: {
    token: string;
    expiresIn: string;
  };
  profile: UserInfo;
}

export interface ITokenOption {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredAt: number;
  refreshTokenExpiredAt: number;
}
