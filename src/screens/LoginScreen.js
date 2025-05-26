import React, {useState} from "react";
import {
    View,
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    Alert,
    Platform,
    BackHandler,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
} from "react-native";
import {auth} from "../../firebase"; // 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({navigation}){
    
    

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

   
    const handleCreateAccount = async () =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            console.log("Account created");
            const user = userCredential.user;
            console.log(user);
        })
        .catch(error => {
            console.log(error);
            Alert.alert(error.message);
        })
    }

    const handleSignIn = async () =>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            console.log("Signed in!");
            const user = userCredential.user;
            console.log(user);
            navigation.replace("Menu");
        })
        .catch(error => {
            console.log(error);
            Alert.alert(error.message);
        })
    }

    
          

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

   
   

    

    return(
        
        <SafeAreaView style={styles.safeArea}>
           
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <Image
                    source={require('../../assets/login.png')} // Asegúrate de tener esta imagen
                    style={styles.image}
                    resizeMode="contain"
                />
                <TextInput style={styles.input} placeholder="Email" value= {email} onChangeText={setEmail} placeholderTextColor="#aaa"/>
                <TextInput style={styles.input} placeholder="Password" value= {password} onChangeText={setPassword} placeholderTextColor="#aaa"/>
                
            
            
                <TouchableOpacity style={styles.button} onPress={handleSignIn} >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
              
                <TouchableOpacity style={styles.secondaryButton} onPress={handleCreateAccount}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
            
            
            <TouchableOpacity style={styles.exitButton}  onPress={exitApp}>
                <Text style={styles.exitText}>Exit App</Text>
            </TouchableOpacity>
            
            </KeyboardAvoidingView>
        </SafeAreaView>
             
    
    )
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#0F0F0F",
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        marginTop:-120
    },
    title: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        color: "#aaa",
        fontSize: 16,
        marginBottom: 40,
    },
    input: {
        backgroundColor: "#1C1C1E",
        color: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 12,
        fontSize: 16,
        marginBottom: 20,
        borderColor: "#333",
        borderWidth: 1,
    },
    button: {
        backgroundColor: "#01aad0",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    secondaryButton: {
        borderColor: "#01aad0",
        borderWidth: 1,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
    },
    secondaryButtonText: {
        color: "#01aad0",
        fontSize: 16,
        fontWeight: "bold",
    },
    exitButton: {
        alignItems: "center",
        paddingVertical: 10,
    },
    exitText: {
        color: "#888",
        fontSize: 14,
    },
    image: {
        width: 300,
        height: 200,
        alignItems: "center",
        marginLeft: 50,
        marginBottom:50
    },
});




