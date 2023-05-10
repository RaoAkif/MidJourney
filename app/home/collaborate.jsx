import React from "react";
import { Link } from "expo-router";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function Collaborate() {
  const route = useRoute();
  const { storyId, collaborationId } = route.params;
  const navigation = useNavigation();

  // Get the stories and collaborations from the Redux store
  const stories = useSelector((state) => state.stories.stories);
  const collaborations = useSelector(
    (state) => state.collaborations.collaborations
  );

  // Filter the stories and collaborations to get the one with the matching ID
  const selectedStory = stories.find((story) => story.id === storyId);
  const selectedCollaboration = collaborations.find(
    (collaboration) => collaboration.id === collaborationId
  );

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
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image
          style={styles.goBackIcon}
          source={require("../../assets/left1.png")}
        />
      </TouchableOpacity>
      <View style={styles.storiesContainer}>
        {selectedStory && (
          <View style={styles.storyContainer}>
            <View style={styles.storyTextContainer}>
              <Text style={styles.storyTitle}>{selectedStory.title}</Text>
              <Text style={styles.storyDescription}>
                {selectedStory.description}
              </Text>
            </View>
          </View>
        )}
        {selectedCollaboration && (
          <View style={styles.storyContainer}>
            <View style={styles.storyTextContainer}>
              <Text style={styles.storyTitle}>
                {selectedCollaboration.title}
              </Text>
              <Text style={styles.storyDescription}>
                {selectedCollaboration.description}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.storyContainer}>
          <View style={styles.collaborationContainerInput}>
            <TextInput
              style={styles.collaborationInput}
              placeholderTextColor='#727272'
              placeholder='Collaborate on the story above'
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>
        <View style={styles.button}>
          <Link href='./myStories' asChild>
            <Text style={styles.buttonText}>Collaborate</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const bgColor = "#fefbf6";
const bgWhite = "#ffffff";
const black = "#000000";
const buttonbgColor = "#e4504d";

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
  goBack: {
    width: 20,
    height: 20,
    position: "absolute",
    left: "10px",
    top: "25px",
  },
  storiesContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120,
  },
  storyContainer: {
    // flex: 1,
    justifyContent: "end",
    alignItems: "baseline",
    width: "80%",
    backgroundColor: bgWhite,
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
    paddingTop: "15px",
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
    textAlign: "justify",
  },
  downArray: {
    marginTop: "10px",
  },
  collaborationContainerInput: {
    width: "100%",
    height: "100%",
  },
  collaborationInput: {
    fontSize: "16px",
    color: "#333332",
    textAlign: "center",
    paddingVertical: "10%",
  },
  button: {
    width: "80vw",
    height: 46,
    backgroundColor: buttonbgColor,
    textAlign: "center",
    justifyContent: "center",
    marginTop: "5vh",
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
  buttonText: {
    color: bgWhite,
    fontSize: "16px",
  },
});
