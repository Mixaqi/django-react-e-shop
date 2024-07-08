import { DashboardInfo } from '../../pages/dashboard/Dashboard';
import { IUser } from '../../store/slices/authSlice';
import { api } from './rootApi';

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserDashboardInfo: builder.query<DashboardInfo, void>({
      query: () => ({
        url: '/api/dashboard/me',
        method: 'GET',
        auth: true,
      }),
    }),
    getUser: builder.query<IUser, void>({
      query: () => ({
        url: '/users/',
        method: 'GET',
        auth: true,
      }),
    }),
    changeUserDashboardInfo: builder.mutation<DashboardInfo, { fullName: string }>({
      query: ({ fullName }) => ({
        url: '/api/dashboard/update-user-data/',
        method: 'PATCH',
        body: {
          fullName,
        },
        auth: true,
      }),
    }),
    uploadUserImage: builder.mutation<{ image: string }, FormData>({
      query: (formData) => {
        return {
          url: '/api/dashboard/upload-image/',
          method: 'POST',
          body: formData,
          auth: true,
        };
      },
    }),
    deleteUserImage: builder.mutation({
      query: () => ({
        url: '/api/dashboard/delete-image/',
        method: 'POST',
        auth: true,
      }),
    }),
    deleteUser: builder.mutation<void, { currentPassword: string }>({
      query: ({ currentPassword }) => ({
        url: '/api/auth/users/me/',
        method: 'DELETE',
        body: { currentPassword },
        auth: true,
      }),
    }),
    changeUserPassword: builder.mutation<
      void,
      {
        newPassword: string;
        reNewPassword: string;
        currentPassword: string;
      }
    >({
      query: ({ newPassword, reNewPassword, currentPassword }) => ({
        url: 'api/auth/users/set_password/',
        method: 'POST',
        body: { newPassword, reNewPassword, currentPassword },
        auth: true,
      }),
    }),
  }),
});

export const {
  useGetUserDashboardInfoQuery,
  useGetUserQuery,
  useChangeUserDashboardInfoMutation,
  useUploadUserImageMutation,
  useDeleteUserImageMutation,
  useDeleteUserMutation,
  useChangeUserPasswordMutation,
} = dashboardApi;
