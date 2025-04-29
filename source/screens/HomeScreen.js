import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-500 text-3xl align-center">Home Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})