import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import TopTabs2 from "../../components/TopTabs2";
import { useGetStoriesQuery } from "../../redux/api/storiesApi";
import { useGetCollaborationsQuery } from "../../redux/api/collaborationsApi";
import { setStories } from "../../redux/slices/storiesSlice";
import { setCollaborations } from "../../redux/slices/collaborationsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function Collaborations() {
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data: stories, error1, isLoading1 } = useGetStoriesQuery(token);
  const {
    data: collaborations,
    error2,
    isLoading2,
  } = useGetCollaborationsQuery(token);

  useEffect(() => {
    if (stories) {
      dispatch(setStories(stories));
    }
  }, [stories, dispatch]);

  useEffect(() => {
    if (collaborations) {
      dispatch(setCollaborations(collaborations));
    }
  }, [collaborations, dispatch]);

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
      <TopTabs2 tab1='Collaborate' tab2='Create' activeTab='Collaborate' />
      <View style={styles.storiesContainer}>
        {isLoading1 ? (
          <Text>Loading...</Text>
        ) : error1 ? (
          <Text>An error occurred: {error1.message}</Text>
        ) : (
          stories?.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={styles.storyContainer}
              onPress={() =>
                navigation.navigate("collaborate", { storyId: story.id })
              }
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
        {isLoading2 ? (
          <Text>Loading...</Text>
        ) : error2 ? (
          <Text>An error occurred: {error2.message}</Text>
        ) : (
          collaborations?.map((collaboration) => (
            <TouchableOpacity
              key={collaboration.id}
              style={styles.storyContainer}
              onPress={() =>
                navigation.navigate("collaborate", {
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
          ))
        )}
      </View>
    </View>
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
