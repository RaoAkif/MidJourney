import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import usersReducer from "./users/getUsersSlice";
import storiesReducer from "./stories/getStoriesSlice";
import collaborationsReducer from "./collaborations/getCollaborationsSlice";
import { authApi } from "./api/authApi";
import { usersApi } from "./api/usersApi";
import { storiesApi } from "./api/storiesApi";
import { collaborationsApi } from "./api/collaborationsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import registerUserSlice from "./users/registerUserSlice";

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
    // registerUser: registerUserSlice, // add this line to the reducer object
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      storiesApi.middleware,
      collaborationsApi.middleware,
      usersApi.middleware
    ),
});

setupListeners(store.dispatch);
