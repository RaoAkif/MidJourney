import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import { COLORS } from "../utils/constants";

export default function Landing() {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.signupContainer}>
          <View style={styles.hatContainer}>
            <Image
              style={styles.hat}
              source={require("../assets/thinking_cap1.png")}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Enter Your Psuedonym'
            />
          </View>
        </View>
        <View style={styles.button}>
          <Link href='./home/profile' asChild>
            <Text style={styles.buttonText}>Start Writing</Text>
          </Link>
        </View>
      </View>
      <Text style={styles.messageText}>
        &quot;If you can tell stories, create characters, devise incidents, and
        have sincerity and passion, it doesn&apos;t matter a damn how you
        write&quot; Somerset Maugham
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 5,
    paddingTop: "10vh",
    backgroundColor: COLORS.bgColor,
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentContainer: {
    // flex: 1,
    justifyContent: "end",
    alignItems: "center",
    width: "100%",
    height: "60%",
  },
  signupContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    height: 200,
    backgroundColor: COLORS.bgWhite,
    // elevation
    shadowColor: COLORS.black,
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderbgColor,
    textAlign: "center",
    fontSize: 16,
    color: COLORS.textColor,
    opacity: 0.75,
    fontWeight: 700,
    padding: 7,
  },

  button: {
    width: "70%",
    height: 46,
    backgroundColor: COLORS.buttonbgColor,
    textAlign: "center",
    justifyContent: "center",
    // elevation
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  buttonText: {
    color: COLORS.bgWhite,
    fontSize: "16px",
  },
  hatContainer: {
    backgroundColor: COLORS.bgColor,
    width: 90,
    height: 82,
    borderRadius: "50%",
    borderColor: COLORS.hatbgColor,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    // elevation
    shadowColor: "#D9D9D9",
    opacity: 1,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.7,
    shadowRadius: 1,
    elevation: 7,
    // position: top
    marginBottom: -41,
    zIndex: 1,
  },
  hat: {
    width: 60,
    height: 60,
    padding: 10,
  },
  messageText: {
    padding: 10,
    textAlign: "center",
  },
});
