import React, {useState, useEffect} from "react";
import {View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView} from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {Ionicons} from "@expo/vector-icons";

export default function FavoriteAlbum({navigation}) {
        const [albums, setAlbums] = useState(''); //...
        const [loading, setLoading] = useState(true);
        const [refreshing, setRefreshing] = useState(false);
        const [user, setUser] = useState(null);
        


        // Escuchar cambios en la autenticación
        useEffect(() => {
            const auth = getAuth();
            const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                if (currentUser) {
                    fetchAlbums(currentUser);
                } else {
                    setAlbums([]);
                    setLoading(false);
                }
            });

            return unsubscribeAuth;
        }, []);

        // Recargar cuando la pantalla obtiene foco
        useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                const auth = getAuth();
                const currentUser = auth.currentUser;
                if (currentUser) {
                    fetchAlbums(currentUser);
                }
            });

            return unsubscribe;
        }, [navigation]);

        const fetchAlbums = async (currentUser) => {
            try {
                setRefreshing(true);
                setLoading(true);

                if (!currentUser) {
                    throw new Error("Usuario no autenticado");
                }

                const querySnapshot = await getDocs(
                    collection(db, "users", currentUser.uid, "favorite_albums")
                );

                const fetchedAlbums = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    artworkUrl100: doc.data().artworkUrl100,
                    collectionName: doc.data().collectionName
                }));

                setAlbums(fetchedAlbums);
            } catch (error) {
                console.error("Error al obtener álbumes:", error);
                alert("Error al cargar los álbumes");
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        };

        const deleteAlbum = async (albumId) => {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) {
                alert("Debes iniciar sesión.");
                return;
            }

            try {
                await deleteDoc(doc(db, "users", currentUser.uid, "favorite_albums", albumId));
                setAlbums(prev => prev.filter(album => album.id !== albumId));
            } catch (error) {
                console.error("Error al eliminar álbum:", error);
                alert("Error al eliminar el álbum.");
            }
        };


        const renderAlbum = ({item}) => (

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', {album: item})}>
                <Image source={{uri: item.artworkUrl100}} style={styles.image}/>
                <Text style={styles.albumTitle}>{item.collectionName}</Text>
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={[styles.iconButton]}
                                      onPress={() => navigation.navigate('Edit', {album: item, setAlbums})}>
                        <Ionicons name="create-outline" size={24} color="#004555"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => deleteAlbum(item.id)}>
                        <Ionicons name="trash-outline" size={24} color="#F44336"/>
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
        );

        return (

            <SafeAreaView style={styles.container}>
                <Text style={styles.screenTitle}>♥</Text>
                <FlatList
                    data={albums}
                    renderItem={renderAlbum}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{paddingBottom: 100}}
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
