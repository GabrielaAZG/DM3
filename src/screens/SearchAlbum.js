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
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                <Image source={{ uri: item.artworkUrl100}} style={styles.image}/>
            </View>
            
            <Text style={{fontSize: 18, textAlign: "center", fontWeight:"bold"}}>{item.collectionName}</Text>
        </TouchableOpacity>
    );

    return (
  <SafeAreaView style={{ flex: 1 }}>
    <TextInput
      style={styles.searchInput}
      placeholder="🔍 Search album ..."
      value={searchText}
      onChangeText={text => setSearchText(text)}
      onSubmitEditing={getAlbums}
    />

    <View style={{ flex: 1 }}>
      <FlatList
        data={albums}
        renderItem={renderAlbum}
        keyExtractor={(item) => item.collectionId.toString()}
        contentContainerStyle={{ paddingBottom: 80 }} // espacio para que el botón no tape los ítems
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
    cardContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center", 
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginTop:  20
    }, 
    image: {
        justifyContent: 'center',
        height: 200,
        width: 200,
    },
    errorStyle:{
        color: "red",
        fontSize: 18
    },
    card: {
        marginBottom: 20,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#ddd',
        borderWidth: 1
    }
})