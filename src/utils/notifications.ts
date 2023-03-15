/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from 'antd';
// import { ArgsProps } from 'antd/lib/notification';

export const notificationInfo = (mes: React.ReactNode, args?: any): void => {
  return notification.info({
    message: mes,
    style: { borderRadius: 6 },
    ...args,
  });
};

export const notificationSuccess = (mes: React.ReactNode, args?: any): void => {
  return notification.success({
    message: mes,
    style: { borderRadius: 6 },
    ...args,
  });
};

export const notificationError = (mes: React.ReactNode, args?: any): void => {
  return notification.error({
    message: mes,
    style: { borderRadius: 6 },
    ...args,
  });
};

export const notificationWarning = (mes: React.ReactNode, args?: any): void => {
  return notification.warning({
    message: mes,
    style: { borderRadius: 6 },
    ...args,
  });
};

export const notificationOpen = (mes: React.ReactNode, args?: any): void => {
  return notification.open({
    message: mes,
    style: { borderRadius: 6 },
    ...args,
  });
};
