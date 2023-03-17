import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import merge from 'lodash/merge';
import QueryString from 'qs';
import { REACT_APP_API_VERSION, REACT_APP_BASE_URL } from 'utils/env';

axios.defaults.timeout = 60000;
axios.defaults.timeoutErrorMessage = 'Mất kết nối đến máy chủ. Vui lòng thử lại sau';
axios.defaults.paramsSerializer = { serialize: (params) => QueryString.stringify(params, { indices: false }) };

const STATUS_ERROR = [400, 401, 403, 404, 422, 500];

const configure = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const tokenFake =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOjIsInBob25lIjoiMDk2ODYyNjIyMiIsInNyYyI6MSwibmFtZSI6Ik5ndXnhu4VuIFbEg24gRGV2IiwiZXhwIjoxNjYwMzI1NDkxOTA5LCJpYXQiOjE2NjAyMzkwOTE5MTAsInRva2VuIjoiR1lLTTdsdVZhS1ZoOGJUdjJuRDhWZGJuby9OSDNKZU1xKzIzK2Y2OXpsST0iLCJ1c2VybmFtZSI6ImRldnZpcCJ9.DCJafHH9TKpu3QYV6JMFFuGk4uZEHWHOTf2otWDV6KoTg8uHyxVtevyIIlhK31lVDjL1ugJNMDMl4QUC1hKyB9mFCAorZCHqiO-3Xt8ulOzMoNW9ZQ7vZDY9Yrjq0RGWG047At1sB-VcZtGQr54aVu27NIhZ_o4V0BrbwzPQf66mQxdAbTrUCALu_c6VWL6HjQt9kEQvx144RDlYTjZVRiIPtE62onyV88tWWSn0yjR83dH3lWwDWZgxT-0OX7NfNKB-9UEg79SY1b_zalpPCCPO3DP7V120EakE_SuA0WmIsNYTF6thU5uY8QK5ORcGUex1HSypS-6B-N2FLortqA';

  const targetConfig: AxiosRequestConfig = {
    headers: { Authorization: tokenFake },
    params: { version: REACT_APP_API_VERSION },
  };

  return merge(config, targetConfig);
};

const configureErr = (error: AxiosError<BaseResponse>) => {
  const status = error.response?.status;
  const data = error.response?.data;

  if (data && STATUS_ERROR.includes(status as number)) {
    return { ...data, client: status === 400 };
  }

  return error;
};

/** Request API */
export const api = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

api.interceptors.request.use(
  (config) => Promise.resolve(configure(config)),
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => Promise.reject(configureErr(error))
);

