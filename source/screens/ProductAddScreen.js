import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../redux/productReducer';

export default function ProductAddScreen({ navigation }) {
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.product);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');

  const handleAddProduct = async () => {
    if (!name || !description || !price || !stock || !category) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    const data = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
    };

    await dispatch(addProduct(data))
      .unwrap()
      .then(() => {
        Alert.alert('Başarılı', 'Ürün başarıyla eklendi.');
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setCategory('');
      })
      .catch((err) => {
        Alert.alert('Hata', err);
      });
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-900 justify-center items-center">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="px-6 py-8">
        <View className="flex-row items-center justify-center mb-8 relative">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full bg-gray-800 absolute left-0"
          >
            <Icon name="arrow-left" size={25} color="#fff" />
          </TouchableOpacity>

          <Text className="text-3xl text-white font-bold">Ürün Ekle</Text>
        </View>

        <View className="space-y-5 mt-5">

          <View className="bg-gray-800 rounded-2xl p-4 flex-row items-center">
            <Icon name="tag" size={24} color="#6366f1" />
            <TextInput
              placeholder="Ürün Adı"
              placeholderTextColor="#9ca3af"
              className="ml-4 text-white flex-1"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View className="bg-gray-800 rounded-2xl p-4 flex-row items-center mt-3">
            <Icon name="text" size={24} color="#6366f1" />
            <TextInput
              placeholder="Açıklama"
              placeholderTextColor="#9ca3af"
              className="ml-4 text-white flex-1"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          <View className="bg-gray-800 rounded-2xl p-4 flex-row items-center mt-3">
            <Icon name="currency-usd" size={24} color="#6366f1" />
            <TextInput
              placeholder="Fiyat"
              placeholderTextColor="#9ca3af"
              className="ml-4 text-white flex-1"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          <View className="bg-gray-800 rounded-2xl p-4 flex-row items-center mt-3">
            <Icon name="warehouse" size={24} color="#6366f1" />
            <TextInput
              placeholder="Stok"
              placeholderTextColor="#9ca3af"
              className="ml-4 text-white flex-1"
              keyboardType="numeric"
              value={stock}
              onChangeText={setStock}
            />
          </View>

          <View className="bg-gray-800 rounded-2xl p-4 flex-row items-center mt-3">
            <Icon name="shape-outline" size={24} color="#6366f1" />
            <TextInput
              placeholder="Kategori"
              placeholderTextColor="#9ca3af"
              className="ml-4 text-white flex-1"
              value={category}
              onChangeText={setCategory}
            />
          </View>

        </View>

        <TouchableOpacity
          onPress={handleAddProduct}
          className="mt-8 bg-indigo-600 p-5 rounded-2xl flex-row items-center justify-center"
        >
          <Icon name="plus" size={22} color="#fff" />
          <Text className="text-white text-base ml-2">Ürünü Ekle</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
