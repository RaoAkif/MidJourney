import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { useGetUserQuery } from "../../redux/api/usersApi";
import { useSelector } from "react-redux";
import { setUsers } from "../../redux/slices/usersSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation();

  const { id } = useSelector((state) => state.auth.userInfo);

  const { data: user, error, isLoading } = useGetUserQuery(id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // only dispatch setUser if user is not undefined
      dispatch(setUsers(user));
    }
  }, [user, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.topHatContainer}>
        <Image
          style={styles.topHat}
          source={{ uri: "https://raw.githubusercontent.com/Immages/writinghat/main/caps/thinking_cap1.png" }}
        />
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.hatContainer}>
          <Image style={styles.hat} source={{ uri: user?.profileImage }} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.storiesContainer}>
            <View>
              <Text style={styles.profileName}>{user?.pseudonym}</Text>
            </View>
            <View>
              <View style={styles.storyItem}>
                <Text style={styles.count}>{user?.prompt.length}</Text>
                <Text style={styles.storyMessage} onPress={() => navigation.navigate("myStories")}>
                  Stories Created
                </Text>
              </View>
              <View style={styles.storyItem}>
                <Text style={styles.count}>{user?.response.length}</Text>
                <Text style={styles.storyMessage} onPress={() => navigation.navigate("myCollaborations")}>
                  Stories Collaborated
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.editText} onPress={() => navigation.navigate("editProfile")}>
                edit
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
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
  container: {
    flex: 1,
    backgroundColor: bgColor,
    alignItems: "center",
    justifyContent: "space-between",
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
    width: 70,
    height: 70,
    marginTop: 60,
  },
  profileContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  hatContainer: {
    width: 60,
    height: 60,
    borderRadius: "50%",
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
    justifyContent: "end",
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
    fontWeight: 700,
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
    fontWeight: 700,
    fontSize: 26,
  },
  storyMessage: {
    padding: 10,
    textAlign: "center",
    color: black,
    fontWeight: 700,
  },
  editText: {
    padding: 10,
    textAlign: "center",
    color: editText,
    fontWeight: 700,
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
