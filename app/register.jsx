import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

const bgColor = "#fefbf6";
const bgWhite = "#ffffff";
const black = "#000000";
const borderbgColor = "#aaaaaa";
const textColor = "#333332";
const buttonbgColor = "#e4504d";
const hatbgColor = "#d9d9d9";

export default function Register() {
  const [pseudonym, setPseudonym] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudonymError, setPseudonymError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (validateForm()) {
      // handleSubmit();
    }
  };

  function validateForm() {
    let isValid = true;

    if (!pseudonym.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      isValid = false;
    } else {
      console.log(
        `Registration success! Pseudonym: ${pseudonym}, Email: ${email}, Password: ${password}`
      );
      isValid = true;
    }

    if (!isAlphaNumeric(pseudonym)) {
      setPseudonymError("Pseudonym should be alphaNumeric.");
      isValid = false;
    } else {
      setPseudonymError("");
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }

    if (!isValidPassword(password)) {
      setPasswordError(
        "Password should be a mix of 8 uppercase/lowercase letters, numbers, & special characters."
      );
    } else {
      setPasswordError("");
    }

    return isValid;
  }

  const isAlphaNumeric = (text) => {
    const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
    return alphaNumericRegex.test(text);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

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
              value={pseudonym}
              onChangeText={(text) => setPseudonym(text)}
            />
            {pseudonymError !== "" && (
              <Text style={styles.fieldsErrorText}>{pseudonymError}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder='Enter Your Email'
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            {emailError !== "" && (
              <Text style={styles.fieldsErrorText}>{emailError}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder='Enter Your Password'
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {passwordError !== "" && (
              <Text style={styles.fieldsErrorText}>{passwordError}</Text>
            )}
          </View>
          {error ? (
            <Text style={styles.credentialsErrorText}>{error}</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.messageText}>
        "If you can tell stories, create characters, devise incidents, and have
        sincerity and passion, it doesn't matter a damn how you write" Somerset
        Maugham
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: bgColor,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "10vh",
  },
  contentContainer: {
    justifyContent: "end",
    alignItems: "center",
    width: "100%",
  },
  signupContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
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
    marginBottom: "12%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 50,
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
    marginVertical: "20px",
  },
  fieldsErrorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    width: "80%",
  },
  credentialsErrorText: {
    marginBottom: 25,
    color: "red",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    width: "80%",
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
