import React from "react";
import {View, Text, SafeAreaView, StyleSheet,TouchableOpacity,ImageBackground} from "react-native";
import {auth} from "../../firebase";
export default function SettingsScreen({navigation}){
    
    
    

   
    const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.reset({ index: 0, routes: [{ name: "Login" }] });
      })
      .catch((error) => console.error('Sign-out error:', error));
  };

 

    
    return(
        <ImageBackground  style={styles.backgroundImage}>
        <SafeAreaView style={styles.overlay}>

            <View style={styles.container}>
                <TouchableOpacity style={styles.glassButton} onPress={signOut}>
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            
            
            
        </SafeAreaView>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent overlay
        justifyContent: "center",
        padding: 24,
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    header: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 40,
    },
    glassButton: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(10px)", // Este efecto solo en web/native con soporte
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#ffffff",
        textShadowColor: "rgba(0, 0, 0, 0.75)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },
});




