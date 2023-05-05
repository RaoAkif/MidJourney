import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a function to get the token from localStorage
const getToken = () => {
  const token = localStorage.getItem('accessToken');
  return token ? `Bearer ${token}` : '';
};

// Define a service using a base URL and expected endpoints
export const storiesApi = createApi({
  reducerPath: 'storiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://writing-hat-api.vercel.app/api' }),
  endpoints: (builder) => ({
    getStories: builder.query({
      query: () => ({
        url: `/prompts`,
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
export const { useGetStoriesQuery } = storiesApi
