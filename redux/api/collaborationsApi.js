import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const collaborationsApi = createApi({
  reducerPath: "collaborationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://writing-hat-api.vercel.app/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      console.log(token);
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getCollaborations: builder.query({
      query: () => ({ url: `/responses` }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCollaborationsQuery } = collaborationsApi;
