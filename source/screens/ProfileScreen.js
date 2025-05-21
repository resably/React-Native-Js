import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userReducer';


export default function ProfileScreen() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const { isLoading, error } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout());
    }

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
                <View className="items-center mb-10">
                    <View className="w-32 h-32 rounded-full bg-gray-800 border-2 border-indigo-500 flex items-center justify-center">
                        <Text className="text-white text-4xl font-bold">{user.name[0]}</Text>
                    </View>
                    <Text className="text-white text-2xl font-bold mt-5">{user.name} {user.surname}</Text>
                    <Text className="text-gray-400 mt-1">@{user.username}</Text>
                </View>

                <View className="space-y-6">
                    <View className="bg-gray-800 p-5 rounded-2xl flex-row items-center mt-1">
                        <Icon name="account" size={26} color="#6366f1" />
                        <View className="ml-4">
                            <Text className="text-gray-400 text-xs">Ad Soyad</Text>
                            <Text className="text-white text-lg mt-1">{user.name} {user.surname}</Text>
                        </View>
                    </View>

                    <View className="bg-gray-800 p-5 rounded-2xl flex-row items-center mt-3">
                        <Icon name="email" size={26} color="#6366f1" />
                        <View className="ml-4">
                            <Text className="text-gray-400 text-xs">E-posta</Text>
                            <Text className="text-white text-lg mt-1">{user.email}</Text>
                        </View>
                    </View>

                    <View className="bg-gray-800 p-5 rounded-2xl flex-row items-center mt-3">
                        <Icon name="account-circle" size={26} color="#6366f1" />
                        <View className="ml-4">
                            <Text className="text-gray-400 text-xs">Kullanıcı Adı</Text>
                            <Text className="text-white text-lg mt-1">{user.username}</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    className="mt-10 bg-indigo-600 rounded-2xl p-5 flex-row items-center justify-center"
                    onPress={() => console.log('Profili Düzenle')}
                >
                    <Icon name="pencil" size={22} color="#fff" />
                    <Text className="text-white text-base ml-2">Profili Düzenle</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="mt-3 bg-indigo-600 rounded-2xl p-5 flex-row items-center justify-center"
                    onPress={handleLogout}
                >
                    <Icon name="logout" size={22} color="#fff" />
                    <Text className="text-white text-base ml-2">Çıkış Yap</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({})