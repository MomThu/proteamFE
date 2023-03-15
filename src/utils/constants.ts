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
