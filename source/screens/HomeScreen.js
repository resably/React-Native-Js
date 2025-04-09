import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="self-center">Click</Text>
      <TouchableOpacity className="bg-blue-400 p-4 rounded-lg mt-4" onPress={() => navigation.navigate('Details')}>
        <Text className="text-white text-lg">Diğer Sayfa</Text>
        <Icon name="arrow-right" size={20} color="black" style={{ alignSelf: 'center' }} />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({})