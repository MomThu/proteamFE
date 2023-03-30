interface UserResponseData {
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
  id?: number;
  email?: string;
  gpa?: string;
  linkedlnLink?: string;
  name?: string;
  phone?: string;
  role?: string;
  school?: string;
}
