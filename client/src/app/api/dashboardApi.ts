import { DashboardInfo } from '../../pages/dashboard/Dashboard';
import { IUser } from '../../store/slices/authSlice';
import { authApi } from './authApi';

export const dashboardApi = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserDashboardInfo: builder.query<DashboardInfo, void>({
            query: () => ({
                url: `/api/dashboard/me`,
                method: 'GET',
            }),
        }),
        getUser: builder.query<IUser, number>({
            query: (id: number) => ({
                url: `/users/${id}`,
                method: 'GET',
            }),
        }),
        changeUserDashboardInfo: builder.mutation<
            DashboardInfo,
            { fullName: string }
        >({
            query: ({ fullName }) => ({
                url: `/api/dashboard/update-user-data/`,
                method: 'PATCH',
                body: {
                    fullName,
                },
            }),
        }),
        uploadUserImage: builder.mutation<{ image: string }, FormData>({
            query: (formData) => {
                return {
                    url: `/api/dashboard/upload-image/`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),
        deleteUserImage: builder.mutation({
            query: () => ({
                url: `/api/dashboard/delete-image/`,
                method: 'POST',
            }),
        }),
        deleteUser: builder.mutation<void, { currentPassword: string }>({
            query: ({ currentPassword }) => ({
                url: `/api/auth/users/me/`,
                method: 'DELETE',
                body: { currentPassword },
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
} = dashboardApi;
