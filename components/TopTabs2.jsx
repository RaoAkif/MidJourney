import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    height: 6,
    width: "100%",
  },
  tabs: {
    flex: 1,
    backgroundColor: `#fff`,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: `rgba(203, 134, 41, 0.47)`,
  },
  tabText: {
    fontSize: 16,
    color: `rgba(49, 50, 50, 0.8)`,
    fontWeight: "bold",
  },
  activeTabText: {
    fontSize: 16,
    color: "#7A5A2E",
  },
});

export default function TopTabs2({ tab1, tab2, activeTab }) {
  const [activeTabState, setActiveTab] = useState(activeTab);
  const navigation = useNavigation();

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === tab1) {
      navigation.navigate("collaborations");
    } else if (tab === tab2) {
      navigation.navigate("create");
    }
  };

  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tabs, activeTabState === tab1 && styles.active]}
        onPress={() => handleTabPress(tab1)}
      >
        <Text style={[styles.tabText, activeTabState === tab1 && styles.activeTabText]}>{tab1}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabs, activeTabState === tab2 && styles.active]}
        onPress={() => handleTabPress(tab2)}
      >
        <Text style={[styles.tabText, activeTabState === tab2 && styles.activeTabText]}>{tab2}</Text>
      </TouchableOpacity>
    </View>
  );
}
