import React, {useState} from "react";
import {View, Text, TextInput, SafeAreaView, Image, StyleSheet, Alert, Platform, BackHandler,TouchableOpacity} from "react-native";

export default function LoginScreen({navigation}){
    
    

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    
          

    const exitApp = () => {
        if (Platform.OS === "android") {
            BackHandler.exitApp(); 
        } else {
            Alert.alert(
                "Close App",
                "To exit the app, press the home button or swipe up.",
                [{ text: "OK" }]
            );
        }
    };

   
   

    const goToRegister = () => {
        navigation.navigate("SignUp");
    };

    return(
        
        <SafeAreaView style={styles.fondo}>
            
                
           
            
            <View style={styles.container} >
                
                <TextInput style={styles.input} placeholder="USER" value= {user} onChangeText={setUser}/>
                <TextInput style={styles.inputp} placeholder="PASSWORD" value= {password} onChangeText={setPassword}/>
                
            </View>
            <View style={[styles.container,styles.buttonText]}>
                <TouchableOpacity style={[styles.button,styles.buttonText]} >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
              
                <TouchableOpacity style={styles.button} onPress={goToRegister}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity style={styles.exit} onPress={exitApp}>
                <Text>🔙</Text>
            </TouchableOpacity>
            </View>

        </SafeAreaView>
             
    
    )
}


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Ajusta la imagen para cubrir toda la pantalla
        justifyContent: 'center', 
        height: '120%'
      },
    image: {
        width: 500, 
        height: 300,
        marginTop:10,
        justifyContent:'flex-end',
        alignItems:'center', 

    },
    imagecontainer: {
        marginTop:10,
        justifyContent:'flex-end',
        alignItems:'center', 

    },
    TexView:{
        justifyContent:'center',
        fontSize:30,
        textAlign:'center' 
    },
    title:{
        justifyContent:'center',
        fontSize:25,
        textAlign:'center',
        marginTop:10 
    },
    input:{
        width:300,
        height: 45,
        fontSize: 20,
        borderWidth:1,
        borderColor: '#ccc',
        borderRadius:15,
        padding:10,
        marginTop: 20,
        marginBottom:10,
        justifyContent:'space-around',
        alignContent:'center',
        backgroundColor:'white'
    },
    inputp:{
        width:300,
        height: 45,
        fontSize: 20,
        borderWidth:1,
        borderColor: '#ccc',
        borderRadius:15,
        padding:10,
        marginTop: 1,
        marginBottom:15,
        justifyContent:'space-around',
        alignContent:'center',
        backgroundColor:'white'
    },
    inputText:{

    },
    fondo:{
        backgroundColor:'black',
        height:'100%'
    },
    container:{
        justifyContent:'flex-end',
        alignItems:'center', 
        paddingBottom:1
    },
    button: {
        backgroundColor: 'red',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 100,
        borderWidth: 0, // Ancho del borde
        borderColor: 'black', // Color del borde
        shadowColor: '#000', // Sombra para mejorar visibilidad en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        marginTop:10,
        alignItems:'center',
        marginEnd:0,
        width:200
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight:'bold'
      },
      containerinput:{
        marginTop:30
      },
      exit:{
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginTop:50,
        width:40
        
    },
});




