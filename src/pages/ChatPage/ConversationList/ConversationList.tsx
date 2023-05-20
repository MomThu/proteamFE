import { Button } from 'antd';
import Search from 'antd/es/input/Search';
import { useAppSelector } from 'app/hooks';
import React from 'react';
import { selectorConversationList } from 'redux/chat/selector';
import ConversationItem from './ConversationItem';

export default function ConversationList() {
  const conversationList = useAppSelector(selectorConversationList);

  const handleCreateNewConversation = () => {
    console.log('first');
  };

  const handleSearchConversation = () => {
    console.log('first');
  };

  return (
    <div className="h-full rounded-md flex flex-col gap-4">
      <div className="bg-white h-[calc(100%-80px)] overflow-y-scroll">
        <div className="px-5 flex items-center gap-4 border-b-2 border-0 !border-gray-400 border-solid sticky top-0 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-white">
          <h2 className="uppercase leading-[48px] font-semibold text-[13px]">Chats</h2>
          <Search placeholder="search conversation" onSearch={handleSearchConversation} className="flex-1" />
        </div>
        <ul>
          {conversationList.map((item, index) => {
            return (
              <li className="h-16 !border-b border-0 !border-gray-400 border-solid flex items-center px-5" key={index}>
                <ConversationItem {...item} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className=" bg-white px-5 h-16 flex items-center">
        <Button block type="primary" className="w-full" onClick={handleCreateNewConversation}>
          Start New Chat
        </Button>
      </div>
    </div>
  );
}
