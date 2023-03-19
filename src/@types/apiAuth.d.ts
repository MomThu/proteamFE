interface UserInfo {
  token?: string;
  data?: {
    id: number;
    source: number;
    exp: number;
    iat: number;
    token: string;
    phone: string;
    org: 1;
    title: null;
    username: string;
    postCode: string;
    full_name: string;
  };
  refresh_token?: string;
  errors?: any;
  message?: string;
}

