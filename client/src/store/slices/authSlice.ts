import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IUser {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: IUser | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
      localStorage.setItem(
        "user", //REPLACE LOCALSTORAGE TO COOKIES
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
        }),
      );
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
