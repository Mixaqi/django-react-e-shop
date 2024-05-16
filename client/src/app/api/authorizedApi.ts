import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store/store';
import { logoutUser, setUser } from '../../store/slices/authSlice';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  //add prepareHeaders
});

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const { getState } = api;
  const getStateTyped = getState as () => RootState;
  const auth = getStateTyped().auth;

  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 403 &&
    result.error.data === 'Access token is expired'
  ) {
    const refreshResult = await baseQuery(
      {
        method: 'POST',
        url: '/api/token/refresh/',
        body: {
          refresh: auth.refresh,
        },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const { access, refresh } = refreshResult.data as { access: string; refresh: string };

      if (access && refresh && auth.user) {
        api.dispatch(setUser({ user: auth.user, access, refresh }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logoutUser());
      }
    } else {
      api.dispatch(logoutUser());
    }
  }
  return result;
};
