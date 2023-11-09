import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, TextInput, View, Image, Pressable } from "react-native";
import { useLoginMutation } from "../redux/api/authApi";
import { login } from "../redux/slices/authSlice";
import { Link, useNavigation } from "expo-router";
import { COLORS } from "../utils/constants";
import Container from "../components/ui/Container";
import tw from "../utils/tailwind";
import Button from "../components/ui/Button";
import { ScrollView } from "react-native";
import LodingModal from "../components/ui/LodingModal";

export default function Landing() {
  const pseudonymRef = useRef(null);
  const passwordRef = useRef(null);

  const [formData, setFormData] = useState({
    pseudonym: "",
    password: "",
    pseudonymError: "",
    passwordError: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const [loginUser, result] = useLoginMutation();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const nav = useNavigation();

  useEffect(() => {
    if (accessToken) {
      nav.navigate("home");
    }
  }, [accessToken]);

  const handleSubmit = async () => {
    try {
      const { pseudonym, password } = formData;
      const result = await loginUser({ pseudonym, password });
      if (result.error) {
        setErrorMessage("Invalid Credentials: You have entered an invalid username or password");
      } else {
        dispatch(login(result.data));
        await AsyncStorage.setItem("user", JSON.stringify(result.data));
        // Clear the form fields
        setFormData({
          pseudonym: "",
          password: "",
          pseudonymError: "",
          passwordError: "",
        });
        pseudonymRef.current.clear();
        passwordRef.current.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    const { pseudonym, password } = formData;
    const pseudonymError = pseudonym.trim() === "" ? "Pseudonym is required" : "";
    const passwordError = password.trim() === "" ? "Password is required" : "";
    setFormData((prevFormData) => ({
      ...prevFormData,
      pseudonymError,
      passwordError,
    }));
    return !pseudonymError && !passwordError;
  };

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOnPress = () => {
    if (validateForm()) {
      handleSubmit();
    }
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
                style={tw`w-14 h-14 p-3`}
                source={{ uri: "https://raw.githubusercontent.com/Immages/writinghat/main/caps/thinking_cap1.png" }}
              />
            </View>
            <View style={tw`h-52 bg-[${COLORS.bgWhite}] w-full elevation justify-center  mb-3 px-6`}>
              <TextInput
                ref={pseudonymRef}
                style={styles.input}
                placeholder="Enter Your Pseudonym"
                value={formData.pseudonym}
                onChangeText={(text) => handleInputChange("pseudonym", text)}
                onEndEditing={() => {
                  const pseudonymError = formData.pseudonym.trim() === "" ? "Pseudonym is required" : "";
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    pseudonymError,
                  }));
                }}
              />
              {formData.pseudonymError !== "" && <Text style={styles.fieldsErrorText}>{formData.pseudonymError}</Text>}
              <TextInput
                ref={passwordRef}
                style={styles.input}
                secureTextEntry
                placeholder="Enter Your Password"
                value={formData.password}
                onChangeText={(text) => handleInputChange("password", text)}
                onEndEditing={() => {
                  const passwordError = formData.password.trim() === "" ? "Password is required" : "";
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    passwordError,
                  }));
                }}
              />
              {formData.passwordError !== "" && <Text style={styles.fieldsErrorText}>{formData.passwordError}</Text>}
            </View>
          </View>
          {errorMessage && <Text style={styles.credentialsErrorText}>{errorMessage}</Text>}
          <Button onPress={handleOnPress} text={"Start Writing"} />

          <Link style={tw`mt-5 text-[#877965] font-medium text-base`} href={"/register"}>
            <Text>Register</Text>
          </Link>
        </View>
        <Text style={tw`text-center p-3`}>
          &quot;If you can tell stories, create characters, devise incidents, and have sincerity and passion, it
          doesn&apos;t matter a damn how you write&quot; Somerset Maugham
        </Text>
        <LodingModal visible={result.isLoading} text={"Logging In"} />
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderbgColor,
    // textAlign: "center",
    fontSize: 16,
    color: COLORS.textColor,
    opacity: 0.75,
    fontWeight: "bold",
    padding: 7,
    marginTop: 20,
  },
  fieldsErrorText: {
    color: "red",
    // textAlign: "center",
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
});
