import React from "react";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { Stack } from "expo-router";
import AuthProvider from "../utils/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function _RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="register" />
            <Stack.Screen name="editProfile" />
            <Stack.Screen name="home" />
          </Stack>
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}
