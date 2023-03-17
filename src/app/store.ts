import { configureStore } from '@reduxjs/toolkit';
import createRootReducer from './rootReducer';

const rootReducer = createRootReducer();

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
