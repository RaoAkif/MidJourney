import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Image, Text, TextInput, Picker, TouchableOpacity } from "react-native";
import TopTabs2 from "../../components/TopTabs2";
import { useAddStoryMutation } from "../../redux/api/storiesApi";
import { useSelector } from "react-redux";

const promptCategories = ['', 'Poetry', 'Prose', 'Cooking', 'Games', 'Leisure', 'Art', 'Craft', 'Play'];

const initialFormData = {
  promptCategory: '',
  title: '',
  description: '',
};

const Create = () => {
  const promptCategoryRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const { id: userId } = useSelector((state) => state.auth.userInfo);

  const [addStory, { data, error, isLoading }] = useAddStoryMutation();

  useEffect(() => {
    if (data) console.log(data);
    if (error) console.log(error.data.message);
  }, [data, error]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.promptCategory || !formData.title.trim() || !formData.description.trim()) {
      newErrors.error1 = "All fields are required.";
      isValid = false;
    }

    if (!formData.promptCategory) {
      newErrors.promptCategoryError = 'Please select a category.';
      isValid = false;
    }

    if (!formData.title) {
      newErrors.titleError = 'Please enter a story title.';
      isValid = false;
    }

    if (!formData.description) {
      newErrors.descriptionError = 'Please enter a story description.';
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
        userId
      });
      
      // Clear the form fields
      setFormData(initialFormData);
      setErrors({});

      // Clear the input fields using refs
      promptCategoryRef.current.setNativeProps({ selectedValue: '' });
      titleRef.current.clear();
      descriptionRef.current.clear();
    }
  };

  const handleFieldChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  if (data) console.log(data);
  if (error) console.log(error.data.message);

  const { promptCategory, title, description } = formData;

  const descriptionTotalCount = 1000 - description.length;
  const descriptionCount = 150 - description.length;

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
      <TopTabs2 tab1='Collaborate' tab2='Create' activeTab='Create' />
      <View style={styles.inputContainers}>
        <View style={styles.categoryInputContainer}>
          <Picker
            ref={promptCategoryRef}
            selectedValue={promptCategory}
            onValueChange={(itemValue) => handleFieldChange("promptCategory", itemValue)}
            style={styles.categoryPicker}
            itemStyle={styles.categoryPickerItem}
          >
            {promptCategories.map((category, index) => (
              <Picker.Item key={index} label={category || 'Select Category'} value={category} />
            ))}
          </Picker>
        </View>
        {errors.promptCategoryError && <Text style={styles.fieldsErrorText}>{errors.promptCategoryError}</Text>}
        <View style={styles.titleInputContainer}>
          <TextInput
            ref={titleRef}
            style={styles.titleInput}
            placeholderTextColor='#727272'
            placeholder='Enter Title'
            value={title}
            onChangeText={(text) => handleFieldChange("title", text)}
          />
        </View>
        {errors.titleError && <Text style={styles.fieldsErrorText}>{errors.titleError}</Text>}
        <View style={styles.descriptionInputContainer}>
          <TextInput
            ref={descriptionRef}
            style={styles.descriptionInput}
            placeholderTextColor='#727272'
            placeholder='Enter first sentence of the story'
            multiline={true}
            numberOfLines={4}
            value={description}
            onChangeText={(text) => handleFieldChange("description", text)}
          />
          <Text style={[styles.descriptionTotalCountStyle, { backgroundColor: descriptionTotalCount < 0 ? buttonbgColor : "#E6C495", color: descriptionTotalCount < 0 ? "#FFFFFF" : textColor }]}>
            {descriptionTotalCount}
          </Text>
          <Text style={[styles.descriptionCountStyle, { backgroundColor: descriptionCount < 0 ? buttonbgColor : "#E6C495", color: descriptionCount < 0 ? "#FFFFFF" : textColor }]}>
            {descriptionCount}
          </Text>
        </View>
        {errors.descriptionError && <Text style={styles.fieldsErrorText}>{errors.descriptionError}</Text>}
        <View style={styles.button}>
          <TouchableOpacity
            onPress={handleAddStory}
            disabled={descriptionCount < 0}
            style={[styles.button, { backgroundColor: descriptionCount < 0 ? "rgb(229, 158, 157)" : "#e4504d" }]}
          >
            <Text style={styles.buttonText}>Start Writing</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Create;

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
  inputContainers: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 50,
  },
  categoryInputContainer: {
    width: "80vw",
    height: 60,
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
    justifyContent: "center",
    alignItems: "center",
    color: black,
    opacity: 0.7,
  },
  categoryPicker: {
    width: "100%",
    height: "100%",
    color: textColor,
    opacity: 0.75,
    fontWeight: 700,
  },
  categoryPickerItem: {
    fontSize: 16,
    color: textColor,
    opacity: 0.75,
    fontWeight: "700",
    textAlign: "center",
  },  
  titleInputContainer: {
    width: "80vw",
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
    width: "80vw",
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
    marginBottom: "12%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleInput: {
    fontSize: 16,
    color: textColor,
    opacity: 0.75,
    fontWeight: 700,
    width: "100%",
    height: "100%",
    paddingLeft: 10,
  },
  descriptionInput: {
    paddingLeft: 10,
    fontSize: 16,
    color: textColor,
    opacity: 0.75,
    fontWeight: 700,
    width: "100%",
    height: "100%",
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
  },
  buttonText: {
    color: bgWhite,
    fontSize: "16px",
  },
  fieldsErrorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    width: "80%",
    marginTop: -20,
    paddingBottom: 20,
  }
});
