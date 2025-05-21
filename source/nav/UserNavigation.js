import React from 'react';
import { HomeScreen, ProfileScreen, ProductsScreen, ProductAddScreen, ProductDetails, ProductEditScreen } from "../screens";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, tabBarStyle: { backgroundColor: '#111827', height: 50, borderTopWidth: 0 },
        tabBarActiveBackgroundColor: '#6366F1', tabBarInactiveBackgroundColor: '#9CA3AF', tabBarLabelStyle: { fontSize: 12, marginBottom: 5, color: 'white' },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => (<Icon name="home" size={30} color={'white'} />) }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: () => (<Icon name="account" size={30} color={'white'} />) }} />
    </Tab.Navigator>
  );
}

export default function UserNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="AddProduct" component={ProductAddScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="ProductEdit" component={ProductEditScreen} />
    </Stack.Navigator>
  );
}