import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Container from "../../../components/ui/Container";
import TopHatContainer from "../../../components/ui/TopHatContainer";
import { ActivityIndicator } from "react-native";
import Tabs from "../../../components/Tabs";
import tw from "../../../utils/tailwind";
import { useRouter } from "expo-router";
import { useGetStoriesByColabId } from "../../../utils/api/storiesHook";
import StoryCard from "../../../components/ui/StoryCard";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function MyCollaborations() {
  const { id: userId } = useSelector((state) => state.auth.userInfo);
  const { data: stories, error, isLoading } = useGetStoriesByColabId(userId);
  const router = useRouter();
  console.log(stories);

  return (
    <Container>
      <TopHatContainer />
      <Tabs
        title1="My Stories"
        title2="My Collaborations"
        href1="/home/storiesTab/myStories"
        href2="/home/storiesTab/myCollaborations"
        active2
      />
      <View style={tw`flex-1 w-full items-center pt-6`}>
        <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : error ? (
            <Text>An error occurred: {error.message}</Text>
          ) : stories?.length == 0 ? (
            <View style={tw.style("mx-7")}>
              <Card>
                <View style={tw`w-full items-center justify-center p-1`}>
                  <Text style={tw` text-base text-[#333332] font-bold mb-2 text-center`}>
                    You haven't collaborated with anybody yet
                  </Text>
                </View>
              </Card>
              <Button text="Collaborate Now" onPress={() => router.push("/home/collaborationsTab/collaborate")} />
            </View>
          ) : (
            stories.map((story) => (
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
