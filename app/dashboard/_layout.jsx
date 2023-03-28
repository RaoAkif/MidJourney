import { Tabs } from "expo-router";
import { Image, StyleSheet } from "react-native";
import Svg, {Circle, Rect} from 'react-native-svg'


const styles = StyleSheet.create({
  optionsImage: {
    width: 45,
    height: 45,
  }

})

export default function Layout() {
  return (
    <Tabs
     screenOptions={{
      headerShown: false,
      tabBarShowLabel: false
      
    }}>
      <Tabs.Screen
        options={{
          tabBarIcon: () =>  <Svg height="50%" width="50%" viewBox="0 0 100 100" >
          <Circle cx="40" cy="40" r="100" stroke="red" strokeWidth="1.5" />
        </Svg>

        }}
        name="collaborate"
      />
      <Tabs.Screen
        name="profile"
      />
      <Tabs.Screen
        name="read"
      />
    </Tabs>
  )
}
