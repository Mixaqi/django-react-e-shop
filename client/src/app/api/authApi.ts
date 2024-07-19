import { IUser } from '../../store/slices/authSlice';
import { api, PasswordResetResponse } from './rootApi';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<{ access: string; refresh: string; user: IUser }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/api/auth/routes/login/',
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
        url: '/api/auth/routes/register/',
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
        url: `/api/auth/urls/verify-email/${userId}/${token}/`,
        method: 'POST',
        auth: false,
      }),
    }),
    resendEmailVerification: builder.mutation<void, void>({
      query: () => ({
        url: '/api/auth/urls/resend_verification/',
        method: 'POST',
        auth: true,
      }),
    }),
    resetPassword: builder.mutation<PasswordResetResponse, { email: string }>({
      query: (data) => ({
        url: `api/auth/urls/reset_password/`,
        method: 'POST',
        body: data,
        auth: false,
      }),
    }),
    confirmResetPassword: builder.mutation<void, { token: string; newPassword: string }>({
      query: (data) => ({
        url: `api/auth/urls/reset_password/confirm/`,
        method: 'POST',
        body: data,
        auth: false,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useVerifyEmailMutation,
  useResendEmailVerificationMutation,
  useResetPasswordMutation,
  useConfirmResetPasswordMutation,
} = authApi;
