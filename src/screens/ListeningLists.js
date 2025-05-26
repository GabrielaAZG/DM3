import React, {useState, useEffect} from "react";
import {View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, RefreshControl,} from "react-native";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";


export default function ListeningLists({navigation}){
    const [albumssL, setAlbumss] = useState([]); //...

    

    const deleteAlbum = async (albumId) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            alert("Debes iniciar sesión.");
            return;
        }

        try {
            // Elimina el documento específico del álbum
            await deleteDoc(doc(db, "users", user.uid, "to_listen_albums", albumId));

            // Actualiza la lista local eliminando el álbum
            setAlbumss(prev => prev.filter(album => album.id !== albumId));

            alert("Álbum eliminado.");
        } catch (error) {
            console.error("Error al eliminar álbum:", error);
            alert("Error al eliminar el álbum.");
        }
    };

    useEffect(() => {
        
        fetchAlbums();
        
        const unsubscribe = navigation.addListener('focus',fetchAlbums);
        return unsubscribe;
    }, [navigation]);

   
        const fetchAlbums = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                console.log("Usuario no autenticado");
                return;
            }

            try {
                const querySnapshot = await getDocs(collection(db, "users", user.uid, "to_listen_albums"));
                const fetchedAlbums = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAlbumss(fetchedAlbums);
            } catch (error) {
                console.error("Error al obtener álbumes:", error);
            }
        };

       
    
    

    const renderAlbum = ({item}) => (
        
        <TouchableOpacity style={styles.card} >
            
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.title}>{item.artist}</Text>
            <Text style={styles.title}>{item.estimatedDate}</Text>
            <Text style={styles.title}>{item.status}</Text>
            <View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Edit Album', {album: item})}>
                    <Ionicons name="create-outline" size={24} color="#004555" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.iconButton} onPress={() => deleteAlbum(item.id)}>
                    <Ionicons name="trash-outline" size={24} color="#F44336" />
                </TouchableOpacity>
            </View>
            </View>

        </TouchableOpacity>
    );

    return(
        
        <SafeAreaView style={styles.container}>
            <Text >Albums to check out ...</Text>
            <View>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add')}>
                <Text style={styles.addButtonText}>╋</Text>
            </TouchableOpacity>
            </View>
            <FlatList
            data={albumssL}
            renderItem={renderAlbum}
            keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    addButton: {
        backgroundColor: "#1DB954",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    listContent: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: "#979797",
        borderRadius: 10,
        marginVertical: 8,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    albumInfo: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 4,
    },
    artist: {
        fontSize: 16,
        color: "#B3B3B3",
        marginBottom: 8,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    detailText: {
        fontSize: 14,
        color: "#B3B3B3",
        marginLeft: 6,
    },
    buttonsContainer: {
        flexDirection: "row",
    },
    iconButton: {
        marginLeft: 15,
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
    },
    emptyText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginTop: 20,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 16,
        color: "#B3B3B3",
        textAlign: "center",
        marginBottom: 30,
    },
    addButtonLarge: {
        backgroundColor: "#004555",
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 30,
    },
    addButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    
});