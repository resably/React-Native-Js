import react from 'react';
import { HomeScreen } from '../screens'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function Navigation() {
    const Stack = createNativeStackNavigator();
    // const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

