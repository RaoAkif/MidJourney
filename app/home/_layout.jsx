import { Tabs } from "expo-router";
import { Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  optionsImage: {
    width: 45,
    height: 45,
  },
  tabBar: {
    height: 65,
    paddingVertical: 10,
    paddingBottom: 10,
  },
  tabBarOption: {
    borderRightWidth: 1,
    borderColor: "#E0DFDF",
  },
});

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar
      }}
    >
      <Tabs.Screen
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        options={{
          tabBarItemStyle: styles.tabBarOption,
          tabBarIcon: () => (
            <Image
              style={styles.optionsImage}
              source={require("../../assets/write1.png")}
            />
          ),
        }}
        name='collaborate'
      />
      <Tabs.Screen
        options={{
          tabBarItemStyle: styles.tabBarOption,
          tabBarIcon: () => (
            <Image
              style={styles.optionsImage}
              source={require("../../assets/read1.png")}
            />
          ),
        }}
        name='read'
      />
      <Tabs.Screen
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.optionsImage}
              source={require("../../assets/profile1.png")}
            />
          ),
        }}
        name='profile'
      />
      <Tabs.Screen
        options={{
          href: null,
        }}
        name='collaborations'
      />
      <Tabs.Screen
        options={{
          href: null,
        }}
        name='myStories'
      />
      <Tabs.Screen
        options={{
          href: null,
        }}
        name='myCollaborations'
      />
      <Tabs.Screen
        options={{
          href: null,
        }}
        name='create'
      />
    </Tabs>
  );
}
