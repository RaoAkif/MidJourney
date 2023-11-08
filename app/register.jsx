import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import { useRegisterUserMutation } from "../redux/api/usersApi";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import tw from "../utils/tailwind";
import { COLORS } from "../utils/constants";
import { ScrollView } from "react-native";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";

export default function Register() {
  const [registerUser, { data, error, isLoading }] = useRegisterUserMutation();

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
              <Image
                style={styles.hat}
                source={{
                  uri: "https://raw.githubusercontent.com/Immages/writinghat/main/caps/thinking_cap1.png",
                }}
              />
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

            <View style={tw`w-full`}>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={tw`elevation w-full  h-12 bg-[${COLORS.buttonbgColor}] items-center justify-center`}
              >
                <Text style={tw`text-base text-[${COLORS.bgWhite}]`}>
                  {isLoading ? <ActivityIndicator /> : "Register"}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <Button onPress={handleSubmit(onSubmit)} text={"Register"} /> */}

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
