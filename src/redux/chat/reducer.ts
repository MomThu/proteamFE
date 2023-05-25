import { createSlice } from '@reduxjs/toolkit';
import { IConversation } from './type';
import { getConversationByUserId } from './actions';

interface ChatState {
  conversationList: IConversation[];
  currentConversation: IConversation | null;
}

const initState: ChatState = {
  conversationList: [],
  currentConversation: null,
};

const chatReducer = createSlice({
  name: 'chat',
  initialState: initState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversationByUserId.fulfilled, (state, action) => {
      state.conversationList = action.payload.items || [];
    });
  },
});

export const { setCurrentConversation } = chatReducer.actions;

export default chatReducer.reducer;
