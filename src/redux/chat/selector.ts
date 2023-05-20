import { RootState } from 'app/store';
import { IConversation } from './type';

export const selectorConversationList = (state: RootState): IConversation[] => {
  return state.chat?.conversationList;
};
