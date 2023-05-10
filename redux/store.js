import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import usersReducer from './slices/usersSlice'
import storiesReducer from './slices/storiesSlice'
import collaborationsReducer from './slices/collaborationsSlice'
import { authApi } from './api/authApi'
import { usersApi } from './api/usersApi'
import { storiesApi } from './api/storiesApi'
import { collaborationsApi } from './api/collaborationsApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [storiesApi.reducerPath]: storiesApi.reducer,
    [collaborationsApi.reducerPath]: collaborationsApi.reducer,
    auth: authReducer,
    users: usersReducer,
    stories: storiesReducer,
    collaborations: collaborationsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, storiesApi.middleware, collaborationsApi.middleware, usersApi.middleware),
})

setupListeners(store.dispatch)