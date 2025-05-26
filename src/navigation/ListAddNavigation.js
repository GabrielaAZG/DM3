import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListeningLists from "../screens/ListeningLists";
import AddScreen from "../screens/AddScreen";
import EditScreen from "../screens/EditScreen";

const Stack = createNativeStackNavigator();

export default function ListAddNavigation() {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={ListeningLists} />
            <Stack.Screen name="Add" component={AddScreen} />
            <Stack.Screen name="Edit Album" component={EditScreen} />
            
            
        </Stack.Navigator>
    );
}
