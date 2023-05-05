import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import TopTabs from "../../components/TopTabs";
import { useGetStoriesQuery } from "../../redux/api/storiesApi";
import { setStories } from "../../redux/stories/getStoriesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import Read from "./read";

const Stack = createStackNavigator();

function MyStoriesScreen() {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const { data: stories, error, isLoading } = useGetStoriesQuery(token);

  useEffect(() => {
    if (stories) {
      dispatch(setStories(stories));
    }
  }, [stories, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.topHatContainer}>
        <Image
          style={styles.topHat}
          source={require("../../assets/thinking_cap1.png")}
        />
      </View>
      <TopTabs
        tab1="My Stories"
        tab2="My Collaborations"
        activeTab="My Stories"
      />
      <View style={styles.storiesContainer}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>An error occurred: {error.message}</Text>
        ) : (
          stories?.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={styles.storyContainer}
              onPress={() =>
                navigation.navigate("Read", { storyId: story.id })
              }
            >
              <View style={styles.storyTextContainer}>
                <Text style={styles.storyTitle}>{story.title}</Text>
                <Text style={styles.storyDescription}>
                  {story.description.split(" ").slice(0, 25).join(" ")}
                  {"..."}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
}

export default function MyStories() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Stories"
        component={MyStoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Read"
        component={Read}
        options={{
          title: "Read",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const bgColor = "#fefbf6";
const bgWhite = "#ffffff";
const black = "#000000";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    alignItems: "center",
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
    width: 80,
    height: 80,
  },
  storiesContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: 50,
  },
  storyContainer: {
    // flex: 1,
    justifyContent: "end",
    alignItems: "baseline",
    width: "80%",
    backgroundColor: bgWhite,
    marginBottom: 2,
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
  storyTextContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: "5px",
    paddingBottom: "5px",
  },
  storyTitle: {
    fontSize: "16px",
    color: "#333332",
    fontWeight: "bold",
  },
  storyDescription: {
    fontSize: "16px",
    color: "#333332",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingHorizontal: "10px",
  },
  downArray: {
    marginTop: "10px",
  },
});