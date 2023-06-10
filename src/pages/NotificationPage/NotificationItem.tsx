import moment from 'moment';
import React from 'react';
import { INotification } from 'redux/notification/type';
import { TIME_FORMAT_6 } from 'utils/time';

type Props = {
  data: INotification;
};
const NotificationItem: React.FC<Props> = (props: Props) => {
  const { data } = props;
  return (
    <div className="bg-white m-10 p-5">
      <div className={data?.is_read ? 'font-bold' : ''}>{data?.description}</div>
      <div className="font-thin text-xs">{data.create_time ? moment(data.create_time).format(TIME_FORMAT_6) : ''}</div>
    </div>
  );
};

export default NotificationItem;
