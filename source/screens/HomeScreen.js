import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 bg-gray-900 px-8 pt-16">
      <Text className="text-white text-3xl font-extrabold mb-10 text-center">
        Hoşgeldiniz
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Products")}
        activeOpacity={0.8}
        className="bg-indigo-600 rounded-xl py-5 mb-6 shadow-lg"
      >
        <Text className="text-white font-bold text-center text-xl">Ürünler</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("AddProduct")}
        activeOpacity={0.8}
        className="bg-indigo-600 rounded-xl py-5 mb-6 shadow-lg"
      >
        <Text className="text-white font-bold text-center text-xl">Ürün Ekle</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => console.log("Satışlar")}
        activeOpacity={0.8}
        className="bg-indigo-600 rounded-xl py-5 shadow-lg"
      >
        <Text className="text-white font-bold text-center text-xl">Satışlar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})