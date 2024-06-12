import { DashboardInfo } from '../../pages/Dashboard';
import { IUser } from '../../store/slices/authSlice';
import { authApi } from './authApi';

export const dashboardApi = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserDashboardInfo: builder.query<DashboardInfo, number>({
            query: (id: number) => ({
                url: `/api/dashboard/${id}`,
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
            { id: number; fullName: string }
        >({
            query: ({ id, fullName }) => ({
                url: `/api/dashboard/${id}/`,
                method: 'PATCH',
                body: {
                    fullName,
                },
            }),
        }),
        uploadUserImage: builder.mutation<{ image: string }, FormData>({
            query: (formData) => {
                return {
                    url: `/api/dashboard/upload-image/${localStorage.getItem('user_id')}/`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),
    }),
});

export const {
    useGetUserDashboardInfoQuery,
    useGetUserQuery,
    useChangeUserDashboardInfoMutation,
    useUploadUserImageMutation,
} = dashboardApi;
