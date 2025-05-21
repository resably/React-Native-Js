import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById, deleteProduct } from '../redux/productReducer';
import React, { useEffect } from 'react';

export default function ProductDetails({ navigation }) {


    const dispatch = useDispatch();
    const route = useRoute();

    const { id } = route.params;
    const { selectedProduct, isLoading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [id]);

    const handleDelete = () => {
        Alert.alert(
            "Emin misiniz?",
            "Bu ürünü silmek istediğinize emin misiniz?",
            [
                {
                    text: "İptal",
                    style: "cancel",
                },
                {
                    text: "Evet",
                    onPress: () => {
                        dispatch(deleteProduct(id)).then(() => {
                            setTimeout(() => {
                                Alert.alert("Başarılı", "Ürün başarıyla silindi.");
                                navigation.goBack();
                            }, 100);
                        });
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const handleUpdate = () => {
        navigation.navigate("ProductEdit", { id: id });
    };

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

                    <Text className="text-3xl text-white font-bold">Ürün Detayı</Text>
                </View>

                <View className="bg-gray-800 rounded-2xl p-6 space-y-3">
                    <Text className="text-white text-2xl font-semibold">{selectedProduct.name}</Text>
                    <Text className="text-gray-400">{selectedProduct.description}</Text>

                    <View className="flex-row justify-between mt-2">
                        <Text className="text-indigo-400 font-bold text-lg">{selectedProduct.price} ₺</Text>
                        <Text className={`font-bold ${selectedProduct.stock < 5 ? 'text-red-500' : 'text-gray-400'}`}>
                            Stok: {selectedProduct.stock}
                        </Text>
                    </View>

                    <View className="flex-row items-center mt-3">
                        <Icon name="shape-outline" size={20} color="#9ca3af" />
                        <Text className="ml-2 text-gray-400">Kategori: {selectedProduct.category}</Text>
                    </View>

                    <View className="flex-row items-center mt-2">
                        <Icon name="calendar" size={20} color="#9ca3af" />
                        <Text className="ml-2 text-gray-400">Eklenme: {selectedProduct.createdAt}</Text>
                    </View>
                </View>

                {/* Butonlar */}
                <View className="mt-8 space-y-4">
                    <TouchableOpacity
                        onPress={handleUpdate}
                        className="bg-indigo-600 p-5 rounded-2xl flex-row items-center justify-center"
                    >
                        <Icon name="pencil" size={22} color="#fff" />
                        <Text className="text-white text-base ml-2">Ürünü Güncelle</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleDelete}
                        className="bg-red-600 p-5 rounded-2xl flex-row items-center justify-center mt-3"
                    >
                        <Icon name="trash-can-outline" size={22} color="#fff" />
                        <Text className="text-white text-base ml-2">Ürünü Sil</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

