import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../screens/SettingsScreen';
import LoginNavigation from "./LoginNavigation";
import LoginScreen from "../screens/LoginScreen";
const Stack = createNativeStackNavigator();

export default function SingOutNavigation() {
    return (
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Salir" component={LoginScreen} />
        </Stack.Navigator>
    );
}
