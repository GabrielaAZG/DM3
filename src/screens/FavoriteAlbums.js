import React, {useState, useEffect} from "react";
import {View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView} from "react-native";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";




export default function FavoriteAlbum({navigation}){
    const [albums, setAlbums] = useState(''); //...

    const deleteAlbum = async (albumId) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            alert("Debes iniciar sesión.");
            return;
        }

        try {
            // Elimina el documento específico del álbum
            await deleteDoc(doc(db, "users", user.uid, "favorite_albums", albumId));

            // Actualiza la lista local eliminando el álbum
            setAlbums(prev => prev.filter(album => album.id !== albumId));

            alert("Álbum eliminado.");
        } catch (error) {
            console.error("Error al eliminar álbum:", error);
            alert("Error al eliminar el álbum.");
        }
    };

    useEffect(() => {
        const fetchAlbums = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                console.log("Usuario no autenticado");
                return;
            }

            try {
                const querySnapshot = await getDocs(collection(db, "users", user.uid, "favorite_albums"));
                const fetchedAlbums = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    artworkUrl100: doc.data().artworkUrl100, // ajustar si tu propiedad es artworkUrl
                    collectionName: doc.data().collectionName
                }));
                setAlbums(fetchedAlbums);
            } catch (error) {
                console.error("Error al obtener álbumes:", error);
            }
        };

        fetchAlbums();
    }, []);
    

    const renderAlbum = ({item}) => (
        
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', {album: item})}>
            <Image source={{uri: item.artworkUrl100}} style={styles.image}/>
            <Text style={styles.albumTitle}>{item.collectionName}</Text>
            <View style={styles.actionButtons}>
                <TouchableOpacity style={[styles.iconButton, { backgroundColor: "gray" }]}
                                  onPress={() => navigation.navigate('Edit', {album: item, setAlbums})}>
                    <Text style={styles.icon}>✎</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconButton, { backgroundColor: "#EF233C" }]} onPress={() => deleteAlbum(item.id)}>
                    <Text style={styles.icon}>✘</Text>
                </TouchableOpacity>
            </View>

        </TouchableOpacity>
    );

    return(
        
        <SafeAreaView style={styles.container}>
            <Text style={styles.screenTitle}>♥</Text>
            <FlatList
            data={albums}
            renderItem={renderAlbum}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    screenTitle: {
        fontSize: 26,
        color: "#000000",
        fontWeight: "bold",
        marginVertical: 20
        
    },
    card: {
        backgroundColor: "#e0e0e0",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    },
    image: {
        width: "100%",
        height: 180,
        borderRadius: 12,
    },
    albumTitle: {
        color: "#000000",
        fontSize: 18,
        fontWeight: "600",
        marginTop: 12,
        marginBottom: 8,
        textAlign: "center",
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    iconButton: {
        padding: 10,
        borderRadius: 10,
    },
    icon: {
        fontSize: 18,
        color: "#fff",
    },
});
