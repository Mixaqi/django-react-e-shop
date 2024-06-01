import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Cookies from 'js-cookie';
import { dashboardApi, useGetUserQuery } from '../../app/api/dashboardApi';


export interface IUser {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: IUser | null;
  access: string | null;
  refresh: string | null;
}

const initialState: AuthState = {
  user: null,
  access: null,
  refresh: null,
};

export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async(_, {dispatch}) => {
    const access = localStorage.getItem('access')
    const userId = localStorage.getItem('user_id')
    const refresh = Cookies.get('refresh')

    if (access && userId && refresh) {
      const result = await dispatch(dashboardApi.endpoints.getUser.initiate(Number(userId)));
      console.log(result)
      if ('data' in result) {
        const user = result.data as IUser;
        return { user, access, refresh };
      }
    }

    return { user: null, access: null, refresh: null };

  }
) 


export const setUser = createAsyncThunk(
  'auth/setUser',
  async ({ user, access, refresh }: { user: IUser; access: string; refresh: string }) => {
    localStorage.setItem('access', access);
    localStorage.setItem('user_id', user.id.toString())
    Cookies.set('refresh', refresh, {
      expires: 59,
      path: '/',
      // httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    return { user, access, refresh };
  },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_) => {
  localStorage.removeItem('user_id')
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
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.access = null;
        state.refresh = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh
      })
  },
});

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;