// import { Tabs } from "expo-router";
// import { Image, StyleSheet } from "react-native";

// const styles = StyleSheet.create({
//   optionsImage: {
//     width: 45,
//     height: 45,
//   },
//   tabStyling: {
//     paddingVertical: '10px',
//   }
// });

// export default function Layout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//       }}
//     >
//       <Tabs.Screen
//         options={{
//           tabBarIcon: () => (
//             <Image
//               style={styles.optionsImage}
//               source={require("../../assets/write1.png")}
//             />
//           ),
//         }}
//         name='collaborate'
//       />
//       <Tabs.Screen
//         options={{
//           tabBarIcon: () => (
//             <Image
//               style={styles.optionsImage}
//               source={require("../../assets/read1.png")}
//             />
//           ),
//         }}
//         name='read'
//       />
//       <Tabs.Screen
//         options={{
//           tabBarIcon: () => (
//             <Image
//               style={styles.optionsImage}
//               source={require("../../assets/profile1.png")}
//             />
//           ),
//         }}
//         name='profile'
//       />
//     </Tabs>
//   );
// }
