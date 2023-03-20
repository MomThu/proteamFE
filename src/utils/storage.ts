/* eslint-disable @typescript-eslint/no-explicit-any */
import store, { StoreBase } from 'store2';

const _prefix = 'APP_';

export enum STORAGE_KEY {
  ACCESS_TOKEN = 'AccessToken',
  USER_INFO = 'UserInfo',
  REFRESH_TOKEN = 'RefreshToken',
}

const getRealKey = (key: string, noPrefix = false): string => {
  if (noPrefix) return key;
  return _prefix + key;
};

export const setDataStorage = <T = any>(key: string, data: any, noPrefix?: boolean): T => {
  const realKey = getRealKey(key, noPrefix);
  return store.set(realKey, data);
};

export const getDataStorage = <T = any>(key: string, noPrefix?: boolean): T => {
  const realKey = getRealKey(key, noPrefix);
  return store.get(realKey);
};

export const removeDataStorage = <T = any>(key: string, noPrefix?: boolean): T => {
  const realKey = getRealKey(key, noPrefix);
  return store.remove(realKey);
};

export const removeAllStorage = (): StoreBase => {
  return store.clearAll();
};
