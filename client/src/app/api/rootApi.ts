import { createApi, fetchBaseQuery, FetchBaseQueryError, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const { url, method, body, params, auth } = args;
    if (auth) {
      return await baseQueryWithAuth({ url, method, body, params }, api, extraOptions);
    } else {
      return await baseQueryWithoutAuth({ url, method, body, params }, api, extraOptions);
    }
  },
  endpoints: () => ({}),
});

const baseQueryWithAuth: BaseQueryFn<
  { url: string; method: string; body?: any; params?: any },
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL!,
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
        baseUrl: process.env.REACT_APP_BASE_URL!,
        credentials: 'include',
        prepareHeaders: (headers) => {
          headers.set('Authorization', `Bearer ${newToken}`);
          return headers;
        },
      })(args, api, extraOptions);
    } catch (error: any) {
      console.error('Token refresh error:', error.message);
    }
  }

  return result;
};

const baseQueryWithoutAuth: BaseQueryFn<
  { url: string; method: string; body?: any; params?: any },
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  return await fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL!,
    credentials: 'include',
  })(args, api, extraOptions);
};

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
export interface PasswordResetResponse {
  message?: string;
  error?: string;
}
