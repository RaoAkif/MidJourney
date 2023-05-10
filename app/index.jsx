import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
} from "react-native";
import { COLORS } from "../utils/constants";
import { useLoginMutation } from "../redux/api/authApi";
import { login } from "../redux/slices/authSlice";
import { useNavigation, useRouter } from "expo-router";

export default function Landing() {
  const [pseudonym, setPseudonym] = useState("");
  const [password, setPassword] = useState("");
  const [pseudonymError, setPseudonymError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  
  const [loginUser, result] = useLoginMutation();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const router = useRouter()
  const nav = useNavigation()
  

  useEffect(() => {
    if (accessToken) {
    //  nav.navigate('home'); // navigate to home screen when accessToken is received
    }
  }, [accessToken]);

  const handleSubmit = async () => {
    try {
      const result = await loginUser({ pseudonym, password });
      if (result.error) {
        setErrorMessage(
          "Invalid Credentials: You have entered an invalid username or password"
        );
      } else {
        dispatch(login(result.data)); // dispatch login action with accessToken as payload
        await AsyncStorage.setItem('accessToken', result.data.accessToken); // save accessToken in local storage
      }
    } catch (error) {
      console.log(error);
    }
  };

  function validateForm() {
    let isValid = true;
    if (pseudonym.trim() === "") {
      setPseudonymError("Pseudonym is required");
      isValid = false;
    } else {
      setPseudonymError("");
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  }

  const handleOnPress = () => {
    if (validateForm()) {
      handleSubmit();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.signupContainer}>
          <View style={styles.hatContainer}>
            <Image
              style={styles.hat}
              source={{ uri: 'https://raw.githubusercontent.com/Immages/writinghat/main/caps/thinking_cap1.png' }}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Enter Your Psuedonym'
              value={pseudonym}
              onChangeText={(text) => setPseudonym(text)}
              onEndEditing={() => {
                if (pseudonym.trim() === "") {
                  setPseudonymError("Pseudonym is required");
                } else {
                  setPseudonymError("");
                }
              }}
            />
            {pseudonymError !== "" && (
              <Text style={styles.fieldsErrorText}>{pseudonymError}</Text>
            )}
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder='Enter Your Password'
              value={password}
              onChangeText={(text) => setPassword(text)}
              onEndEditing={() => {
                if (password.trim() === "") {
                  setPasswordError("Password is required");
                } else {
                  setPasswordError("");
                }
              }}
            />
            {passwordError !== "" && (
              <Text style={styles.fieldsErrorText}>{passwordError}</Text>
            )}
          </View>
        </View>
        {errorMessage && (
          <Text style={styles.credentialsErrorText}>{errorMessage}</Text>
        )}
        <View style={styles.button}>
          <Pressable onPress={handleOnPress}>
            <Text style={styles.buttonText}>Start Writing</Text>
          </Pressable>
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
    paddingTop: "20vh",
    backgroundColor: COLORS.bgColor,
    alignItems: "center",
    justifyContent: "space-between",
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
    marginTop: 20,
  },
  fieldsErrorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    width: "80%",
  },
  credentialsErrorText: {
    marginTop: -25,
    marginBottom: 15,
    color: "red",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    width: "80%",
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
  },
});
