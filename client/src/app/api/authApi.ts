import { createApi, fetchBaseQuery, FetchBaseQueryError, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { IUser, logoutUser } from "../../store/slices/authSlice";

const refreshToken = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/token/refresh/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: getCookie('refresh') }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('access', data.access);
    return data.access;
  } else {
    throw new Error('Unable to refresh token');
  }
};



const getCookie = (name: string) => {
  const match = document.cookie.split(';').map(el => { let [key,value] = el.split('='); return { [key.trim()]: value }})
  const filteredMatch = match.filter(e => Object.keys(e)[0] === name)

  let matchLength = filteredMatch.length

  return filteredMatch[matchLength - 1][name]
}

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
    try {
      const newToken = await refreshToken();
      result = await fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        credentials: 'include',
        prepareHeaders: (headers) => {
          headers.set('Authorization', `Bearer ${newToken}`);
          return headers;
        },
      })(args, api, extraOptions);
    } catch (error) {
      api.dispatch(logoutUser());
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
