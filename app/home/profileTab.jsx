import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Container from "../../components/ui/Container";
import TopHatContainer from "../../components/ui/TopHatContainer";
import tw from "../../utils/tailwind";
import { logout } from "../../redux/slices/authSlice";
import { useLocalSearchParams } from "expo-router";
import { useGetUser } from "../../utils/api/usersHook";
import { ActivityIndicator } from "react-native";

import Hatimage from "../../components/ui/Hatimage";

export default function Profile() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const { id } = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  let colaborator = false;
  let userId = id;
  if (params.colaboratorId) {
    userId = params.colaboratorId;
    colaborator = true;
  }

  const { data: user, error, isLoading } = useGetUser(userId);

  return (
    <Container>
      <TopHatContainer />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text>An error occurred: {error.message}</Text>
      ) : (
        <>
          <View style={tw`flex-1 w-full justify-center items-center`}>
            <View style={styles.hatContainer}>
              <Hatimage style={styles.hat} hat={user.hat} />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.storiesContainer}>
                <View>
                  <Text style={styles.profileName}>{user?.pseudonym}</Text>
                </View>
                <View>
                  <View style={styles.storyItem}>
                    <Text style={styles.count}>{user?._count.prompt}</Text>
                    <Text style={styles.storyMessage} onPress={() => navigation.navigate("myStories")}>
                      Stories Created
                    </Text>
                  </View>
                  <View style={styles.storyItem}>
                    <Text style={styles.count}>{user?._count.response}</Text>
                    <Text style={styles.storyMessage} onPress={() => navigation.navigate("myCollaborations")}>
                      Stories Collaborated
                    </Text>
                  </View>
                </View>

                <View>
                  {!colaborator && (
                    <Text style={styles.editText} onPress={() => navigation.navigate("editProfile")}>
                      edit
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </>
      )}
      <View style={tw`pb-6  `}>
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <Text style={tw`text-base font-bold text-[#877965]`}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const bgColor = "#fefbf6";
const bgWhite = "#ffffff";
const black = "#000000";
const hatbgColor = "#bcbcbc";
const borderLine = "#d2d2d2";
const profileText = "#333";
const editText = "#979797";

const styles = StyleSheet.create({
  hatContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: hatbgColor,
    borderWidth: 1,
    backgroundColor: bgColor,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    margin: -45,
    zIndex: 1,
    marginLeft: "-80%",
    padding: 35,
  },
  hat: {
    width: 52,
    height: 52,
    transform: [{ rotate: "-45deg" }],
  },
  contentContainer: {
    // flex: 1,
    justifyContent: "flex-end",
    alignItems: "baseline",
    width: "70%",
    height: "50%",
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
  profileName: {
    padding: 10,
    paddingTop: 20,
    textAlign: "center",
    color: profileText,
    fontWeight: "bold",
  },
  storiesContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  storyItem: { flexDirection: "row", alignItems: "center" },
  count: {
    padding: 10,
    textAlign: "center",
    color: black,
    fontWeight: "bold",
    fontSize: 26,
  },
  storyMessage: {
    padding: 10,
    textAlign: "center",
    color: black,
    fontWeight: "bold",
  },
  editText: {
    padding: 10,
    textAlign: "center",
    color: editText,
    fontWeight: "bold",
    fontSize: 12,
  },
  options: {
    borderWidth: 1,
    borderColor: borderLine,
    backgroundColor: bgWhite,
    height: 62,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  optionsImage: {
    width: 45,
    height: 45,
  },
});
