import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Screen name="collaborate" />
      <Stack.Screen name="create" />
    </Stack>
  );
};

export default _layout;
