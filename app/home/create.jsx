import { Link } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TextInput, Picker } from "react-native";
import TopTabs2 from "../../components/TopTabs2";

export default function Create() {
  const categories = ['', 'Poetry', 'Prose', 'Cooking', 'Games', 'Leisure', 'Art', 'Craft', 'Play'];
const [selectedCategory, setSelectedCategory] = useState('');

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
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.categoryPicker}
            itemStyle={styles.categoryPickerItem}
            dropdownIconColor={black}
          >
            {categories.map((category, index) => (
              <Picker.Item key={index} label={category || 'Select Category'} value={category} />
            ))}
          </Picker>
        </View>
        <View style={styles.titleInputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholderTextColor='#727272'
            placeholder='Enter Title'
          />
        </View>
        <View style={styles.descriptionInputContainer}>
          <TextInput
            style={styles.descriptionInput}
            placeholderTextColor='#727272'
            placeholder='Enter first sentence of the story'
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <View style={styles.button}>
          <Link href='./myStories' asChild>
            <Text style={styles.buttonText}>Start Writing</Text>
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
    textAlign: "center",
    fontSize: 16,
    color: textColor,
    opacity: 0.75,
    fontWeight: 700,
    width: "100%",
    height: "100%",
  },
  descriptionInput: {
    textAlign: "center",
    fontSize: 16,
    color: textColor,
    opacity: 0.75,
    fontWeight: 700,
    width: "100%",
    height: "100%",
    paddingTop: 30,
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
});
