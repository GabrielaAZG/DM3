import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import React, {useState} from "react";
import {View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Button} from "react-native";

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
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Album title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Artist"
        value={artist}
        onChangeText={setArtist}
      />
      <TextInput
        style={styles.input}
        placeholder="Estimated Date"
        value={estimatedDate}
        onChangeText={setEstimatedDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />
      <Button title="Add" onPress={addAlbumToList} />
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10
    },
})