import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TextInput, View, Image, Pressable } from "react-native";
import { login } from "../utils/slices/authSlice";
import { useDispatch } from "react-redux";

const bgColor = "#fefbf6";
const bgWhite = "#ffffff";
const black = "#000000";
const borderbgColor = "#aaaaaa";
const textColor = "#333332";
const buttonbgColor = "#e4504d";
const hatbgColor = "#d9d9d9";

export default function Landing() {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.signupContainer}>
          <View style={styles.hatContainer}>
            <Image style={styles.hat} source={require("../assets/thinking_cap1.png")} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Enter Your Psuedonym" />
          </View>
        </View>
        <View style={styles.button}>
          <Link href="./home/" asChild>
            <Text style={styles.buttonText}>Start Writing</Text>
          </Link>
        </View>
        <Pressable onPress={() => dispatch(login())}>
          <Text>Login</Text>
        </Pressable>
      </View>
      <Text style={styles.messageText}>
        &quot;If you can tell stories, create characters, devise incidents, and have sincerity and passion, it
        doesn&apos;t matter a damn how you write&quot; Somerset Maugham
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
    backgroundColor: bgColor,
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
    marginBottom: "12%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: borderbgColor,
    textAlign: "center",
    fontSize: 16,
    color: textColor,
    opacity: 0.75,
    fontWeight: 700,
    padding: 7,
  },

  button: {
    width: "70%",
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
  hatContainer: {
    backgroundColor: bgColor,
    width: 90,
    height: 82,
    borderRadius: "50%",
    borderColor: hatbgColor,
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
