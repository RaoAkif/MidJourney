import React from "react";
import { Text, View } from "react-native";
import { TailwindProvider, useTailwind } from "tailwind-rn";
import utilities from "../tailwind.json";
import Landing from "./landing";

export default function Page() {
  return (
    <TailwindProvider utilities={utilities}>
      <Landing />
    </TailwindProvider>
  );
}

function Component() {
  const tw = useTailwind();
  return (
    <View style={tw("flex-1 justify-center")}>
      <View>
        <Text style={tw("text-red-700")}>Hello World</Text>
        <Text style={{ color: "red" }}>This is the first page of your app.</Text>
      </View>
    </View>
  );
}
