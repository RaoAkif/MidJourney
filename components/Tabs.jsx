import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import tw from "../utils/tailwind";

const Tabs = ({ href1, href2, title1, title2, active1 = false, active2 = false }) => {
  return (
    <View style={tw`mt-2 flex-row w-full`}>
      <Link
        href={href1}
        asChild
        style={tw`flex-1 py-3 text-base  text-center font-bold ${
          active1 ? "bg-[#cb862978] text-[#7A5A2E]" : "bg-white text-[#313232cc]"
        }`}
      >
        <Text>{title1}</Text>
      </Link>
      <Link
        href={href2}
        asChild
        style={tw`flex-1 py-3 text-base text-center  font-semibold ${
          active2 ? "bg-[#cb862978] text-[#7A5A2E]" : "bg-white text-[#313232cc]"
        }`}
      >
        <Text>{title2}</Text>
      </Link>
    </View>
  );
};

export default Tabs;
