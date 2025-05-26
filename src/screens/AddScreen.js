import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import React, {useState} from "react";
import {View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Button, KeyboardAvoidingView,
    Platform,
    ScrollView,} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function AddScreen({ route, navigation }) {
  //const { setAlbumm } = route.params;
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [estimatedDate, setEstimatedDate] = useState('');
  const [status, setStatus] = useState('');
  
    const addAlbumToList = async () => {
                const auth = getAuth();
                const user = auth.currentUser;
        
                if (!user) {
                    alert("Debes iniciar sesión para guardar álbumes.");
                    return;
                }

                if(!title.trim() || !artist.trim()){
                    alert("Complete at least the title and the name of the artist");
                    return;
                }
        
                    try {
                    await addDoc(collection(db, "users", user.uid, "to_listen_albums"), {
                    title: title,
                    artist: artist,
                    estimatedDate: estimatedDate,
                    status: status,
                    createdAt: new Date()
                    });
                    
                    
                    /*const albumAdded = {
                        id: docRef.id,
                        title,
                        artist,
                        estimatedDate,
                        status,
                        createdAt: new Date()
                    };*/
      
                    //setAlbumm(prevAlbums => [...prevAlbums, albumAdded]);
                    alert("Album added");
                    navigation.goBack();
                } catch (error) {
                    console.error("Error al guardar el álbum:", error);
                    alert("Hubo un error al guardar el álbum.");
                }
    };
   

  return (
      <LinearGradient  colors={["#121212", "#1E1E1E", "#121212"]}
                       style={styles.gradient}>
    <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>

         
                <Text style={styles.title}>Add New Album</Text>
                <View style={styles.inputContainer}>
                    <Ionicons
                        name="musical-notes"
                        size={20}
                        color="#888"
                        style={styles.inputIcon}
                    />
      <TextInput
        style={styles.input}
        placeholder="Album title"
        value={title}
        onChangeText={setTitle}
      />
                </View>
               

                <View style={styles.inputContainer}>
                    <Ionicons
                        name="person"
                        size={20}
                        color="#888"
                        style={styles.inputIcon}
                    />
                    <TextInput
        style={styles.input}
        placeholder="Artist"
        value={artist}
        onChangeText={setArtist}
      />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons
                        name="calendar"
                        size={20}
                        color="#888"
                        style={styles.inputIcon}
                    />       
      <TextInput
        style={styles.input}
        placeholder="Estimated Date"
        value={estimatedDate}
        onChangeText={setEstimatedDate}
      />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons
                        name="information-circle"
                        size={20}
                        color="#888"
                        style={styles.inputIcon}
                    />     
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />
                </View>

                <TouchableOpacity
                    style={[styles.button ,styles.buttonDisabled]}
                    onPress={addAlbumToList}
                >
                    <Text style={styles.buttonText}>
                         Add Album
                    </Text>
                </TouchableOpacity>
      
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
      </LinearGradient>
  );

}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 24,
        paddingTop: 16,
    },
    backButton: {
        alignSelf: "flex-start",
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 32,
        textAlign: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2A2A2A",
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        height: 56,
        color: "#FFFFFF",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#1DB954",
        borderRadius: 12,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
    },
    buttonDisabled: {
        backgroundColor: "#4A4A4A",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});