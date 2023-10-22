import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import TopTabs from "../../components/TopTabs";
import { useGetStoriesQuery } from "../../redux/api/storiesApi";
import { setStories } from "../../redux/slices/storiesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Read from "./read";

const Stack = createStackNavigator();

function MyStoriesScreen() {
  const { id: userId } = useSelector((state) => state.auth.userInfo);
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
          source={{
            uri: "https://raw.githubusercontent.com/Immages/writinghat/main/caps/thinking_cap1.png",
          }}
        />
      </View>
      <TopTabs
        tab1='My Stories'
        tab2='My Collaborations'
        activeTab='My Stories'
      />
      <SafeAreaView style={styles.storiesContainer}>
        <ScrollView>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>An error occurred: {error.message}</Text>
          ) : (
            stories?.filter((story) => story.userId == userId).sort((a, b) => b.id -a.id).map((story) => (
              <TouchableOpacity
                key={story.id}
                style={styles.storyContainer}
                onPress={() => navigation.navigate("Read", { storyId: story.id })}
              >
                <View style={styles.storyTextContainer}>
                  <Image
                    style={styles.storyHat}
                    source={{
                      uri: "https://raw.githubusercontent.com/Immages/writinghat/main/caps/thinking_cap1.png",
                    }}
                  />
                  <View style={styles.storyTitleContainer}>
                    <Text style={styles.storyTitle}>{story.title}</Text>
                  </View>
                  <Text style={styles.storyDescription}>
                    {story.description.split(" ").slice(0, 25).join(" ")}
                    {"..."}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default function MyStories() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='My Stories'
        component={MyStoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Read'
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
    width: 60,
    height: 60,
  },
  storiesContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginLeft: '20%',
    marginTop: '10%', /* add margin-top instead of padding-top */
    marginBottom: '5%',
    overflowY: "scroll", /* enable vertical scrolling */
    height: "calc(100% - 50px)", /* set the height to fill remaining space after 50px */
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
  storyHat: {
    width: 30,
    height: 30,
    position: "absolute",
    left: 10,
    top: 4,
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
