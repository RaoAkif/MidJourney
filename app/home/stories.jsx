import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { useGetCollaborationsQuery } from "../../redux/api/collaborationsApi";
import { setCollaborations } from "../../redux/slices/collaborationsSlice";
import { useGetStoriesQuery } from "../../redux/api/storiesApi";
import { setStories } from "../../redux/slices/storiesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Read from "./read";

const Stack = createStackNavigator();

function StoriesScreen() {
  const { id: userId } = useSelector((state) => state.auth.userInfo);
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const {
    data: collaborations,
    error: error1,
    isLoading: isLoading1,
  } = useGetCollaborationsQuery(token);
  const {
    data: stories,
    error: error2,
    isLoading: isLoading2,
  } = useGetStoriesQuery(token);

  useEffect(() => {
    if (collaborations) {
      dispatch(setCollaborations(collaborations));
    }
  }, [collaborations, dispatch]);

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
      <View style={styles.topTabBanner}>
        <Text style={styles.topTabBannerText}>My Stories and Collaborations</Text>
      </View>
      <SafeAreaView style={styles.storiesContainer}>
        <ScrollView>
          {isLoading1 || isLoading2 ? (
            <Text>Loading...</Text>
          ) : (error1 || error2) ? (
            <Text>An error occurred: {error1?.message || error2?.message}</Text>
          ) : (
            <>
              {collaborations?.length === 0 && stories?.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>You haven't written or collaborated yet!</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Create")}
                  >
                    <Text style={styles.buttonText}>Write Story Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("CollaborationsScreen")}
                  >
                    <Text style={styles.buttonText}>Collaborate Now</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  {collaborations
                    ?.filter((collaboration) => collaboration.userId === userId)
                    .sort((a, b) => b.id - a.id)
                    .map((collaboration) => (
                      <TouchableOpacity
                        key={collaboration.id}
                        style={styles.storyContainer}
                        onPress={() =>
                          navigation.navigate("Read", {
                            collaborationId: collaboration.id,
                          })
                        }
                      >
                        <View style={styles.storyTextContainer}>
                          <Text style={styles.storyTitle}>{collaboration.title}</Text>
                          <Text style={styles.storyDescription}>
                            {collaboration.description.split(" ").slice(0, 25).join(" ")}
                            {"..."}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  {stories
                    ?.filter((story) => story.userId === userId)
                    .sort((a, b) => b.id - a.id)
                    .map((story) => (
                      <TouchableOpacity
                        key={story.id}
                        style={styles.storyContainer}
                        onPress={() =>
                          navigation.navigate("Read", {
                            storyId: story.id,
                          })
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
                    ))}
                </>
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );  
};

export default function Stories() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Stories'
        component={StoriesScreen}
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
  storyHat: {
    width: 30,
    height: 30,
    position: "absolute",
    left: 10,
    top: 4,
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
  topTabBanner: {
    backgroundColor: "rgba(203, 134, 41, 0.47)",
    height: "6vh",
    width: "100%",
    paddingTop: "2vh",
  },
  topTabBannerText: {
    color: "rgba(49, 50, 50, 0.8)",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  }
});
