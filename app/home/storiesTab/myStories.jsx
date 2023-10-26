import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { useGetStoriesQuery } from "../../../redux/api/storiesApi";
import { setStories } from "../../../redux/slices/storiesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Container from "../../../components/ui/Container";
import TopHatContainer from "../../../components/ui/TopHatContainer";
import { ActivityIndicator } from "react-native";
import Tabs from "../../../components/Tabs";
import tw from "../../../utils/tailwind";
import { useRouter } from "expo-router";

export default function MyStories() {
  const { id: userId } = useSelector((state) => state.auth.userInfo);
  const router = useRouter();
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const { data: stories, error, isLoading } = useGetStoriesQuery(token);

  useEffect(() => {
    if (stories) {
      dispatch(setStories(stories));
    }
  }, [stories, dispatch]);

  return (
    <Container>
      <TopHatContainer />
      <Tabs
        title1="My Stories"
        title2="My Collaborations"
        href1="/home/storiesTab/myStories"
        href2="/home/storiesTab/myCollaborations"
        active1
      />
      <View style={tw`flex-1 w-full items-center pt-6`}>
        <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : error ? (
            <Text>An error occurred: {error.message}</Text>
          ) : (
            stories
              ?.filter((story) => story.userId == userId)
              .sort((a, b) => b.id - a.id)
              .map((story) => (
                <TouchableOpacity
                  key={story.id}
                  style={styles.storyContainer}
                  onPress={() => router.push({ pathname: "/home/read", params: { storyId: story.id } })}
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
      </View>
    </Container>
  );
}

const bgColor = "#fefbf6";
const bgWhite = "#ffffff";
const black = "#000000";

const styles = StyleSheet.create({
  storyHat: {
    width: 30,
    height: 30,
    position: "absolute",
    left: 10,
    top: 4,
  },
  storyContainer: {
    marginHorizontal: 30,
    backgroundColor: bgWhite,
    marginBottom: 5,
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
    paddingTop: 5,
    paddingBottom: 5,
  },
  storyTitle: {
    fontSize: 16,
    color: "#333332",
    fontWeight: "bold",
  },
  storyDescription: {
    fontSize: 16,
    color: "#333332",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  downArray: {
    marginTop: 10,
  },
});
