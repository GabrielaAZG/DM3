import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SearchAlbum from "../screens/SearchAlbum";
import AlbumDetail from "../screens/AlbumDetail";
import MusicMenu from "../screens/MusicMenu";
import Login from "../screens/LoginScreen";
import SignUp from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function NavigationBooks(){
    return(
        //Maneja las navegaciones
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Search Album" component={SearchAlbum}/>
            <Stack.Screen name="Album Details" component={AlbumDetail}/>
            <Stack.Screen name="Principal Menu" component={MusicMenu}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Sign Up" component={SignUp}/>
        </Stack.Navigator>
    );
}

