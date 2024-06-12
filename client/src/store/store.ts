import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice';
import { authApi } from '../app/api/authApi';
import { dashboardApi } from '../app/api/dashboardApi';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import authReducer from '../store/slices/authSlice';

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        auth: authReducer,
        authApi: authApi.reducer,
        dashboardApi: dashboardApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            authApi.middleware,
            dashboardApi.middleware,
        ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
