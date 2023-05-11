import React from "react";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { Stack } from "expo-router";
import AuthProvider from "../utils/AuthProvider";

export default function _RootLayout() {
  return (
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
  );
}
