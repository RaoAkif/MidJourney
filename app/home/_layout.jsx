import { Tabs } from "expo-router";
import { Image, StyleSheet } from "react-native";
import Write1 from "../../assets/write1.png";
import Write2 from "../../assets/write2.png";
import Profile1 from "../../assets/profile1.png";
import Profile2 from "../../assets/profile2.png";
import Read1 from "../../assets/read1.png";
import Read2 from "../../assets/read2.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";

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
  const accessToken = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    if (!accessToken) {
      navigation.navigate("/"); // navigate to home screen when accessToken is received
    }
  }, [accessToken]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="collaborationsTab"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        options={{
          tabBarItemStyle: styles.tabBarOption,
          tabBarIcon: ({ focused }) => <Image style={styles.optionsImage} source={focused ? Write2 : Write1} />,
        }}
      />
      <Tabs.Screen
        name="storiesTab"
        options={{
          tabBarItemStyle: styles.tabBarOption,
          tabBarIcon: ({ focused }) => <Image style={styles.optionsImage} source={focused ? Read2 : Read1} />,
        }}
      />
      <Tabs.Screen
        name="profileTab"
        options={{
          tabBarIcon: ({ focused }) => <Image style={styles.optionsImage} source={focused ? Profile2 : Profile1} />,
        }}
      />
      <Tabs.Screen
        options={{
          href: null,
        }}
        name="read"
      />
      <Tabs.Screen
        options={{
          href: null,
        }}
        name="stories"
      />

      <Tabs.Screen
        options={{
          href: null,
        }}
        name="collaborate"
      />
    </Tabs>
  );
}
