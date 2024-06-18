import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Cookies from 'js-cookie';
import { dashboardApi } from '../../app/api/dashboardApi';
import { LoginResponse } from 'pages/auth/login.interface';

export interface IUser {
    id: number;
    username: string;
    email: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    dashboardId?: number;
}

export interface AuthState {
    user: IUser | null;
    // isVerified: true | false;
}

const initialState: AuthState = {
    user: null,
    // isVerified: false,
};

export const initializeAuth = createAsyncThunk(
    'auth/initializeAuth',
    async (_, { dispatch }) => {
        const userId = localStorage.getItem('userId');

        if (userId) {
            const result = await dispatch(
                dashboardApi.endpoints.getUser.initiate(Number(userId)),
            );
            if ('data' in result) {
                const user = result.data as IUser;
                return { user };
            }
        }

        return { user: null };
    },
);

export const setUser = createAsyncThunk(
    'auth/setUser',
    async ({ user, access, refresh }: LoginResponse) => {
        localStorage.setItem('userId', user.id.toString());
        localStorage.setItem('access', access);
        Cookies.set('refresh', refresh, {
            expires: 59,
            path: '/',
            secure: true,
            sameSite: 'lax',
        });
        return { user };
    },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_) => {
    localStorage.removeItem('userId');
    localStorage.removeItem('access');
    Cookies.remove('refresh');
    return;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // setVerifyEmailStatus(state, action: PayloadAction<boolean>){
        //   state.isVerified = action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(initializeAuth.fulfilled, (state, action) => {
                state.user = action.payload.user;
            });
    },
});

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
