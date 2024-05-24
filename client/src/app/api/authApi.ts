import { createApi, fetchBaseQuery, FetchBaseQueryError, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { IUser, logoutUser } from "../../store/slices/authSlice";
import Cookies from "js-cookie";

const refreshToken = async () => {
  const refresh = Cookies.get('refresh');
  if (!refresh) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/token/refresh/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem('access', data.access);
    return data.access;
  } else {
    throw new Error(data.detail || 'Unable to refresh token');
  }
};

const baseQueryWithReauth: BaseQueryFn<
  { url: string; method: string; body?: any; params?: any },
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log('Access token expired. Attempting to refresh token...');
    try {
      const newToken = await refreshToken();
      console.log('New access token:', newToken);
      result = await fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        credentials: 'include',
        prepareHeaders: (headers) => {
          headers.set('Authorization', `Bearer ${newToken}`);
          return headers;
        },
      })(args, api, extraOptions);
    } catch (error: any) {
      console.error('Token refresh error:', error.message);
      // api.dispatch(logoutUser());
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
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
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
