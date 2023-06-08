import { IConversation } from 'redux/chat/type';
import React from 'react';
import { Avatar, Button, Image } from 'antd';
import { useAppDispatch } from 'app/hooks';
import { setCurrentConversation } from 'redux/chat/reducer';
import { MoreOutlined, TeamOutlined } from '@ant-design/icons';

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
        {props.background ? (
          <Image
            src={props?.background}
            alt="avatar"
            preview={false}
            width={50}
            className="shadow rounded-full max-w-full h-auto border-none"
          />
        ) : (
          <Avatar icon={<TeamOutlined />} alt="" />
        )}

        <div className="flex-1 flex flex-col justify-between">
          <h4>{props.title}</h4>
          <p className="line-clamp-1">{props.description}</p>
        </div>
      </div>
      <Button icon={<MoreOutlined />} onClick={handleSettingConversation} />
    </div>
  );
}
