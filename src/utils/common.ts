/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormRule } from 'antd';
import { get } from 'lodash';
import { MESSAGE_ERR } from './constants';

export const schemaRules = (schema: any): FormRule[] => {
  return [
    {
      async validator({ field }: any, value: any) {
        await schema.validateSyncAt(field, { [field]: value });
      },
    },
  ];
};

export const getMessageError = (error: unknown, path = 'message'): string => {
  return get(error, path, MESSAGE_ERR);
};

export const capitalizeString = (str: string): string => {
  if (!str) return '';
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
};

export const formatterNumber = (num?: string | number): string => {
  if (!num) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const numberFormat = (num?: number | string): string => {
  if (!num) return '0';

  let number = 0;
  if (typeof num === 'number') {
    number = num;
  } else if (typeof num === 'string') {
    number = Number.parseFloat(num);
  } else {
    return '0';
  }

  if (Number.isNaN(number)) return '0';

  const numberFormat = new Intl.NumberFormat(); //default: English, vi-VN: Vietnamese
  return numberFormat.format(number);
};
