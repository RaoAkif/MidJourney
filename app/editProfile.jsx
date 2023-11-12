import { useSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View, Image, Text, TextInput } from "react-native";
import Container from "../components/ui/Container";
import Hatimage from "../components/ui/Hatimage";

export default function EditProfile() {
  const params = useSearchParams();
  // console.log(params);
  return (
    <View style={styles.container}>
      <View>
        <Hatimage style={styles.hatTop} hat={1} />
      </View>
      <View>
        <Text style={styles.screenMessage}>Pick Your Writing Hat</Text>
      </View>
      <View style={styles.hatsContainer}>
        <View style={styles.hatsList}>
          <View style={styles.hatContainer}>
            <Hatimage style={styles.hatTop} hat={1} />
          </View>
          <View style={styles.hatContainer}>
            <Hatimage style={styles.hatTop} hat={2} />
          </View>
          <View style={styles.hatContainer}>
            <Hatimage style={styles.hatTop} hat={3} />
          </View>
          <View style={styles.hatContainer}>
            <Hatimage style={styles.hatTop} hat={4} />
          </View>
          <View style={styles.hatContainer}>
            <Hatimage style={styles.hatTop} hat={5} />
          </View>
          <View style={styles.hatContainer}>
            <Hatimage style={styles.hatTop} hat={6} />
          </View>
        </View>
      </View>
      <TextInput style={styles.input} placeholder="Enter Your Psuedonym" />
      <TextInput style={styles.input} placeholder="Enter Your Email" />
    </View>
  );
}

const bgColor = "#fefbf6";
const black = "#000000";
const borderbgColor = "#aaaaaa";
const textColor = "#333332";
const borderColor = "#bcbcbc";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: "50%",
  },
  hat: {
    width: 80,
    height: 80,
    padding: 10,
  },
  screenMessage: {
    color: black,
    opacity: 0.5,
    fontSize: 16,
    fontWeight: "bold",
  },
  hatsContainer: {
    width: "90%",
    height: "30%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  hatsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "90%",
  },
  hatContainer: {
    width: 80,
    height: 80,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor,
    borderWidth: 1,
    borderRadius: 50,
  },
  hat: {
    width: 50,
    height: 50,
  },
  hatTop: {
    width: 70,
    height: 70,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: borderbgColor,
    textAlign: "center",
    fontSize: 16,
    color: textColor,
    opacity: 0.75,
    fontWeight: "bold",
    padding: 7,
  },
});
