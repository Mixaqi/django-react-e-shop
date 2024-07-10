import { IUser } from '../../store/slices/authSlice';
import { api } from './rootApi';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<{ access: string; refresh: string; user: IUser }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/api/auth/login/',
        method: 'POST',
        body: {
          email,
          password,
        },
        auth: false,
      }),
    }),
    registerUser: builder.mutation<
      { access: string; refresh: string; user: IUser },
      { username: string; email: string; password: string }
    >({
      query: ({ username, email, password }) => ({
        url: '/api/auth/register/',
        method: 'POST',
        body: {
          username,
          email,
          password,
        },
        auth: false,
      }),
    }),
    verifyEmail: builder.mutation<{ message: string }, { userId: number; token: string }>({
      query: ({ userId, token }) => ({
        url: `/api/auth/verify-email/${userId}/${token}/`,
        method: 'POST',
        auth: false,
      }),
    }),
    resendEmailVerification: builder.mutation<void, void>({
      query: () => ({
        url: '/api/auth/resend_verification/',
        method: 'POST',
        auth: true,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useVerifyEmailMutation,
  useResendEmailVerificationMutation,
} = authApi;
