import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SearchAlbum from "../screens/SearchAlbum";
import AlbumDetail from "../screens/AlbumDetail";
import MusicMenu from "../screens/MusicMenu";
import Login from "../screens/LoginScreen";
import Favorite from "../screens/FavoriteAlbums";
import DetailFavorite from "../screens/DetailFavoriteAlbum";
import EditFavorite from "../screens/EditFavoriteAlbum";
import Settings from "../screens/SettingsScreen";
import AddScreen from "../screens/AddScreen";
import EditScreen from "../screens/EditScreen";
import ListeningScreen from "../screens/ListeningLists";
const Stack = createNativeStackNavigator();

export default function NavigationBooks(){
    return(
        //Maneja las navegaciones
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Search Album" component={SearchAlbum}/>
            <Stack.Screen name="Album Details" component={AlbumDetail}/>
            <Stack.Screen name="Principal Menu" component={MusicMenu}/>
            <Stack.Screen name="Favorite Albums" component={Favorite}/>
            <Stack.Screen name="Details" component={DetailFavorite}/>
            <Stack.Screen name="Edit" component={EditFavorite}/>
            <Stack.Screen name="Settings" component={Settings}/>
            <Stack.Screen name="List" component={ListeningScreen}/>
            <Stack.Screen name="Add" component={AddScreen}/>
            <Stack.Screen name="Edit Album" component={EditScreen}/>
            
            
        </Stack.Navigator>
    );
}

