import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a function to get the token from localStorage
const getToken = () => {
  const token = localStorage.getItem('accessToken');
  return token ? `Bearer ${token}` : '';
};

// Define a service using a base URL and expected endpoints
export const collaborationsApi = createApi({
  reducerPath: 'collaborationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://writing-hat-api.vercel.app/api' }),
  endpoints: (builder) => ({
    getCollaborations: builder.query({
      query: () => ({
        url: `/responses`,
        method: 'GET',
        headers: {
          Authorization: getToken(),
        },
      }),
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCollaborationsQuery } = collaborationsApi
