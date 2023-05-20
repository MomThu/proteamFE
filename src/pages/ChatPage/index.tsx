import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { selectorUserInfo } from 'redux/auth/selectors';
import { getConversationByUserId } from 'redux/chat/actions';
import ConversationContent from './ConversationContent/ConversationContent';
import ConversationList from './ConversationList/ConversationList';

const ChatPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectorUserInfo);

  useEffect(() => {
    dispatch(getConversationByUserId(userInfo?.account_id || 0));
  }, [userInfo]);

  return (
    <div className="px-5 lg:px-12 xl:px-[120px] py-10 bg-#F7F9FB h-[calc(100vh-108px)] flex gap-6">
      <div className="w-[280px] h-full">
        <ConversationList />
      </div>
      <div className="flex-1">
        <ConversationContent />
      </div>
    </div>
  );
};

export default ChatPage;
