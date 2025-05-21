import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, fetchProductById } from "../redux/productReducer";

export default function ProductEditScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const { id } = route.params;
    const selectedProduct = useSelector((state) => state.product.selectedProduct);
    const loading = useSelector((state) => state.product.isLoading);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [id]);


    const handleUpdate = async () => {
        const productData = {};

        if (name !== selectedProduct.name) productData.name = name;
        if (description !== selectedProduct.description) productData.description = description;
        if (price !== String(selectedProduct.price)) productData.price = Number(price);
        if (stock !== String(selectedProduct.stock)) productData.stock = Number(stock);
        if (category !== selectedProduct.category) productData.category = category;

        if (Object.keys(productData).length === 0) {
            Alert.alert("Uyarı", "Değişen bir alan yok.");
            return;
        }

        await dispatch(updateProduct({ productId: id, productData: productData }))
            .unwrap()
            .then(() => {
                Alert.alert("Başarılı", "Ürün güncellendi.");
                navigation.goBack();
            })
            .catch((error) => {
                Alert.alert("Hata", error.message || "Güncelleme başarısız.");
            });
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-gray-900 justify-center items-center">
                <ActivityIndicator size="large" color="#6366f1" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-900">
            <ScrollView className="px-6 py-8">
                <View className="flex-row items-center justify-between mb-8">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full bg-gray-800">
                        <Icon name="arrow-left" size={25} color="#fff" />
                    </TouchableOpacity>
                    <Text className="text-3xl text-white font-bold">Ürün Düzenle</Text>
                    <View className="w-8" />
                </View>

                <View className="space-y-5">
                    <View style={{ backgroundColor: '#1f2937', borderRadius: 16, padding: 16, marginTop: 12 }}>
                        <Text style={{ color: '#9ca3af', fontSize: 12, marginBottom: 4, marginLeft: 4 }}>
                            Ürün Adı
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="tag" size={24} color="#6366f1" />
                            <TextInput
                                placeholder={selectedProduct.name}
                                placeholderTextColor="#9ca3af"
                                style={{ marginLeft: 16, color: 'white', flex: 1 }}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#1f2937', borderRadius: 16, padding: 16, marginTop: 12 }}>
                        <Text style={{ color: '#9ca3af', fontSize: 12, marginBottom: 4, marginLeft: 4 }}>
                            Açıklama
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="text" size={24} color="#6366f1" />
                            <TextInput
                                placeholder={selectedProduct.description}
                                placeholderTextColor="#9ca3af"
                                multiline
                                style={{ marginLeft: 16, color: 'white', flex: 1, }}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#1f2937', borderRadius: 16, padding: 16, marginTop: 12 }}>
                        <Text style={{ color: '#9ca3af', fontSize: 12, marginBottom: 4, marginLeft: 4 }}>
                            Fiyat
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="currency-usd" size={24} color="#6366f1" />
                            <TextInput
                                placeholder={selectedProduct.price.toString()}
                                placeholderTextColor="#9ca3af"
                                keyboardType="numeric"
                                style={{ marginLeft: 16, color: 'white', flex: 1 }}
                                value={price}
                                onChangeText={setPrice}
                            />
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#1f2937', borderRadius: 16, padding: 16, marginTop: 12 }}>
                        <Text style={{ color: '#9ca3af', fontSize: 12, marginBottom: 4, marginLeft: 4 }}>
                            Stok
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="warehouse" size={24} color="#6366f1" />
                            <TextInput
                                placeholder={selectedProduct.stock.toString()}
                                placeholderTextColor="#9ca3af"
                                keyboardType="numeric"
                                style={{ marginLeft: 16, color: 'white', flex: 1 }}
                                value={stock}
                                onChangeText={setStock}
                            />
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#1f2937', borderRadius: 16, padding: 16, marginTop: 12 }}>
                        <Text style={{ color: '#9ca3af', fontSize: 12, marginBottom: 4, marginLeft: 4 }}>
                            Kategori
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="shape-outline" size={24} color="#6366f1" />
                            <TextInput
                                placeholder={selectedProduct.category}
                                placeholderTextColor="#9ca3af"
                                style={{ marginLeft: 16, color: 'white', flex: 1 }}
                                value={category}
                                onChangeText={setCategory}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleUpdate}
                    disabled={loading}
                    className={`mt-8 p-5 rounded-2xl flex-row items-center justify-center ${loading ? 'bg-indigo-400' : 'bg-indigo-600'}`}
                >
                    <Icon name="content-save" size={22} color="#fff" />
                    <Text className="text-white text-base ml-2">
                        {loading ? 'Güncelleniyor...' : 'Güncelle'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
    );
};