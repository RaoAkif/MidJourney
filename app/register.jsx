import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import Container from "../components/ui/Container";
import { COLORS } from "../utils/constants";
import { Link } from "expo-router";
import tw from "../utils/tailwind";
import Hatimage from "../components/ui/Hatimage";
import Button from "../components/ui/Button";
import LodingModal from "../components/ui/LodingModal";

import { useRegisterUser } from "../utils/api/usersHook";
import Toast from "react-native-toast-message";

export default function Register() {
  const { mutate: registerUser, data, error, isPending } = useRegisterUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors: formError },
  } = useForm({
    defaultValues: {
      pseudonym: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    registerUser({
      pseudonym: data.pseudonym,
      email: data.email,
      password: data.password,
      city: "Lahore",
      country: "Pakistan",
      profileImage: "https://raw.githubusercontent.com/Immages/writinghat/main/caps/thinking_cap1.png",
    });
    reset();
  };

  return (
    <Container>
      <ScrollView style={tw`w-full`} contentContainerStyle={tw`flex-grow `} showsVerticalScrollIndicator={false}>
        <View style={tw`w-full items-center flex-1 justify-center px-8`}>
          <View style={tw`w-full items-center`}>
            <View
              style={tw`elevation z-10 bg-[${COLORS.bgColor}] w-20 h-20 rounded-full justify-center items-center -mb-10 `}
            >
              <Hatimage style={tw`p-2 w-14 h-14`} hat={1} />
            </View>
            <View style={tw` bg-[${COLORS.bgWhite}] w-full elevation justify-center  mb-3 py-12 px-6`}>
              <Controller
                name="pseudonym"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={styles.input}
                    placeholder="Enter Your Psuedonym"
                  />
                )}
              />
              {formError.pseudonym && <Text style={styles.fieldsErrorText}>{formError.pseudonym.message}</Text>}

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "This field is required",
                  pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={styles.input}
                    placeholder="Enter Your Email"
                  />
                )}
              />

              {formError.email && <Text style={styles.fieldsErrorText}>{formError.email.message}</Text>}

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "This field is required",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={styles.input}
                    placeholder="Enter Your Password"
                    secureTextEntry={true}
                  />
                )}
              />

              {formError.password && <Text style={styles.fieldsErrorText}>{formError.password.message}</Text>}
            </View>

            <Button onPress={handleSubmit(onSubmit)} text={"Register"} />

            <Link style={tw`mt-5 text-[${COLORS.brownText}] font-medium text-base`} href={"/"}>
              <Text>Login</Text>
            </Link>
          </View>
        </View>
        <Text style={tw`p-3 mb-3 text-center`}>
          "If you can tell stories, create characters, devise incidents, and have sincerity and passion, it doesn't
          matter a damn how you write" Somerset Maugham
        </Text>
        <LodingModal visible={isPending} text={"Registring..."} />
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
    // textAlign: "center",
    fontSize: 16,
    color: textColor,
    opacity: 0.75,
    fontWeight: "bold",
    padding: 7,
    marginVertical: 20,
  },
  fieldsErrorText: {
    color: "red",
    // textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    width: "80%",
  },
  credentialsErrorText: {
    marginBottom: 25,
    color: "red",
    // textAlign: "center",
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
});
