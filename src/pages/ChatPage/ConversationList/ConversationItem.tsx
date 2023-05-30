import { IConversation } from 'redux/chat/type';
import React from 'react';
import { Avatar, Button } from 'antd';
import fallbackImageUser from 'assets/image/fallback_image/user.png';
import fallbackImageUserGroup from 'assets/image/fallback_image/user-group.png';
import { useAppDispatch } from 'app/hooks';
import { setCurrentConversation } from 'redux/chat/reducer';
import { MoreOutlined, UserOutlined } from '@ant-design/icons';

export default function ConversationItem(props: IConversation) {
  const dispatch = useAppDispatch();
  const handleClickConversation = () => {
    dispatch(setCurrentConversation(props));
  };

  const handleSettingConversation = () => {
    console.log('first');
  };
  return (
    <div className=" w-full flex justify-between items-center cursor-pointer" onClick={handleClickConversation}>
      <div className="flex items-center gap-3">
        <Avatar src={props.background} icon={<UserOutlined />} alt="" />

        <div className="flex-1 flex flex-col justify-between">
          <h4>{props.title}</h4>
          <p className="line-clamp-1">{props.description}</p>
        </div>
      </div>
      <Button icon={<MoreOutlined />} onClick={handleSettingConversation} />
    </div>
  );
}
