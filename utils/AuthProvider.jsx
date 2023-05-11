import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { setToken } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export default function AuthProvider() {
  const dispatch = useDispatch();
  const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      return token ?? "";
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  useEffect(() => {
    getAccessToken().then((token) => dispatch(setToken(token)));
  }, []);

  return <Slot />;
}
