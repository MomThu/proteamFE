/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormRule } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { get, size, toString } from 'lodash';
import moment from 'moment';
import * as yup from 'yup';
import { MESSAGE_ERR } from './constants';

// export const schemaRules = (schema: yup.BaseSchema): FormRule[] => {
//   return [
//     {
//       async validator({ field }: any, value: any) {
//         await schema.validateSyncAt(field, { [field]: value });
//       },
//     },
//   ];
// };

export const getMessageError = <T = any>(error: T, path = 'message'): any => {
  let message = get(error, path, MESSAGE_ERR);
  if (message === 'Network Error') {
    message = 'Mất kết nối đến máy chủ. Vui lòng thử lại sau ít phút';
  }
  return message;
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

  const formater = new Intl.NumberFormat(); //default: English, vi-VN: Vietnamese
  return formater.format(number);
};

export const dateTimeFormat = (time: any, formatOut: string, formatIn?: string): string => {
  if (!time) return '';
  try {
    return moment(time, formatIn).format(formatOut);
  } catch {
    return '';
  }
};

export const normalizeString = (value: any): string => {
  if (!value) return '';
  if (typeof value !== 'string') return '';

  return value.replace(/\s\s/g, ' ');
};

export const calculatorSizeFile = (files: File[]): number => {
  return files.reduce((total, file) => {
    return total + file.size;
  }, 0);
};

export const checkDuplicateFile = (lstFile: RcFile[], fileChecked: RcFile): boolean => {
  if (size(lstFile) <= 0) return false;

  for (let idx = 0; idx < lstFile.length; idx++) {
    if (
      lstFile[idx].name === fileChecked.name &&
      lstFile[idx].size === fileChecked.size &&
      lstFile[idx].type === fileChecked.type
    ) {
      return true;
    }
  }

  return false;
};

export const checkRightFileType = (fileChecked: RcFile, listTypeFile?: string[]): boolean => {
  const fileType = fileChecked.name?.split('.')?.pop()?.toLowerCase() || '';

  const fileTypeAccepted = ['mp3', 'mp4', 'jpg', 'jpeg', 'png', 'doc', 'docx', 'xls', 'xlsx', 'avi', 'pdf'];
  return listTypeFile ? !listTypeFile.includes(fileType) : !fileTypeAccepted.includes(fileType);
};

export const removeAccents = (str: string): string => {
  const accentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
    'dđ',
    'DĐ',
    'eèẻẽéẹêềểễếệ',
    'EÈẺẼÉẸÊỀỂỄẾỆ',
    'iìỉĩíị',
    'IÌỈĨÍỊ',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
    'uùủũúụưừửữứự',
    'UÙỦŨÚỤƯỪỬỮỨỰ',
    'yỳỷỹýỵ',
    'YỲỶỸÝỴ',
  ];

  for (let i = 0; i < accentsMap.length; i++) {
    const re = new RegExp('[' + accentsMap[i].substring(1) + ']', 'g');
    const char = accentsMap[i][0];
    str = str.replace(re, char);
  }

  return str;
};

export const filterOptionSelect = (text: string, option: any) => {
  const textSearch = toString(get(option, 'children')).trim().toLowerCase();
  return removeAccents(textSearch).includes(removeAccents(text.trim().toLowerCase()));
};
