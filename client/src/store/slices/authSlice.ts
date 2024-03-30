import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IUser {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: IUser | null;
  access: string | null;
}

const initialState: AuthState = {
  user: null,
  access: null,
};

export const setUser = createAsyncThunk(
  "auth/setUser",
  async ({ user, access }: { user: IUser; access: string }) => {
    localStorage.setItem("access", access);
    return { user, access };
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_) => {
    localStorage.removeItem("access");
    return;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.access = action.payload.access;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.access = null;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
