import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../utils/constants";

const TopHatContainer = ({ style }) => {
  return (
    <View style={(styles.topHatContainer, { ...style })}>
      <Image
        style={styles.topHat}
        source={{
          uri: "https://raw.githubusercontent.com/Immages/writinghat/main/caps/thinking_cap1.png",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topHatContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: COLORS.bgColor,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  topHat: {
    width: 60,
    height: 60,
  },
});
export default TopHatContainer;
