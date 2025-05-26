import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { doc, updateDoc, collection } from "firebase/firestore";
import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
export default function EditScreen({ route, navigation }) {
  //const { album, setAlbums } = route.params;
  const { album} = route.params;
  const [title, setTitle] = useState(album.title);
  const [artist, setArtist] = useState(album.artist);
  const [estimatedDate, setEstimatedDate] = useState(album.estimatedDate);
  const [status, setStatus] = useState(album.status);
  

  const editAlbum = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("Debes iniciar sesión.");
      return;
    }

    try {
      const albumRef = doc(db, "users", user.uid, "to_listen_albums", album.id);
        //
      await updateDoc(albumRef, {
        title: title,
        artist: artist,
        estimatedDate: estimatedDate,
        status: status
      });
      /*const updatedAlbum = {
            ...album,
            title,
            artist,
            estimatedDate,
            status
        };
      alert("Álbum actualizado correctamente.");
      setAlbums(prevAlbums => prevAlbums.map(a => a.id === album.id ? updatedAlbum : a));*/
      navigation.goBack();
    } catch (error) {
      console.error("Error al editar el álbum:", error);
      alert("Hubo un error al editar el álbum.");
    }
  };

  return (
      <LinearGradient
          colors={["#121212", "#1E1E1E", "#121212"]}
          style={styles.gradient}
      >
    <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
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
                    style={[styles.saveButton, styles.saveButtonDisabled]}
                    onPress={editAlbum}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
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
    screenTitle: {
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
    saveButton: {
        backgroundColor: "#1DB954",
        borderRadius: 12,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
    },
    saveButtonDisabled: {
        backgroundColor: "#4A4A4A",
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});