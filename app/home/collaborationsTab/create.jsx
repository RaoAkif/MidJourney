import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAddStoryMutation } from "../../../redux/api/storiesApi";
import { useSelector } from "react-redux";
import TopHatContainer from "../../../components/ui/TopHatContainer";
import Container from "../../../components/ui/Container";
import Tabs from "../../../components/Tabs";
import { ScrollView } from "react-native";
import tw from "../../../utils/tailwind";
import Button from "../../../components/ui/Button";
import { useCreateStory } from "../../../utils/api/storiesHook";

const promptCategories = ["", "Poetry", "Prose", "Cooking", "Games", "Leisure", "Art", "Craft", "Play"];

const initialFormData = {
  promptCategory: "",
  title: "",
  description: "",
};

const Create = () => {
  const promptCategoryRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const { id: userId } = useSelector((state) => state.auth.userInfo);

  // const [addStory, { data, error, isLoading }] = useAddStoryMutation();
  const { mutate: addStory, data, error, isPending } = useCreateStory();

  const validateForm = () => {
    console.log("button pressed");
    let isValid = true;
    const newErrors = {};

    if (!formData.promptCategory || !formData.title.trim() || !formData.description.trim()) {
      newErrors.error1 = "All fields are required.";
      isValid = false;
    }

    if (!formData.promptCategory) {
      newErrors.promptCategoryError = "Please select a category.";
      isValid = false;
    }

    if (!formData.title) {
      newErrors.titleError = "Please enter a story title.";
      isValid = false;
    }

    if (!formData.description) {
      newErrors.descriptionError = "Please enter a story description.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddStory = () => {
    if (validateForm()) {
      addStory({
        promptCategoryId: promptCategories.indexOf(formData.promptCategory),
        title: formData.title,
        description: formData.description,
        userId,
      });

      // Clear the form fields
      setFormData(initialFormData);
      setErrors({});

      // Clear the input fields using refs
      promptCategoryRef.current = "";
      titleRef.current.clear();
      descriptionRef.current.clear();
    }
  };

  const handleFieldChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (data) console.log(data);
  if (error) console.log(error.message);

  const { promptCategory, title, description } = formData;

  const descriptionTotalCount = 1000 - description.length;
  const descriptionCount = 150 - description.length;

  return (
    <Container>
      <TopHatContainer />

      <Tabs
        title1="Collaborate"
        title2="Create"
        href1="/home/collaborationsTab/collaborate"
        href2="/home/collaborationsTab/create"
        active2
      />
      <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
        <View style={tw`flex-col justify-between pt-6 px-6`}>
          <View style={styles.categoryInputContainer}>
            <Picker
              ref={promptCategoryRef}
              selectedValue={promptCategory}
              onValueChange={(itemValue) => handleFieldChange("promptCategory", itemValue)}
              style={styles.categoryPicker}
              itemStyle={styles.categoryPickerItem}
            >
              {promptCategories.map((category, index) => (
                <Picker.Item key={index} label={category || "Select Category"} value={category} />
              ))}
            </Picker>
          </View>
          {errors.promptCategoryError && <Text style={styles.fieldsErrorText}>{errors.promptCategoryError}</Text>}
          <View style={styles.titleInputContainer}>
            <TextInput
              ref={titleRef}
              style={styles.titleInput}
              placeholderTextColor="#727272"
              placeholder="Enter Title"
              value={title}
              onChangeText={(text) => handleFieldChange("title", text)}
            />
          </View>
          {errors.titleError && <Text style={styles.fieldsErrorText}>{errors.titleError}</Text>}
          <View style={styles.descriptionInputContainer}>
            <TextInput
              ref={descriptionRef}
              style={styles.descriptionInput}
              placeholderTextColor="#727272"
              placeholder="Enter first sentence of the story"
              multiline={true}
              numberOfLines={4}
              value={description}
              onChangeText={(text) => handleFieldChange("description", text)}
            />
            <Text
              style={[
                styles.descriptionTotalCountStyle,
                {
                  backgroundColor: descriptionTotalCount < 0 ? buttonbgColor : "#E6C495",
                  color: descriptionTotalCount < 0 ? "#FFFFFF" : textColor,
                },
              ]}
            >
              {descriptionTotalCount}
            </Text>
            <Text
              style={[
                styles.descriptionCountStyle,
                {
                  backgroundColor: descriptionCount < 0 ? buttonbgColor : "#E6C495",
                  color: descriptionCount < 0 ? "#FFFFFF" : textColor,
                },
              ]}
            >
              {descriptionCount}
            </Text>
          </View>
          {errors.descriptionError && <Text style={styles.fieldsErrorText}>{errors.descriptionError}</Text>}

          <Button onPress={handleAddStory} text={"Start Writing"} disabled={descriptionCount < 0} />
        </View>
      </ScrollView>
    </Container>
  );
};

export default Create;

const bgColor = "#fefbf6";
const bgWhite = "#ffffff";
const black = "#000000";
const buttonbgColor = "#e4504d";
const textColor = "#333332";

const styles = StyleSheet.create({
  categoryInputContainer: {
    flexDirection: "row",
    backgroundColor: bgWhite,
    marginBottom: 30,
    // elevation
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    color: black,
    opacity: 0.7,
  },
  categoryPicker: {
    width: "100%",
    height: "100%",
    color: textColor,
    opacity: 0.75,
    fontWeight: "bold",
  },
  categoryPickerItem: {
    fontSize: 16,
    color: textColor,
    opacity: 0.75,
    fontWeight: "700",
    textAlign: "center",
  },
  titleInputContainer: {
    height: 60,
    backgroundColor: bgWhite,
    marginBottom: "5px",
    // elevation
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginBottom: "12%",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionInputContainer: {
    height: 200,
    backgroundColor: bgWhite,
    marginBottom: "5px",
    // elevation
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginBottom: 50,
    // justifyContent: "center",
    // alignItems: "center",
  },
  titleInput: {
    textAlign: "center",
    fontSize: 16,
    color: textColor,
    opacity: 0.75,
    fontWeight: "bold",
    width: "100%",
    height: "100%",
  },
  descriptionInput: {
    textAlign: "center",
    fontSize: 16,
    color: textColor,
    opacity: 0.75,
    fontWeight: "bold",
    width: "100%",
    height: "100%",
    paddingTop: 30,
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

  fieldsErrorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    width: "80%",
    marginTop: -20,
    paddingBottom: 20,
  },
});
