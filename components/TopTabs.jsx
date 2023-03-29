
import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
  tabscontainer: {
    flexDirection: "row",
    height: "6vh",
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
    fontWeight: "bold"
  },
  activeTabText: {
    fontSize: 16,
    color: "#7A5A2E",
  },
})

export default function TopTabs({tab1, tab2}) {
  return (
    <View style={styles.tabscontainer}>
      <View style={styles.tabs}>
        <Text style={styles.tabText}>{tab1}</Text>
      </View>
      <View style={[styles.tabs, styles.active]}>
        <Text style={[styles.tabText, styles.activeTabText]}>{tab2}</Text>
      </View>
    </View>
  )
}