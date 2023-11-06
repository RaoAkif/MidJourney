import React from "react";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { Stack } from "expo-router";
import AuthProvider from "../utils/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import tw from "../utils/tailwind";
import { COLORS } from "../utils/constants";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();

const toastConfig = {
  hatToast: ({ text1 }) => (
    <View style={tw`h-14 w-10/12 bg-[#cb862978] rounded-2xl border-black border-2 justify-center items-center`}>
      <Text style={tw`text-base  text-[${COLORS.textColor}] font-semibold pt-2 px-2`}>{text1}</Text>
    </View>
  ),
};

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
      <Toast config={toastConfig} />
      <StatusBar style="light" />
    </QueryClientProvider>
  );
}
