import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FavoriteAlbum from "../screens/FavoriteAlbums";
import DetailFavoriteAlbum from "../screens/DetailFavoriteAlbum";
import EditFavoriteAlbum from "../screens/EditFavoriteAlbum";

const Stack = createNativeStackNavigator();

export default function FavoriteNavigation() {
    return (
        <Stack.Navigator initialRouteName="Favorite Albums">
            <Stack.Screen name="Favorite Albums" component={FavoriteAlbum} />
            <Stack.Screen name="Details" component={DetailFavoriteAlbum} />
            <Stack.Screen name="Edit" component={EditFavoriteAlbum} />
        </Stack.Navigator>
    );
}
