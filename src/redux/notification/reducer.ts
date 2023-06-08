import { createReducer, createSlice } from '@reduxjs/toolkit';
import { NotificationStates } from './type';
import { getNotificationListByUserId } from './actions';

const initState: NotificationStates = {
  notificationList: [],
};

const notificationReducer = createSlice({
  name: 'chat',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotificationListByUserId.fulfilled, (state, action) => {
      state.notificationList = action.payload.items || [];
    });
  },
});

export default notificationReducer.reducer;
