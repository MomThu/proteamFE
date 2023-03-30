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

export interface ITokenOption {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredAt: number;
  refreshTokenExpiredAt: number;
}
