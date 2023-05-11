import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://writing-hat-api.vercel.app/api" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: (credentials) => ({
        url: `/auth`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = authApi;
