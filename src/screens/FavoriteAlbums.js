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
            <Text style={styles.title}>{item.collectionName}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Edit', {album: item, setAlbums})}>
                    <Text style={styles.buttonText}>🖋️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAlbum(item.id)}>
                    <Text style={styles.buttonText}>🗑️</Text>
                </TouchableOpacity>
            </View>

        </TouchableOpacity>
    );

    return(
        
        <SafeAreaView style={styles.container}>
            
            <FlatList
            data={albums}
            renderItem={renderAlbum}
            keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff',
        padding: 10
    },
    card: {
        marginBottom: 20,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#ddd',
        borderWidth: 1
    }, 
    image: {
        width: '100%',
        height: 150
    },
    title: {
        fontSize: 18,
        fontWeight:'bold',
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    editButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5
    },
    deleteButton: {
        backgroundColor: '#F44336',
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    addButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    }

});