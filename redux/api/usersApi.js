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
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken
    console.log(token)
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
  },
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
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
        body: user,
      }),
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery, useRegisterUserMutation } = usersApi;
