import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { Button } from "react-native";
import { ActivityIndicator } from "react-native";
import { StyleSheet, View, Image, Text } from "react-native";
import { getProfile } from "../../utils/api";

const bgColor = "#fefbf6";
const bgWhite = "#ffffff";
const black = "#000000";
const hatbgColor = "#bcbcbc";
const borderLine = "#d2d2d2";
const profileText = "#333";
const editText = "#979797";

export default function Profile() {
  const { data, error, isLoading } = useQuery({ queryKey: ["profile", "1"], queryFn: getProfile });

  const router = useRouter();

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator />
      </View>
    );
  }
  if (error) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text>Error</Text>
      </View>
    );
  }

  if (data) {
    return (
      <View style={styles.container}>
        <View style={styles.topHatContainer}>
          <Image style={styles.topHat} source={require("../../assets/thinking_cap1.png")} />
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.hatContainer}>
            <Image style={styles.hat} source={require("../../assets/thinking_cap4_tilted.png")} />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.storiesContainer}>
              <View>
                <Text style={styles.profileName}>{data.name}</Text>
              </View>
              <View>
                <View style={styles.storyItem}>
                  <Text style={styles.count}>{data.stories_count}</Text>
                  <Text style={styles.storyMessage}>Stories Created</Text>
                </View>
                <View style={styles.storyItem}>
                  <Text style={styles.count}>{data.colab_count}</Text>
                  <Text style={styles.storyMessage}>Stories Collaborated</Text>
                </View>
              </View>
              <View>
                <Text style={styles.editText}>edit</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    alignItems: "center",
    justifyContent: "space-between",
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
    width: 80,
    height: 80,
  },
  profileContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  hatContainer: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    borderColor: hatbgColor,
    borderWidth: 1,
    backgroundColor: bgColor,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    margin: -45,
    zIndex: 1,
    marginLeft: "-80%",
  },
  hat: {
    width: 52,
    height: 52,
  },
  contentContainer: {
    // flex: 1,
    justifyContent: "end",
    alignItems: "baseline",
    width: "70%",
    height: "50%",
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
  profileName: {
    padding: 10,
    textAlign: "center",
    color: profileText,
    fontWeight: 700,
  },
  storiesContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  storyItem: { flexDirection: "row", alignItems: "center" },
  count: {
    padding: 10,
    textAlign: "center",
    color: black,
    fontWeight: 700,
    fontSize: 26,
  },
  storyMessage: {
    padding: 10,
    textAlign: "center",
    color: black,
    fontWeight: 700,
  },
  editText: {
    padding: 10,
    textAlign: "center",
    color: editText,
    fontWeight: 700,
    fontSize: 12,
  },
  options: {
    borderWidth: 1,
    borderColor: borderLine,
    backgroundColor: bgWhite,
    height: 62,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  optionsImage: {
    width: 45,
    height: 45,
  },
});
