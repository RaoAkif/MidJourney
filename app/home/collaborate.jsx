import React, { useState, useRef } from "react";
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
import { useAddCollaborationMutation } from "../../redux/api/collaborationsApi";

export default function Collaborate() {
  const [myCollaborationDescription, setMyCollaborationDescription] = useState("");
  const [collaborationFieldError, setCollaborationFieldError] = useState("");
  const collaborationInputRef = useRef(null);

  
  const route = useRoute();
  const { storyId } = route.params;
  const navigation = useNavigation();

  const [addCollaboration, { data, error, isLoading }] =
    useAddCollaborationMutation();
    
  const { id: userId } = useSelector((state) => state.auth.userInfo);
  // Get the stories from the Redux store
  const stories = useSelector((state) => state.stories.stories);

  // Filter the stories to get the one with the matching ID
  const selectedStory = stories.find((story) => story.id === storyId);

  const handleAddCollaboration = () => {
    if (validateForm()) {
      addCollaboration({
        title: selectedStory.title,
        description: selectedStory.description + myCollaborationDescription,
        promptId: selectedStory.id,
        userId,
      });
  
      // Clear the form field
      setMyCollaborationDescription("");
      collaborationInputRef.current.clear(); // Clear the input field
    }
  };

  if (data) console.log(data);
  if (error) console.log(error.data.message);

  function validateForm() {
    if (!myCollaborationDescription) {
      setCollaborationFieldError("Please write something to collaborate.");
      return false;
    }
    setCollaborationFieldError("");
    return true;
  }

  // Update the description count dynamically
  const descriptionTotalCount = 1000 - (selectedStory.description + myCollaborationDescription).length;
  const descriptionCount = 150 - myCollaborationDescription.length;
  
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
        <View style={styles.storyContainer}>
          <View style={styles.collaborationContainerInput}>
            <TextInput
              ref={collaborationInputRef} // Set the ref for the input field
              style={styles.collaborationInput}
              placeholderTextColor='#727272'
              placeholder='Collaborate on the story above'
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => setMyCollaborationDescription(text)}
            />
            <Text style={[styles.descriptionTotalCountStyle, { backgroundColor: descriptionTotalCount < 0 ? buttonbgColor : "#E6C495", color: descriptionTotalCount < 0 ? "#FFFFFF" : textColor }]}>
              {descriptionTotalCount}
            </Text>
            <Text style={[styles.descriptionCountStyle, { backgroundColor: descriptionCount < 0 ? buttonbgColor : "#E6C495", color: descriptionCount < 0 ? "#FFFFFF" : textColor }]}>
              {descriptionCount}
            </Text>
          </View>
        </View>
        {collaborationFieldError ? (
          <Text style={styles.collaborationFieldErrorText}>
            {collaborationFieldError}
          </Text>
        ) : null}
        <View style={[styles.button, {backgroundColor: descriptionCount < 0 ? "rgb(229, 158, 157)" : "#e4504d"}]}>
          <TouchableOpacity onPress={handleAddCollaboration}  disabled={descriptionCount < 0}>
            <Text style={styles.buttonText}>Collaborate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const bgColor = "#fefbf6";
const bgWhite = "#ffffff";
const black = "#000000";
const buttonbgColor = "#e4504d";
const textColor = "#333332";

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
    left: 10,
    top: 25,
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
    paddingLeft: 10,
    paddingTop: 20,
  },
  descriptionCountStyle: {
    position: "absolute",
    top: -20,
    right: -20,
    padding: 5,
    paddingTop: 10,
    width: 40,
    height: 40,
    textAlign: "center",
    borderRadius: 20,
    color: textColor,
    fontWeight: "bold",
  },
  descriptionTotalCountStyle: {
    position: "absolute",
    bottom: -20,
    right: -20,
    padding: 5,
    paddingTop: 12,
    width: 45,
    height: 45,
    textAlign: "center",
    borderRadius: 20,
    color: textColor,
    fontWeight: "bold",
  },
  button: {
    width: "80vw",
    height: 46,
    backgroundColor: buttonbgColor,
    textAlign: "center",
    justifyContent: "center",
    // elevation
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: 32,
  },
  buttonText: {
    color: bgWhite,
    fontSize: "16px",
  },
  collaborationFieldErrorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});
