import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<string, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/api/auth/login', // Исправлен адрес для запроса аутентификации
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
