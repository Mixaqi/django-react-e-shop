import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { LoginResponse } from 'pages/auth/login.interface';
import { RootState } from '../store';
import { dashboardApi } from '../../app/api/dashboardApi';

export interface IUser {
  id: number;
  username: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthState {
  user: IUser | null;
}

const initialState: AuthState = {
  user: null,
};

export const initializeAuth = createAsyncThunk('auth/initializeAuth', async (_, { dispatch }) => {
  const result = await dispatch(dashboardApi.endpoints.getUser.initiate());
  if ('data' in result) {
    const user = result.data as IUser;
    return { user };
  }

  return { user: null };
});

export const setUser = createAsyncThunk('auth/setUser', async ({ user, access, refresh }: LoginResponse) => {
  localStorage.setItem('access', access);
  Cookies.set('refresh', refresh, {
    expires: 59,
    path: '/',
    secure: true,
    sameSite: 'lax',
  });
  return { user };
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  localStorage.removeItem('access');
  Cookies.remove('refresh');
  return;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
