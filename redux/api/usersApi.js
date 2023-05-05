import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a function to get the token from localStorage
const getToken = () => {
  const token = localStorage.getItem('accessToken');
  return token ? `Bearer ${token}` : '';
};

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://writing-hat-api.vercel.app/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `/users/1`,
        method: 'GET',
        headers: {
          Authorization: getToken(),
        },
      }),
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }),
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery, useRegisterUserMutation } = usersApi;
