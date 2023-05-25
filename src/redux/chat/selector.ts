import { RootState } from 'app/store';
import { IConversation } from './type';

export const selectorConversationList = (state: RootState): IConversation[] => {
  return state.chat?.conversationList;
};

export const selectorCurrentConversation = (state: RootState): IConversation | null => {
  return state.chat?.currentConversation;
};
