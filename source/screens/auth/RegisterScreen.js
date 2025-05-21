import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../redux/userReducer'

export default function RegisterScreen({ navigation }) {

    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(state => state.user);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const handleRegister = () => {
        if (!username || !email || !password || !name || !surname) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        const userData = {
            username: username,
            email: email,
            password: password,
            name: name,
            surname: surname
        }

        dispatch(register(userData));

    };

    if (isLoading) {
        return (
            <View className="flex-1 bg-gray-900 justify-center items-center">
                <ActivityIndicator size="large" color="#4F46E5" />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-gray-900 px-8 justify-center"
        >
            <Text className="text-white text-4xl font-extrabold mb-8 text-center">Kayıt Ol</Text>

            <View className="mb-6">
                <Text className="text-gray-400 mb-2">İsim</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Adınızı girin"
                    placeholderTextColor="#6B7280"
                    autoCapitalize="none"
                    className="bg-gray-800 text-white rounded-md px-4 py-3"
                />
            </View>

            <View className="mb-6">
                <Text className="text-gray-400 mb-2">Soyisim</Text>
                <TextInput
                    value={surname}
                    onChangeText={setSurname}
                    placeholder="Soyadınızı girin"
                    placeholderTextColor="#6B7280"
                    autoCapitalize="none"
                    className="bg-gray-800 text-white rounded-md px-4 py-3"
                />
            </View>

            <View className="mb-6">
                <Text className="text-gray-400 mb-2">Kullanıcı Adı</Text>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Kullanıcı adınızı girin"
                    placeholderTextColor="#6B7280"
                    autoCapitalize="none"
                    className="bg-gray-800 text-white rounded-md px-4 py-3"
                />
            </View>

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
                onPress={handleRegister}
                className="bg-indigo-600 py-3 rounded-full mb-6 shadow-lg"
            >
                <Text className="text-white font-bold text-center text-lg">Kayıt Ol</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-gray-400 text-center">
                    Zaten bir hesabınız var mı?{" "}
                    <Text className="text-indigo-500 font-semibold">Giriş Yap</Text>
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({})