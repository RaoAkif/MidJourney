import React, { useState, useRef } from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { useRegisterUserMutation } from "../redux/api/usersApi";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import tw from "../utils/tailwind";
import { COLORS } from "../utils/constants";
import { ScrollView } from "react-native";
import { Link } from "expo-router";

export default function Register() {
  const pseudonymRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [state, setState] = useState({
    pseudonym: "",
    email: "",
    password: "",
    pseudonymError: "",
    emailError: "",
    passwordError: "",
    error1: "",
  });

  const { pseudonym, email, password, pseudonymError, emailError, passwordError, error1 } = state;

  const [registerUser, { data, error, isLoading }] = useRegisterUserMutation();

  const handleRegister = () => {
    const pseudonymValue = pseudonymRef.current.value;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (validateForm()) {
      registerUser({
        pseudonym: pseudonymValue,
        email: emailValue,
        password: passwordValue,
        city: "Lahore",
        country: "Pakistan",
        profileImage: "https://raw.githubusercontent.com/Immages/writinghat/main/caps/thinking_cap1.png",
      }).then(() => {
        // Clear the form fields
        pseudonymRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";

        // Clear the state
        setState({
          pseudonym: "",
          email: "",
          password: "",
          pseudonymError: "",
          emailError: "",
          passwordError: "",
          error1: "",
        });
      });
    }
  };

  const setErrorMessage = (field, message) => {
    setState((prevState) => ({
      ...prevState,
      [`${field}Error`]: message,
    }));
  };

  const validateInput = (pattern, input) => {
    const regex = new RegExp(pattern);
    return regex.test(input);
  };

  const isAlphaNumeric = (text) => {
    return validateInput(/^[a-zA-Z0-9]+$/, text);
  };

  const isValidEmail = (email) => {
    return validateInput(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, email);
  };

  const isValidPassword = (password) => {
    return validateInput(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, password);
  };

  const logError = (error) => {
    if (error) console.log(error.data.message);
  };

  const logData = (data) => {
    if (data) console.log(data);
  };

  const validateForm = () => {
    let isValid = true;

    const pseudonymValue = pseudonymRef.current.value;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (!pseudonymValue.trim() || !emailValue.trim() || !passwordValue.trim()) {
      setErrorMessage("pseudonym", "All fields are required.");
      isValid = false;
    } else {
      console.log(
        `Registration success! Pseudonym: ${pseudonymValue}, Email: ${emailValue}, Password: ${passwordValue}`
      );
      isValid = true;
    }

    if (!isAlphaNumeric(pseudonymValue)) {
      setErrorMessage("pseudonym", "Pseudonym should be alphanumeric.");
      isValid = false;
    } else {
      setErrorMessage("pseudonym", "");
    }

    if (!isValidEmail(emailValue)) {
      setErrorMessage("email", "Please enter a valid email address.");
      isValid = false;
    } else {
      setErrorMessage("email", "");
    }

    if (!isValidPassword(passwordValue)) {
      setErrorMessage(
        "password",
        "Password should be a mix of 8 uppercase/lowercase letters, numbers, & special characters."
      );
      isValid = false;
    } else {
      setErrorMessage("password", "");
    }

    return isValid;
  };

  return (
    <Container>
      <ScrollView style={tw`w-full`} contentContainerStyle={tw`flex-grow `} showsVerticalScrollIndicator={false}>
        <View style={tw`w-full items-center flex-1 justify-center px-8`}>
          <View style={tw`w-full items-center`}>
            <View
              style={tw`elevation z-10 bg-[${COLORS.bgColor}] w-20 h-20 rounded-full justify-center items-center -mb-10 `}
            >
              <Image
                style={styles.hat}
                source={{
                  uri: "https://raw.githubusercontent.com/Immages/writinghat/main/caps/thinking_cap1.png",
                }}
              />
            </View>
            <View style={tw` bg-[${COLORS.bgWhite}] w-full elevation justify-center items-center mb-3 py-12 px-6`}>
              <TextInput
                ref={pseudonymRef}
                style={styles.input}
                placeholder="Enter Your Psuedonym"
                value={pseudonym}
                onChangeText={(text) => setState((prevState) => ({ ...prevState, pseudonym: text }))}
              />
              {pseudonymError !== "" && <Text style={styles.fieldsErrorText}>{pseudonymError}</Text>}
              <TextInput
                ref={emailRef}
                style={styles.input}
                placeholder="Enter Your Email"
                value={email}
                onChangeText={(text) => setState((prevState) => ({ ...prevState, email: text }))}
              />
              {emailError !== "" && <Text style={styles.fieldsErrorText}>{emailError}</Text>}
              <TextInput
                ref={passwordRef}
                style={styles.input}
                placeholder="Enter Your Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setState((prevState) => ({ ...prevState, password: text }))}
              />
              {passwordError !== "" && <Text style={styles.fieldsErrorText}>{passwordError}</Text>}
            </View>
            {error1 ? <Text style={styles.credentialsErrorText}>{error1}</Text> : null}

            <Button onPress={handleRegister} text={"Register"} />

            <Link style={tw`mt-5 text-[#877965] font-medium text-base`} href={"/"}>
              <Text>Login</Text>
            </Link>
          </View>
        </View>
        <Text style={styles.messageText}>
          "If you can tell stories, create characters, devise incidents, and have sincerity and passion, it doesn't
          matter a damn how you write" Somerset Maugham
        </Text>
      </ScrollView>
    </Container>
  );
}

const bgColor = "#fefbf6";
const bgWhite = "#ffffff";
const black = "#000000";
const borderbgColor = "#aaaaaa";
const textColor = "#333332";
const buttonbgColor = "#e4504d";
const hatbgColor = "#d9d9d9";

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: borderbgColor,
    textAlign: "center",
    fontSize: 16,
    color: textColor,
    opacity: 0.75,
    fontWeight: "bold",
    padding: 7,
    marginVertical: 20,
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
    fontSize: 16,
  },
  hatContainer: {
    backgroundColor: bgColor,
    width: 90,
    height: 82,
    borderRadius: 50,
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
    width: 55,
    height: 55,
    padding: 10,
  },
  messageText: {
    padding: 10,
    textAlign: "center",
    marginBottom: 10,
  },
});
