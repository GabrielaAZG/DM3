import React from "react";
import { View,Text,Image,StyleSheet,SafeAreaView, Button, TouchableOpacity } from "react-native";

export default function DetailFavoriteAlbum({route,navigation}){
    const {album}=route.params;

    

    return(
        <SafeAreaView >
            

            <SafeAreaView style={styles.fondo}>
            <Image source={{uri:album.artworkUrl100}} style={styles.image}/>
            
            <View style={styles.textt}>   
                <Text style={styles.title}>{album.primaryGenreName}</Text>
                <Text style={styles.description}>{album.artistName}</Text> 
                <Text style={styles.description}>{album.primaryGenreName}</Text> 
            </View>
            
           
          

            <Button title="Back" onPress={() => navigation.goBack()}/>

        </SafeAreaView>
        </SafeAreaView>
        
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:40,
        marginTop:10
    },
    image:{
        width:'100%',
        height:300,
        marginBottom:10
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:10,
        color:'white',
        
    },
    description:{
        fontSize:16,
        marginBottom:1,
        color:'white'
    },
    rating:{
        fontSize:16,
        marginBottom:20,
        marginLeft:20
    },
    textt:{
        marginBottom:10,
        justifyContent: 'flex-start',
        display:'flex',
        marginLeft:10
        
    },
    textt2:{
        
        marginRight:10,
        height: 180,
        padding:10,
        marginTop: 10,
        marginBottom:80,
        
    },
    buttonplay:{
        justifyContent:'space-around',
        backgroundColor:'gray',
        borderRadius:10,
        padding:5,
        marginRight:10,
        marginLeft:10,
        marginTop:20,
        alignItems:'center',
    },
    text:{
        fontSize:14,
        marginLeft:5,
        marginTop:5,
        fontFamily:'',
        color:'white',
        textAlign:'justify'
    },
    texts:{
        fontSize:18,
        marginLeft:20,
        fontWeight:'bold'
    },
    fondo:{
        backgroundColor:'black',
        width:420,
        height: 880,

    },
    button:{
        marginBottom:40
    }

})