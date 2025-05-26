import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import loginScreen from '../screens/LoginScreen';
import PrincipalMenu from "../screens/MusicMenu";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function LoginNavigation() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={loginScreen} />
            <Stack.Screen name="Menu" component={TabNavigator}

                          
            />
        </Stack.Navigator>
    );
}
