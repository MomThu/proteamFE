/* eslint-disable @typescript-eslint/no-explicit-any */

type BaseResponse<T = any> = {
  success: boolean;
  data: T;
  message: string;
  ref: string | null;
  client?: boolean;
};

type ResponseList<T = any> = {
  data: T;
  totalCount: number;
};

type ValueLabel = {
  key?: number | string;
  value: number | string;
  label: string;
};
