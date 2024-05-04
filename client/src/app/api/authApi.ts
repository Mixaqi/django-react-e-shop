import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IUser } from "../../store/slices/authSlice"


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const access = localStorage.getItem("access")
      if (access) {
        headers.set("Authorization", `Bearer ${access}`);
        // headers.set('Access-Control-Allow-Origin', '*') 
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<{ access: string, refresh: string, user: IUser }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/api/auth/login/',
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),
    registerUser: builder.mutation<{ access: string, refresh: string, user: IUser }, { username: string, email: string; password: string }>({
      query: ({ username, email, password }) => ({
        url: '/api/auth/register/',
        method: 'POST',
        body: {
          username,
          email,
          password,
        }
      }),
    }),
  }),
})
export const { useLoginUserMutation, useRegisterUserMutation } = authApi
