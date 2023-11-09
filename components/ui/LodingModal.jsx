import { View, Text } from "react-native";
import React from "react";
import { Modal } from "react-native";
import tw from "../../utils/tailwind";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../../utils/constants";

const LodingModal = ({ visible, text }) => {
  return (
    <Modal animationType="fade" visible={visible} transparent={true} statusBarTranslucent={true}>
      <View style={tw.style("flex-1 justify-center items-center bg-opacity-25 bg-black ")}>
        <View style={tw.style("w-52 py-4 m-5 bg-white rounded-md justify-center items-center elevation")}>
          <ActivityIndicator size={"large"} color={COLORS.borderbgColor} />
          <Text style={tw.style(`my-4 text-center text-base font-semibold text-[${COLORS.brownText}]`)}>
            {" "}
            {text ? text : "Loading"}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default LodingModal;
