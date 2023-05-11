import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { login } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export default function AuthProvider() {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      return JSON.parse(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        dispatch(login(user));
      }
    });
  }, []);

  return <Slot />;
}
