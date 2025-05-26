import React , {useState} from "react";
import {Linking, View, Text, Image, TouchableOpacity, Button, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import {db} from "../../firebase";
import {collection, addDoc, getDocs} from 'firebase/firestore';
import { getAuth } from "firebase/auth";

export default function AlbumDetail({route, navigation}){

    const {album} = route.params;
    const saveFavoriteAlbum = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            alert("Debes iniciar sesión para guardar álbumes.");
            return;
        }

            try {
            await addDoc(collection(db, "users", user.uid, "favorite_albums"), {
            collectionId: album.collectionId,
            collectionName: album.collectionName,
            artistName: album.artistName,
            primaryGenreName: album.primaryGenreName,
            artworkUrl100: album.artworkUrl100,
            trackCount: album.trackCount,
            releaseDate: album.releaseDate,
            collectionPrice: album.collectionPrice,
            collectionViewUrl: album.collectionViewUrl,
            createdAt: new Date()
            });

            alert("Álbum guardado en favoritos.");
        } catch (error) {
            console.error("Error al guardar el álbum:", error);
            alert("Hubo un error al guardar el álbum.");
        }
    };
    

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
            <Image source={{uri: album.artworkUrl100}} style={styles.image}/>
                
            <Text style={styles.artist}>Artist: {album.artistName}</Text>
                <View style={styles.detailsBox} >
                    <Text style={styles.detail}>🎧  Genre: {album.primaryGenreName}</Text>
                    <Text style={styles.detail}>🎵 Songs: {album.trackCount}</Text>
                    <Text style={styles.detail}>📅 Release Date: {new Date(album.releaseDate).toLocaleDateString()}</Text>
                    <Text style={styles.detail}>💰 Price: ${album.collectionPrice}</Text>
                </View>
                
            <TouchableOpacity onPress={() => Linking.openURL(album.collectionViewUrl)}>
                <Text style={styles.link}>▶️ Watch in iTunes</Text>
            </TouchableOpacity>
                
            <TouchableOpacity style={styles.favButton}  onPress={saveFavoriteAlbum}>
                <Text style={styles.favText}>❤️</Text>
            </TouchableOpacity>
           
            <Button title="Back" onPress={() => navigation.goBack()}/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    content: {
        alignItems: "center",
        padding: 20,
    },
    image: {
        width: 220,
        height: 220,
        borderRadius: 12,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 6,
    },
    artist: {
        fontSize: 18,
        color: "#bbb",
        marginBottom: 20,
    },
    detailsBox: {
        backgroundColor: "#1e1e1e",
        padding: 16,
        borderRadius: 10,
        width: "100%",
        marginBottom: 20,
    },
    detail: {
        color: "#eee",
        fontSize: 16,
        marginBottom: 8,
    },
    link: {
        fontSize: 16,
        color: "#3A86FF",
        marginBottom: 20,
        textDecorationLine: "underline",
    },
    favButton: {
        backgroundColor: "#ffffff",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginBottom: 15,
    },
    favText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    backButton: {
        borderColor: "#888",
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 10,
    },
    backText: {
        color: "#bbb",
        fontSize: 16,
    },
});


