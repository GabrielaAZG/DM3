import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import React, {useState} from "react";
import {View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Button} from "react-native";

export default function EditFavoriteAlbum({ route, navigation }) {
  const { album, setAlbums } = route.params;
  const [title, setTitle] = useState(album.collectionName);

  const editAlbum = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("Debes iniciar sesión.");
      return;
    }

    try {
      const albumRef = doc(db, "users", user.uid, "favorite_albums", album.id);
        //
      await updateDoc(albumRef, {
        collectionName: title,
      });
      const updatedAlbum = {
            ...album,
            collectionName: title
        };
      alert("Álbum actualizado correctamente.");
      setAlbums(prevAlbums => prevAlbums.map(a => a.id === album.id ? updatedAlbum : a));
      navigation.goBack();
    } catch (error) {
      console.error("Error al editar el álbum:", error);
      alert("Hubo un error al editar el álbum.");
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
      <Button title="Edit album" onPress={editAlbum} />
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