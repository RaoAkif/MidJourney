import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://directus-production-9585.up.railway.app/items" }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (id) => `profile/${id}`,
    }),
  }),
});

export const { useGetProfileQuery } = userApi;
