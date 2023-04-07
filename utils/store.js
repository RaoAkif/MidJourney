import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { userApi } from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);
