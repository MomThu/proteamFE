import moment from 'moment';

export const TIME_FORMAT_1 = 'DD/MM/YYYY HH:mm:ss';
export const TIME_FORMAT_2 = 'DD/MM/YYYY HH:mm';
export const TIME_FORMAT_3 = 'DD/MM/YYYY';
export const TIME_FORMAT_4 = 'DD-MM-YYYY HH:mm:ss';
export const TIME_FORMAT_5 = 'DD-MM-YYYY HH:mm';
export const TIME_FORMAT_6 = 'DD-MM-YYYY';

export const today = moment();
export const yesterday = moment().subtract(1, 'day');
export const EndOfDay = moment().endOf('day');
export const _7DaysAgo = moment().subtract(7, 'day');
export const _30DaysAgo = moment().subtract(30, 'day');
export const _1YearAgo = moment().subtract(1, 'years');
