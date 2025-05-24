import React , {useState} from "react";
import {Linking, View, Text, Image, TouchableOpacity,Button, StyleSheet, SafeAreaView } from "react-native";

export default function AlbumDetail({route, navigation}){
    const {album} = route.params;

    return(
        <SafeAreaView style={styles.container}>
            <Image source={{uri: album.artworkUrl100}} style={styles.image}/>
                
            <Text>Artist: {album.artistName}</Text>
            <Text>Genre: {album.primaryGenreName}</Text>
            <Text>Songs: {album.trackCount}</Text>
            <Text>Release Date: {new Date(album.releaseDate).toLocaleDateString()}</Text>
            <Text>Price: ${album.collectionPrice}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(album.collectionViewUrl)}>
            <Text style={{color: 'blue'}}>Watch in iTunes</Text>
            </TouchableOpacity>

            <Button title="Back" onPress={() => navigation.goBack()}/>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
         marginBottom: 20
    },
    description: {
        fontSize: 16,
        marginBottom: 20
    },
    rating: {
        fontSize: 18,
        marginBottom: 20
    }
});

