import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View, Image, Text, TextInput } from "react-native";

const bgColor = "#fefbf6";
const bgWhite = "#ffffff";
const black = "#000000";
const buttonbgColor = "#e4504d";

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
  goBack: {
    width: 20,
    height: 20,
    position: "absolute",
    left: "10px",
    top: "25px",
  },
  storiesContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120,
  },
  storyContainer: {
    // flex: 1,
    justifyContent: "end",
    alignItems: "baseline",
    width: "80%",
    backgroundColor: bgWhite,
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
  storyTextContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: "15px",
    paddingBottom: "5px",
  },
  storyTitle: {
    fontSize: "16px",
    color: "#333332",
    fontWeight: "bold",
  },
  storyDescription: {
    fontSize: "16px",
    color: "#333332",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingHorizontal: "10px",
    textAlign: "justify",
  },
  downArray: {
    marginTop: "10px",
  },
  collaborationContainerInput: {
    width: "100%",
    height: "100%",
  },
  collaborationInput: {
    fontSize: "16px",
    color: "#333332",
    textAlign: "center",
    paddingVertical: "10%",
  },
  button: {
    width: "80vw",
    height: 46,
    backgroundColor: buttonbgColor,
    textAlign: "center",
    justifyContent: "center",
    marginTop: "5vh",
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

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.topHatContainer}>
        <Image
          style={styles.topHat}
          source={require("../../assets/thinking_cap1.png")}
        />
      </View>
      <View style={styles.goBack}>
        <Image
          style={styles.goBackIcon}
          source={require("../../assets/left1.png")}
        />
      </View>
      <View style={styles.storiesContainer}>
        <View style={styles.storyContainer}>
          <View style={styles.storyTextContainer}>
            <Text style={styles.storyTitle}>Sleep Hollow</Text>
            <Text style={styles.storyDescription}>No other sounds were ever heard from the basement anymore. They always wondered if the ghost had finally  dissappeared from the house. No other sounds were ever heard from the dusty basement anymore. They always would wonder if the ghost had finally left and dissappeared from the house</Text>
          </View>
        </View>
        <View style={styles.storyContainer}>
          <View style={styles.collaborationContainerInput}>
            <TextInput
              style={styles.collaborationInput}
              placeholderTextColor='#727272'
              placeholder='Collaborate on the story above'
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>
        <View style={styles.button}>
          <Link href='./myStories' asChild>
            <Text style={styles.buttonText}>Collaborate</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
