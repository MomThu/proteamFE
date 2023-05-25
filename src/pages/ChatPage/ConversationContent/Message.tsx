import { Avatar } from 'antd';
import { useAppSelector } from 'app/hooks';
import fallbackImageUser from 'assets/image/fallback_image/user.png';
import { selectorUserInfo } from 'redux/auth/selectors';
import dayjs from 'plugins/dayjs';
import React from 'react';

interface IProps {
  messageInfo?: IMessage;
  userInfo?: UserInfo;
}
export default function Message(props: IProps) {
  const userInfo = useAppSelector(selectorUserInfo);

  return (
    <>
      <div
        className={`flex gap-3 cursor-pointer p-3 ${
          props.userInfo?.account_id === userInfo.account_id ? 'flex-row-reverse' : ''
        }`}
      >
        <Avatar
          className={`${props.userInfo?.account_id === userInfo.account_id ? 'hidden' : ''}`}
          src={props.userInfo?.avatar || fallbackImageUser}
          size={48}
          alt=""
        />

        <div>
          <div
            className={`p-3 rounded flex flex-col justify-between ${
              props.userInfo?.account_id === userInfo.account_id ? 'bg-primary text-white' : 'bg-cyan-100 text-gray-950'
            }`}
          >
            {props.userInfo?.account_id !== userInfo.account_id && <h5 className="mb-2">{props.userInfo?.name}</h5>}
            <p>{props.messageInfo?.content}</p>
          </div>
          <span className="text-[12px] text-gray-700 mt-1">
            {dayjs(props.messageInfo?.create_at).format('DD-MM HH:mm')}
          </span>
        </div>
      </div>
    </>
  );
}
