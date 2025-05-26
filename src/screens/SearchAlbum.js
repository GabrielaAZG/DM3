import { FlatList, StyleSheet, Text, TextInput, View, Image,Button, ActivityIndicator, TouchableOpacity, SafeAreaView } from "react-native";
import React, {useEffect, useState} from "react";


const SearchAlbum = ({navigation}) => {
    const [albums, setAlbums] = useState([]);
    const [searchText, setSearchText] = useState('');
    

    const getAlbums =  async () => {
        const URL = `https://itunes.apple.com/search?term=${searchText}&entity=album&limit=25`;
        const res = await fetch(URL);
        const data = await res.json();
        setAlbums(data.results);
        console.log(data.results);
    }

    const renderAlbum = ({item}) => (
        
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Album Details', {album: item})}>
            
            <Image source={{ uri: item.artworkUrl100}} style={styles.image}/>
            <Text style={styles.albumName} numberOfLines={2}>
                {item.collectionName}
            </Text>
            
        </TouchableOpacity>
    );

    return (
  <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎵 Search Albums</Text>
    <TextInput 
        style={styles.searchInput}
      placeholder="🔍 Search album ..."
      value={searchText}
      onChangeText={text => setSearchText(text)}
      onSubmitEditing={getAlbums}
        placeholderTextColor="#aaa"
    />

    <View style={{ flex: 1 }}>
      <FlatList
        data={albums}
        renderItem={renderAlbum}
        keyExtractor={(item) => item.collectionId.toString()}
        contentContainerStyle={styles.list}
        numColumns={2}// espacio para que el botón no tape los ítems
      />
    </View>

    <View style={{ padding: 10 }}>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  </SafeAreaView>
    );
}

export default SearchAlbum;

const styles = StyleSheet.create({
    container: {
        flex: 1,
         // fondo oscuro moderno
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        color: 'purple',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    searchInput: {
        backgroundColor: '#d5d5d5',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: 'black',
        marginBottom: 20,
    },
    list: {
        paddingBottom: 80,
    },
    card: {
        backgroundColor: '#e5e5e5',
        borderRadius: 12,
        padding: 10,
        margin: 8,
        flex: 1,
        alignItems: 'center',
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
    },
    albumName: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
    },
});
