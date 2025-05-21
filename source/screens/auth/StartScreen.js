import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { autoLogin } from '../../redux/userReducer'


export default function StartScreen({ navigation }) {

    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(autoLogin())
    }, [])

    if (isLoading) {
        return (
            <View className="flex-1 bg-gray-900 justify-center items-center">
                <ActivityIndicator size="large" color="#4F46E5" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-900 justify-center items-center px-8">
            <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png" }}
                className="w-32 h-32 mb-8"
                resizeMode="contain"
            />
            <Text className="text-white text-4xl font-extrabold mb-4 text-center">
                Hoşgeldiniz!
            </Text>
            <Text className="text-gray-400 text-center mb-12 text-lg">
                Hesabınıza giriş yapın veya yeni hesap oluşturun
            </Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                className="bg-indigo-600 rounded-full py-3 w-full mb-4 shadow-lg"
            >
                <Text className="text-white font-bold text-center text-lg">
                    Giriş Yap
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                className="border border-gray-600 rounded-full py-3 w-full"
            >
                <Text className="text-gray-300 font-semibold text-center text-lg">
                    Kayıt Ol
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})