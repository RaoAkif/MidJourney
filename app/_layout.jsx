import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "easy-peasy";
import { Stack } from "expo-router";
import AuthProvider from "../utils/AuthProvider";

import { store } from "../utils/store";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="landing" />
            <Stack.Screen name="register" />

            <Stack.Screen name="home" />
            <Stack.Screen name="editProfile" />
          </Stack>
        </AuthProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}
