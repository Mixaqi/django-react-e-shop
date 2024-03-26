import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: IUser; access: string }>) => {
      localStorage.setItem(
        "user", //REPLACE LOCALSTORAGE TO COOKIES
        JSON.stringify({
          token: action.payload.access,
        }),
      );
      state.user = action.payload.user;
      state.access = action.payload.access;
    },
    logoutUser: (state) => {
      localStorage.clear()
      state.user = null
      state.access = null
    }
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
