import { api } from './rootApi';
import { BaseProduct } from 'components/ProductCards/products.interface';

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProductsByCategory: builder.query<BaseProduct[], string>({
      query: (category) => ({
        url: `api/products/${category}/`,
        method: 'GET',
        auth: false,
      }),
    }),
  }),
});

export const { useGetProductsByCategoryQuery } = productApi;
