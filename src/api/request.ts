import { removeAllStorage } from 'utils/storage';
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';
import merge from 'lodash/merge';
import QueryString from 'qs';
import { REACT_APP_BASE_URL } from 'utils/env';
import { getDataStorage, setDataStorage, STORAGE_KEY } from 'utils/storage';

axios.defaults.timeout = 60000;
axios.defaults.timeoutErrorMessage = 'Mất kết nối đến máy chủ. Vui lòng thử lại sau';
axios.defaults.paramsSerializer = { serialize: (params) => QueryString.stringify(params, { indices: false }) };

// const STATUS_ERROR = [400, 402, 401, 403, 404, 422, 500];
// const token = getDataStorage(STORAGE_KEY.ACCESS_TOKEN);
// const refreshToken = getDataStorage(STORAGE_KEY.REFRESH_TOKEN);
const configure = (config: AxiosRequestConfig): any => {
  const token = getDataStorage(STORAGE_KEY.ACCESS_TOKEN);
  const refreshToken = getDataStorage(STORAGE_KEY.REFRESH_TOKEN);

  let targetConfig: AxiosRequestConfig = {};
  if (config.url === '/auth/refresh-token') {
    targetConfig = {
      headers: { Authorization: `Bearer ${refreshToken}` },
    };
  } else {
    targetConfig = {
      headers: { Authorization: `Bearer ${token}` },
    };
  }
  return merge(config, targetConfig);
};

const configureErr = async (error: any) => {
  const originalConfig = error.config;

  if (originalConfig?.url !== '/auth/login' && error.response) {
    const status = error.response?.status;
    const data = error.response?.data;
    // Access token was expired
    if (
      status === 401 &&
      data.message === 'Unauthorized' &&
      originalConfig?.url !== '/auth/refresh-token' &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;
      try {
        const { data } = await api.post('/auth/refresh-token');
        const refreshRes = data.data;
        setDataStorage(STORAGE_KEY.ACCESS_TOKEN, refreshRes.accessToken?.token);
        setDataStorage(STORAGE_KEY.REFRESH_TOKEN, refreshRes.refreshToken?.token);
        setDataStorage(STORAGE_KEY.USER_INFO, refreshRes.profile);
        return;
      } catch (err) {
        removeAllStorage();
        return Promise.reject(err);
      }
    }
  }
  if (originalConfig.url === '/auth/refresh-token') {
    alert('Token was expired. You need login to access this feature!');
    window.location.reload();
  }
  return Promise.reject(error);
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
  (error) => configureErr(error)
  // (error) => Promise.reject(configureErr(error))
);
