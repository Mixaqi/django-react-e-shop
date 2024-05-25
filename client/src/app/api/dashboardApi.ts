import { DashboardInfo } from '../../pages/Dashboard';
import { authApi } from './authApi';

export const dashboardApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDashboardInfo: builder.query<DashboardInfo, number>({
      query: (id: number) => ({
        url: `/api/dashboard/${id}`,
        method: 'GET',
        // headers: {
        //   'Authorization': `Bearer ${localStorage.getItem('access') ?? ''}`,
        // },
      }),
    }),
    getUser: builder.query<DashboardInfo, number>({
      query: (id: number) => ({
        url: `/users/${id}`,
        method: 'GET',
      })
    })
  }),
});

export const { useGetUserDashboardInfoQuery, useGetUserQuery } = dashboardApi;
