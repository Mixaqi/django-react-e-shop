import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState, store } from "../store"
import Cookies from "js-cookie"

export interface IUser {
  id: number;
  username: string;
  email: string;
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
}

export const setUser = createAsyncThunk(
  "auth/setUser",
  async ({ user, access, refresh }: { user: IUser; access: string; refresh: string }) => {
    localStorage.setItem("access", access);
    Cookies.set("refresh", refresh, {
      expires: 30,
      path: '/',
      // httpOnly: true,
      secure: true,
      sameSite: 'lax'
    });
    return { user, access, refresh };
  }
)

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_) => {
    localStorage.removeItem("access");
    Cookies.remove("refresh")
    return;
  }
)

export const authSlice = createSlice({
  name: "auth",
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
      });
  },
})

export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer
