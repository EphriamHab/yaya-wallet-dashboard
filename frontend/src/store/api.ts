import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SearchParams, TransactionResponse } from '../types/transaction';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/transactions',
  }),
  tagTypes: ['Transaction'],
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionResponse, { page?: number }>({
      query: ({ page = 1 }) => `/?p=${page}`,
      providesTags: ['Transaction'],
    }),
    searchTransactions: builder.mutation<TransactionResponse, SearchParams>({
      query: (params) => ({
        url: '/search',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useGetTransactionsQuery, useSearchTransactionsMutation } = transactionsApi;