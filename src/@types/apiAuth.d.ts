interface UserResponse {
  accessToken?: {
    token?: string;
    expiresIn?: number;
  };
  refreshToken?: {
    token?: string;
    expiresIn?: number;
  };
  information?: UserInfo;
}

interface UserInfo {
  account_id?: number;
  avatar?: string;
  email?: string;
  gpa?: string;
  linkedlnLink?: string;
  name?: string;
  phone?: string;
  role?: number;
  school?: string;
}
