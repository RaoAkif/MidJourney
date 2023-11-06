import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { useGetCollaborationsQuery } from "../../../redux/api/collaborationsApi";
import { setCollaborations } from "../../../redux/slices/collaborationsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Container from "../../../components/ui/Container";
import TopHatContainer from "../../../components/ui/TopHatContainer";
import { ActivityIndicator } from "react-native";
import Tabs from "../../../components/Tabs";
import tw from "../../../utils/tailwind";
import { useRouter } from "expo-router";

export default function MyCollaborations() {
  const { id: userId } = useSelector((state) => state.auth.userInfo);
  const router = useRouter();
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const { data: collaborations, error, isLoading } = useGetCollaborationsQuery(token);
  console.log(collaborations);

  useEffect(() => {
    if (collaborations) {
      dispatch(setCollaborations(collaborations));
    }
  }, [collaborations, dispatch]);

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
          ) : (
            collaborations
              ?.filter((collaboration) => collaboration.userId == userId)
              .sort((a, b) => b.id - a.id)
              .map((collaboration) => (
                <TouchableOpacity
                  key={collaboration.id}
                  style={styles.storyContainer}
                  onPress={() => router.push({ pathname: "/home/read", params: { storyId: collaboration.promptId } })}
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
