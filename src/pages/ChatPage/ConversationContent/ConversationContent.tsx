import { FileAddOutlined, FileSyncOutlined, SendOutlined } from '@ant-design/icons/lib/icons';
import { Button, Input } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { scrollToView } from 'common/hepler';
import BaseUploadFile from 'components/base/UpLoad/UploadFile';
import { cloneDeep } from 'lodash';
import socket from 'plugins/socket';
import React, { useEffect, useState } from 'react';
import { selectorUserInfo } from 'redux/auth/selectors';
import { createMessage, getConversationByUserId } from 'redux/chat/actions';
import { setCurrentConversation } from 'redux/chat/reducer';
import { selectorCurrentConversation } from 'redux/chat/selector';
import { getNotificationListByUserId } from 'redux/notification/actions';
import { getMessageError } from 'utils/common';
import { notificationError } from 'utils/notifications';
import Message from './Message';

export default function ConversationContent() {
  const currentConversation = useAppSelector(selectorCurrentConversation);
  const userInfo = useAppSelector(selectorUserInfo);
  const [inputMessage, setInputMessage] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.receiveMessage((payload: IMessage) => {
      const newConversation = cloneDeep(currentConversation);
      newConversation?.messages.push(payload);
      dispatch(setCurrentConversation(newConversation));
      dispatch(getConversationByUserId(userInfo.account_id || 0));
    });
    socket.addedToConversation(() => {
      console.log('first');
      dispatch(getNotificationListByUserId(userInfo.account_id || 0));
      dispatch(getConversationByUserId(userInfo.account_id || 0));
    });
  }, [currentConversation]);

  useEffect(() => {
    const sortMessage = cloneDeep(currentConversation)?.messages?.sort(
      (a, b) => new Date(a?.create_at || '').getTime() - new Date(b?.create_at || '').getTime()
    );
    const lastMessage = sortMessage ? sortMessage[sortMessage?.length - 1] : null;
    if (lastMessage) {
      scrollToView(`message-${lastMessage.id}`);
    }
  }, [currentConversation?.messages.length]);

  const handleSuccess = (id: number, url: string, fileName: string) => {
    setFileUrl(url);
  };

  const handleSubmitMessage = async () => {
    const payload: ICreateMessage = {
      user_id: userInfo.account_id || 0,
      conversation_id: currentConversation?.id || 0,
      content: inputMessage,
      file: fileUrl || null,
      is_remove: false,
      is_unsent: false,
    };

    try {
      const message = await dispatch(createMessage(payload)).unwrap();
      setInputMessage('');
      socket.createMessage(message);
      const newConversation = cloneDeep(currentConversation);
      newConversation?.messages.push(message);
      dispatch(setCurrentConversation(newConversation));
      dispatch(getConversationByUserId(userInfo.account_id || 0));
    } catch (error) {
      notificationError(getMessageError(error));
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-5 border-b-2 border-0 !border-gray-400 border-solid sticky top-0 shadow-[0_0_20px_rgba(0,0,0,0.14)] flex justify-between items-center">
        <h2 className="uppercase leading-[48px] font-semibold text-[13px]">
          Chat with <span className="text-primary">{currentConversation?.title || '...'}</span>
        </h2>
        <Button type="text" className="uppercase font-medium text-[13px]">
          <FileSyncOutlined /> <span>share media</span>
        </Button>
      </div>
      <div className="flex-1 max-h-[calc(100%-48px)] flex flex-col justify-between">
        <ul className="flex-1 overflow-y-scroll">
          {cloneDeep(currentConversation?.messages)
            ?.sort((a, b) => new Date(a?.create_at || '').getTime() - new Date(b?.create_at || '').getTime())
            ?.map((message, index) => {
              const userInfo = currentConversation?.users.find((item) => item.account_id === message.user_id);
              return (
                <li key={index} id={`message-${message.id}`}>
                  <Message userInfo={userInfo} messageInfo={message} />
                </li>
              );
            })}
        </ul>
        <div className="h-16  border-0 border-t border-solid border-gray-400 w-full flex items-center gap-2 px-5">
          <Input
            disabled={!currentConversation}
            onChange={(event) => {
              setInputMessage(event.target.value);
            }}
            value={inputMessage}
            placeholder="Write your message"
            className="flex-1"
          />
          <BaseUploadFile
            onSuccess={handleSuccess}
            path="file"
            icon={<Button type="text" className="uppercase font-medium text-[13px]" icon={<FileAddOutlined />} />}
          />
          <Button type="primary" icon={<SendOutlined />} onClick={handleSubmitMessage} />
        </div>
      </div>
    </div>
  );
}
