import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View, Image, Text, TextInput } from "react-native";
import TopTabs2 from "../../components/TopTabs2";

export default function Create() {
  return (
    <View style={styles.container}>
      <View style={styles.topHatContainer}>
        <Image style={styles.topHat} source={require("../../assets/thinking_cap1.png")} />
      </View>
      <TopTabs2
        tab1="Collaborate"
        tab2="Create"
        activeTab="Create"
      />
      <View style={styles.inputContainers}>
        <View style={styles.titleInputContainer}>
          <TextInput style={styles.titleInput} placeholderTextColor="#727272" placeholder="Enter Title" />
        </View>
        <View style={styles.descriptionInputContainer}>
          <TextInput
            style={styles.descriptionInput}
            placeholderTextColor="#727272"
            placeholder="Enter first sentence of the story"
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <View style={styles.button}>
          <Link href="./myStories" asChild>
            <Text style={styles.buttonText}>Start Writing</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const bgColor = "#fefbf6";
const bgWhite = "#ffffff";
const black = "#000000";
const buttonbgColor = "#e4504d";
const textColor = "#333332";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    alignItems: "center",
  },
  topHatContainer: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    borderColor: bgColor,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  topHat: {
    width: 80,
    height: 80,
  },
  inputContainers: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 50,
  },

  titleInputContainer: {
    width: "80vw",
    height: 60,
    backgroundColor: bgWhite,
    marginBottom: "5px",
    // elevation
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginBottom: "12%",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionInputContainer: {
    width: "80vw",
    height: 200,
    backgroundColor: bgWhite,
    marginBottom: "5px",
    // elevation
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginBottom: "12%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleInput: {
    textAlign: "center",
    fontSize: 16,
    color: textColor,
    opacity: 0.75,
    fontWeight: 700,
    width: "100%",
    height: "100%",
  },
  descriptionInput: {
    textAlign: "center",
    fontSize: 16,
    color: textColor,
    opacity: 0.75,
    fontWeight: 700,
    width: "100%",
    height: "100%",
    paddingTop: 30,
  },
  button: {
    width: "80vw",
    height: 46,
    backgroundColor: buttonbgColor,
    textAlign: "center",
    justifyContent: "center",
    // elevation
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  buttonText: {
    color: bgWhite,
    fontSize: "16px",
  },
});