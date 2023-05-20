import { createReducer } from '@reduxjs/toolkit';
import { IConversation } from './type';
import { getConversationByUserId } from './actions';

interface ChatState {
  conversationList: IConversation[];
}

const initState: ChatState = {
  conversationList: [],
};

const chatReducer = createReducer(initState, (builder) => {
  builder.addCase(getConversationByUserId.fulfilled, (state, action) => {
    state.conversationList = action.payload.items;
  });
});

export default chatReducer;
