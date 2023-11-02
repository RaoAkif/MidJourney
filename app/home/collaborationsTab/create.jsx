import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TopHatContainer from "../../../components/ui/TopHatContainer";
import Container from "../../../components/ui/Container";
import Tabs from "../../../components/Tabs";
import Button from "../../../components/ui/Button";
import tw from "../../../utils/tailwind";
import { useSelector } from "react-redux";
import { useCreateStory } from "../../../utils/api/storiesHook";
import { useGetCategories } from "../../../utils/api/categoriesHook";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

const Create = () => {
  const { id: userId } = useSelector((state) => state.auth.userInfo);
  const { mutate: addStory, data, error, isPending } = useCreateStory();
  const { data: catagories } = useGetCategories();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors: formError },
  } = useForm({
    defaultValues: {
      promptCategory: "",
      title: "",
      description: "",
    },
  });

  const descriptionChars = watch("description").length;

  const onSubmit = (data) => {
    addStory({
      promptCategoryId: parseInt(data.promptCategory),
      title: data.title,
      description: data.description,
      userId,
    });

    reset();
  };

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
          {/* Category Picker */}
          <View style={styles.categoryInputContainer}>
            <Controller
              name="promptCategory"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  onBlur={onBlur}
                  selectedValue={value}
                  onValueChange={onChange}
                  style={styles.categoryPicker}
                  itemStyle={styles.categoryPickerItem}
                >
                  <Picker.Item label={"Select Category"} value={0} />
                  {catagories?.map((category, index) => (
                    <Picker.Item key={index} label={category.name || "Select Category"} value={category.id} />
                  ))}
                </Picker>
              )}
            />
          </View>
          {formError.promptCategory && <Text style={styles.fieldsErrorText}>{formError.promptCategory.message}</Text>}

          {/* Title Input  */}
          <View style={styles.titleInputContainer}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  style={styles.titleInput}
                  placeholderTextColor="#727272"
                  placeholder="Enter Title"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {formError.title && <Text style={styles.fieldsErrorText}>{formError.title.message}</Text>}

          {/* Description Input  */}
          <View style={styles.descriptionInputContainer}>
            <Controller
              name="description"
              control={control}
              rules={{
                required: "This field is required",
                maxLength: { value: 150, message: "story should have max 150 characters" },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  style={styles.descriptionInput}
                  placeholderTextColor="#727272"
                  placeholder="Enter first sentence of the story"
                  multiline={true}
                  numberOfLines={4}
                />
              )}
            />

            <Text
              style={[
                styles.descriptionTotalCountStyle,
                {
                  backgroundColor: descriptionChars < 0 ? buttonbgColor : "#E6C495",
                  color: descriptionChars < 0 ? "#FFFFFF" : textColor,
                },
              ]}
            >
              {descriptionChars}
            </Text>
            {/* <Text
              style={[
                styles.descriptionCountStyle,
                {
                  backgroundColor: descriptionCount < 0 ? buttonbgColor : "#E6C495",
                  color: descriptionCount < 0 ? "#FFFFFF" : textColor,
                },
              ]}
            >
              {descriptionCount}
            </Text> */}
          </View>
          {formError.description && <Text style={styles.fieldsErrorText}>{formError.description.message}</Text>}

          <Button onPress={handleSubmit(onSubmit)} text={"Start Writing"} />
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
