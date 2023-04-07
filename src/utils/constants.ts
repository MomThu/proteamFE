/* eslint-disable no-useless-escape */
export const MESSAGE_ERR = 'Đã có lỗi xảy ra. Vui lòng thử lại';
export const PAGE_SIZE = 10;
export const ONE_MB = 1048567; // 1 megabyte (1024 * 1024)

export const regexOnlyNumber = /^[0-9]*$/;
export const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const regexNonSpecial = /^[^:;.,'"<>\\/?~`+=_\-@#$%^&*(){}[\]!|]*$/;
export const regexNonSpecial2 = /^[^:;'"<>\\/?~`+=_\-@#$%^&*{}[\]|]*$/;
export const regexNonSpecial3 = /^[^:;'"<>\\/?~`+=@#$%^&*{}[\]|]*$/;
export const regexPhone =
  /^(1900|1800)[0-9]{4}$|(05|03|04|07|08|09|024|028)[0-9]{8}$|(\84)[0-9]{9}$|(021[012345689]|023[23456789]|020[3456789]|022[0123456789]|029[01234679]|025[123456789]|026[01239]|027[01234567])[0-9]{7}$/;

export const Regex = {
  PHONE: /^[0-9]{1,255}$/,
  INT_PATTERN: `^\\d+$`,
  FLOAT_PATTERN: `^\\d+\\.\\d{0,2}$`,
  ALPHA_NUMERIC: /^[a-zA-Z0-9]+$/,
  GENERAL_SPECIAL_CHARACTERS: /[$&+:;=?#|'<>,().^*!%]+/,
  TAX_SPECIAL_CHARACTERS: /[$&+:;=?#|'<>^*!]+/,
  MEMO_SPECIAL_CHARACTERS: /[$&+:;=?#|'<>^*!]+/,
  WEBSITE_SPECIAL_CHARACTERS: /[$&+:;=?#|'<>^*!]+/,
  EMAIL_SPECIAL_CHARACTERS: /[$&:;=?#|'<>,()^*!%]+/,
  CHILDREN_TYPE_SPECIAL_CHARACTERS: /[$&+:;=?#|'<>,().^*!%@/\\~`"]+/,
  NAME_SPECIAL_CHARACTERS: /[$&+:;=?#|'<>,().^*!%@/\\~`"]+/,
};

export const ImageFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

export enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  ITEM_NOT_FOUND = 444,
  ITEM_ALREADY_EXIST = 445,
  ITEM_IS_USING = 446,
  ITEM_IS_INVALID = 448,
  INTERNAL_SERVER_ERROR = 500,
}
