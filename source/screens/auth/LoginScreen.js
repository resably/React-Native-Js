import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../redux/userReducer';

export default function LoginScreen({ navigation }) {

    const dispatch = useDispatch();

    const { isLoading, error } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        await dispatch(login({ email, password }))
    };

    if (isLoading) {
        return (
            <View className="flex-1 bg-gray-900 justify-center items-center">
                <ActivityIndicator size="large" color="#4F46E5" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-gray-900 px-8 justify-center"
        >
            <Text className="text-white text-4xl font-extrabold mb-8 text-center">Giriş Yap</Text>

            <View className="mb-6">
                <Text className="text-gray-400 mb-2">Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Emailinizi girin"
                    placeholderTextColor="#6B7280"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="bg-gray-800 text-white rounded-md px-4 py-3"
                />
            </View>

            <View className="mb-6">
                <Text className="text-gray-400 mb-2">Şifre</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Şifrenizi girin"
                    placeholderTextColor="#6B7280"
                    secureTextEntry
                    className="bg-gray-800 text-white rounded-md px-4 py-3"
                />
            </View>

            <TouchableOpacity
                onPress={handleLogin}
                className="bg-indigo-600 py-3 rounded-full mb-6 shadow-lg"
            >
                <Text className="text-white font-bold text-center text-lg">Giriş Yap</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text className="text-gray-400 text-center">
                    Hesabınız yok mu?{" "}
                    <Text className="text-indigo-500 font-semibold">Kayıt Ol</Text>
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({})