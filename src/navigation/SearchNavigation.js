import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchAlbum from "../screens/SearchAlbum";
import AlbumDetail from "../screens/AlbumDetail";

const Stack = createNativeStackNavigator();

export default function SearchStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Search Album">
            <Stack.Screen name="Search Album" component={SearchAlbum} />
            <Stack.Screen name="Album Details" component={AlbumDetail} />
        </Stack.Navigator>
    );
}
