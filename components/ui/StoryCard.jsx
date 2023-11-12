import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "../../utils/tailwind";
import { COLORS } from "../../utils/constants";

const StoryCard = ({ onPress, story }) => {
  return (
    <TouchableOpacity style={tw`mx-7 mb-1 bg-[${COLORS.bgWhite}] elevation`} onPress={onPress}>
      <View style={tw`flex-row `}>
        <Image
          style={tw`w-7 h-7 m-1`}
          source={{
            uri: "https://raw.githubusercontent.com/Immages/writinghat/main/caps/thinking_cap1.png",
          }}
        />

        <View style={tw`flex-1 w-full py-2`}>
          <Text style={tw`px-2 font-bold text-base leading-5 text-[#333332]`}>{story.title}</Text>
          <Text style={tw`px-2 py-2 text-base leading-5 text-[#333332]`}>
            {story.description.split(" ").slice(0, 25).join(" ")}
            {"..."}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StoryCard;
