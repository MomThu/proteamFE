import { IConversation } from 'redux/chat/type';
import React from 'react';
import { Avatar } from 'antd';
import fallbackImageUser from 'assets/image/fallback_image/user.png';
import fallbackImageUserGroup from 'assets/image/fallback_image/user-group.png';

export default function ConversationItem(props: IConversation) {
  return (
    <div className="flex items-center gap-3">
      <Avatar
        src={props.background || (props.is_inbox ? fallbackImageUser : fallbackImageUserGroup)}
        size={48}
        alt=""
      />

      <div className="flex-1">
        <h4>{props.title}</h4>
      </div>
    </div>
  );
}
