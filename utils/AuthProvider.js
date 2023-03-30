import { useStoreState } from "easy-peasy";
import { Slot, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";

export default function AuthProvider() {
  const router = useRouter();
  const segments = useSegments();
  const inHomeGroup = segments[0] === "home";

  const isLoggedIn = useStoreState((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn && !inHomeGroup) {
      router.replace("/home");
    } else if (!isLoggedIn && inHomeGroup) {
      router.replace("/");
    }
  }, [isLoggedIn, segments]);

  return <Slot />;
}
