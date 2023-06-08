import { RootState } from 'app/store';
import { INotification } from './type';

export const selectorNotificationList = (state: RootState): INotification[] | null => {
  return state.noti.notificationList;
};
