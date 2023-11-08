import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { setStories } from "../../../redux/slices/storiesSlice";
import { useDispatch } from "react-redux";
import Container from "../../../components/ui/Container";
import TopHatContainer from "../../../components/ui/TopHatContainer";
import { ActivityIndicator } from "react-native";
import Tabs from "../../../components/Tabs";
import tw from "../../../utils/tailwind";
import { useRouter } from "expo-router";
import { useGetStories } from "../../../utils/api/storiesHook";
import { COLORS } from "../../../utils/constants";
import StoryCard from "../../../components/ui/StoryCard";

export default function Collaborate() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: stories, error, isLoading } = useGetStories();

  return (
    <Container>
      <TopHatContainer />

      <Tabs
        title1="Collaborate"
        title2="Create"
        href1="/home/collaborationsTab/collaborate"
        href2="/home/collaborationsTab/create"
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
              ?.filter((story) => story.userId !== 1)
              .map((story) => (
                <StoryCard
                  key={story.id}
                  onPress={() => router.push({ pathname: "/home/collaborate", params: { storyId: story.id } })}
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
});
