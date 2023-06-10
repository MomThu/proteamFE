/* eslint-disable @typescript-eslint/no-explicit-any */
export interface NotificationStates {
  notificationList: INotification[];
}

export interface INotification {
  noti_id: number;
  description: string;
  account_id: number;
  is_read: boolean;
  type: string;
  create_time?: string;
}

export interface NotificationListResponse {
  items: INotification[];
  totalItems: number;
}
