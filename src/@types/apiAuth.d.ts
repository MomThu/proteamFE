interface UserResponse {
  accessToken?: {
    token?: string,
    expiresIn?: number
  };
  refreshToken?: {
    token?: string,
    expiresIn?: number
  };
  information?: {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    ldapUsername?: string;
    password?: string;
    permissions?: any;
    role?: string;
    status?: string;
  };
  errors?: any;
  message?: string;
  code?: number;
  version?: string;
}

interface UserInfo {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  ldapUsername?: string;
  password?: string;
  permissions?: any;
  role?: string;
  status?: string;
}
