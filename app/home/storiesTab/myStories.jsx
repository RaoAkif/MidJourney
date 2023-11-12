import { View, Text, ScrollView } from "react-native";
import Container from "../../../components/ui/Container";
import TopHatContainer from "../../../components/ui/TopHatContainer";
import { ActivityIndicator } from "react-native";
import Tabs from "../../../components/Tabs";
import tw from "../../../utils/tailwind";
import { useRouter } from "expo-router";
import { useGetStoriesByUserId } from "../../../utils/api/storiesHook";
import StoryCard from "../../../components/ui/StoryCard";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function MyStories() {
  const { data: stories, error, isLoading } = useGetStoriesByUserId();
  const router = useRouter();

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
          ) : stories == [] ? (
            <Text>No Stories</Text>
          ) : stories?.length === 0 ? (
            <View style={tw.style("mx-7")}>
              <Card>
                <View style={tw`w-full items-center justify-center p-1`}>
                  <Text style={tw` text-base text-[#333332] font-bold mb-2`}>You haven't written any story yet</Text>
                </View>
              </Card>
              <Button text="Write your first story now" onPress={() => router.push("/home/collaborationsTab/create")} />
            </View>
          ) : (
            stories
              ?.sort((a, b) => b.id - a.id)
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
