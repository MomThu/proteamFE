import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Empty } from 'antd';
import React, { useEffect } from 'react';
import { selectorUserInfo } from 'redux/auth/selectors';
import { getNotificationListByUserId } from 'redux/notification/actions';
import { selectorNotificationList } from 'redux/notification/selectors';
import NotificationItem from './NotificationItem';

const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectorUserInfo);
  const notifications = useAppSelector(selectorNotificationList);

  useEffect(() => {
    if (userInfo?.account_id) {
      dispatch(getNotificationListByUserId(userInfo?.account_id)).unwrap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userInfo]);
  return (
    <div>
      {notifications && notifications.length ? (
        notifications?.map((notification, index) => <NotificationItem key={index} data={notification} />)
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Notification;
