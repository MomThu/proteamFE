/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormRule } from 'antd';
import { get, isPlainObject, mapKeys, trim } from 'lodash';
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

export function trimObject(body: any): void {
  const trimValue = (item: any) => {
    mapKeys(item, (value, key) => {
      // remove string contain only space characters
      if (typeof value === 'string') {
        item[key] = value.trim();
      }

      // iterate array
      else if (Array.isArray(value)) {
        value.forEach((subValue, index) => {
          // remove string contain only space characters
          if (typeof subValue === 'string' && !trim(subValue as string)) {
            value.splice(index, 1);
          } else if (isPlainObject(subValue)) {
            trimValue(subValue);
          }
        });
      } else if (isPlainObject(value)) {
        trimValue(value);
      }
    });
  };

  trimValue(body);
}
