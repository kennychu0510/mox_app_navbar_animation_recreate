import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

export default function Page() {
  const route = useRoute()
  return (
    <View style={{flex: 1}}>
      {/* <Text>{route.name}</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({})