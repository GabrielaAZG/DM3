import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PrincipalMenu from "../screens/MusicMenu";
import SingOutNavigation from "./SIngOutNavigation";
import FavoriteNavigation from "./FavoriteNavigation";
import ListeningLists from "../screens/ListeningLists";
import SearchStackNavigator from "./SearchNavigation";
import SettingsScreen from "../screens/SettingsScreen";
import ListAddNavigation from "./ListAddNavigation";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Home':
                            iconName = 'home-outline';
                            break;
                        case 'Favorites':
                            iconName = 'heart-outline';
                            break;
                        case 'List':
                            iconName = 'list-outline';
                            break;
                        case 'Search':
                            iconName = 'search-outline';
                            break;
                        case 'Config':
                            iconName = 'settings-outline';
                            break;
                        default:
                            iconName = 'ellipse-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6200ee',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={PrincipalMenu} />
            <Tab.Screen name="Search" component={SearchStackNavigator} />
            <Tab.Screen name="Favorites" component={FavoriteNavigation} />
            <Tab.Screen name="List" component={ListAddNavigation} />
            <Tab.Screen name="Config" component={SettingsScreen} />
            
        </Tab.Navigator>
    );
}
