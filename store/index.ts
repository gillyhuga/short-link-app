import { configureStore } from '@reduxjs/toolkit';
import shortLink from './shortLink';

export const store = configureStore({
  reducer: {
    shortLink: shortLink,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
