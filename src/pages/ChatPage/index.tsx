import React from 'react';
import ConversationList from './ConversationList/ConversationList';
import ConversationContent from './ConversationContent/ConversationContent';

const ChatPage: React.FC = () => {
  return (
    <div className="px-[130px] py-10 bg-#F7F9FB h-[calc(100vh-108px)] flex gap-6">
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
