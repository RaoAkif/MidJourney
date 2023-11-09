import { View, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { COLORS } from "../../utils/constants";
import { StatusBar } from "react-native";

const Container = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
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
