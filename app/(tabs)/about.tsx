import { StyleSheet, View, Text } from 'react-native'

export default function AboutScreen() {
  return (
    <View style={styles.header}>
      <Text>About page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
  },
})
