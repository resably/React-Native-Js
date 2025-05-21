import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productReducer';

export default function ProductsScreen({ navigation }) {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const { isLoading, error } = useSelector((state) => state.product);


  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

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
        <View className="flex-row items-center justify-center mb-8 mt-4 relative">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full bg-gray-800 absolute left-0"
          >
            <Icon name="arrow-left" size={25} color="#fff" />
          </TouchableOpacity>

          <Text className="text-3xl text-white font-bold">Ürünler</Text>
        </View>

        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            onPress={() => navigation.navigate("ProductDetails", { id: product.id })}
            className="bg-gray-800 rounded-2xl p-5 mb-5 space-y-2"
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-xl text-white font-semibold">{product.name}</Text>
              <Text className="text-indigo-400 font-bold">{product.price} ₺</Text>
            </View>
            <Text className="text-gray-400">{product.description}</Text>
            <View className="flex-row items-center mt-1">
              <Icon name="warehouse" size={18} color="#9ca3af" />
              <Text
                className={`ml-2 ${product.stock < 5 ? "text-red-500" : "text-gray-400"
                  }`}
              >
                Stok: {product.stock}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        className="mt-6 bg-indigo-600 p-4 rounded-2xl flex-row items-center justify-center mb-4"
        onPress={() => navigation.navigate('AddProduct')}
        activeOpacity={0.8}
      >
        <Icon name="plus" size={22} color="#fff" />
        <Text className="text-white text-base ml-2">Yeni Ürün Ekle</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
                    