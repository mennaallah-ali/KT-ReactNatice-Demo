import { Tabs } from 'expo-router'
// import { Text } from 'react-native'

import React from 'react'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'light',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // tabBarIcon: () => <Text>Home</Text>,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          // tabBarIcon: () => <Text>Explore</Text>,
        }}
      />
    </Tabs>
  )
}
