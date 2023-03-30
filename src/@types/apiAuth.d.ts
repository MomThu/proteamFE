interface UserResponse {
  accessToken?: {
    token?: string;
    expiresIn?: number;
  };
  refreshToken?: {
    token?: string;
    expiresIn?: number;
  };
  information?: {
    account_id?: number;
    email?: string;
    password?: string;
    role?: number;
  };
  errors?: any;
  message?: string;
  code?: number;
  version?: string;
}

interface UserInfo {
  account_id?: number;
  email?: string;
  password?: string;
  role?: number;
}
