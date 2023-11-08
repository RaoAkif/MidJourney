import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { setStories } from "../../../redux/slices/storiesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Container from "../../../components/ui/Container";
import TopHatContainer from "../../../components/ui/TopHatContainer";
import { ActivityIndicator } from "react-native";
import Tabs from "../../../components/Tabs";
import tw from "../../../utils/tailwind";
import { useRouter } from "expo-router";
import { useGetStories } from "../../../utils/api/storiesHook";
import StoryCard from "../../../components/ui/StoryCard";

export default function MyStories() {
  const { id: userId } = useSelector((state) => state.auth.userInfo);
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: stories, error, isLoading } = useGetStories();

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
                <StoryCard
                  key={story.id}
                  onPress={() => router.push({ pathname: "/home/read", params: { storyId: story.id } })}
                  story={story}
                />
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
    left: -8,
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
    paddingHorizontal: 30,
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
