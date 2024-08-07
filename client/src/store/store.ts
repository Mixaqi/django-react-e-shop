import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { dashboardApi } from '../app/api/dashboardApi';
import { api } from 'app/api/rootApi';
import authReducer from '../store/slices/authSlice';
import modalReducer from './slices/modalSlice';
import { authApi } from 'app/api/authApi';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([api.middleware, authApi.middleware, dashboardApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
