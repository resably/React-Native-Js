import react from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';
import { useSelector } from 'react-redux';


export default function Navigation() {

    const { isAuth } = useSelector((state) => state.user);

    return (
        <NavigationContainer>
            {isAuth ? <UserNavigation /> : <AuthNavigation />}
        </NavigationContainer>
    );
}

