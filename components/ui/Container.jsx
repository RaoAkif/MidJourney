import { View, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../utils/constants";
import { StatusBar } from "react-native";

const Container = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 50,
    flex: 1,
    backgroundColor: COLORS.bgColor,
    alignItems: "center",
  },
});

export default Container;
