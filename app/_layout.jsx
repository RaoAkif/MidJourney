import React from "react";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { Stack } from "expo-router";

export default function _RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='register' />
        <Stack.Screen name='editProfile' />
        <Stack.Screen name='home' />
      </Stack>
    </Provider>
  );
}
