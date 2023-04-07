import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { store } from "../utils/store";
import { Provider } from "react-redux";
import AuthProvider from "../utils/AuthProvider";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="landing" />
            <Stack.Screen name="register" />

            <Stack.Screen name="home" />
            <Stack.Screen name="editProfile" />
          </Stack>
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}
