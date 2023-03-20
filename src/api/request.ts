import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import merge from 'lodash/merge';
import QueryString from 'qs';
import { REACT_APP_BASE_URL } from 'utils/env';
import { getDataStorage, STORAGE_KEY } from 'utils/storage';

axios.defaults.timeout = 60000;
axios.defaults.timeoutErrorMessage = 'Mất kết nối đến máy chủ. Vui lòng thử lại sau';
axios.defaults.paramsSerializer = { serialize: (params) => QueryString.stringify(params, { indices: false }) };

const STATUS_ERROR = [400, 401, 403, 404, 422, 500];

const configure = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getDataStorage(STORAGE_KEY.ACCESS_TOKEN);
  const targetConfig: AxiosRequestConfig = {
    headers: { Authorization: token },
    // params: { version: REACT_APP_API_VERSION },
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
