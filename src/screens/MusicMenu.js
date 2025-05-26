import React from "react";
import {View, Text, SafeAreaView, StyleSheet,TouchableOpacity,Image} from "react-native";
import { Ionicons } from '@expo/vector-icons';
export default function PrincipalMenu(props){
    


    
    return(
        <View style={styles.container}>
            <Ionicons name="musical-notes" size={64} color="#ff6b81" />

            <Text style={styles.title}>Welcome to MusicTecP</Text>

            <Text style={styles.subtitle}>
                Explore your favorite albums, artists, and songs.
                 </Text>

            <Image
                source={require('../../assets/Music.png')} // Asegúrate de tener esta imagen
                style={styles.image}
                resizeMode="contain"
            />

            <View style={styles.iconRow}>
                <Ionicons name="headset" size={40} color="#888" />
                <Ionicons name="disc" size={40} color="#888" />
                <Ionicons name="radio" size={40} color="#888" />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    image: {
        width: 300,
        height: 200,
        marginBottom: 40,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
});
