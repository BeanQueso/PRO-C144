import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Header, AirbnbRating, Icon } from "react-native-elements"
import axios from "axios"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Linking } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize"

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            article_details: {},
        }
    }

    componentDidMount(){
        this.getArticle();
    }

    timeConvert(num){
        var hrs = Math.floor(num/60)
        var mins = num%60
        return hrs, mins
    }

    getArticle =()=>{
        const url = "http://127.0.0.1:5000/get-article";
        axios.get(url).then(response=>{
            let details = response.data.data
            details["duration"] = this.timeConvert(details.duration)
            this.setState({article_details: details})
        })
    }

    likeArticles =()=>{
        const url = "http://127.0.0.1:5000/liked-article";
        axios.post(url).then(response=>{
            this.getArticle();
        })
    }

    dislikeArticles =()=>{
        const url = "http://127.0.0.1:5000/disliked-article";
        axios.post(url).then(response=>{
            this.getArticle();
        })
    }

    render(){
        const {
            url, 
            title,
            text,
        } = this.state.article_details

            return(
                <View style={{flex:1}}>
                    <SafeAreaProvider>
                        <Header 
                            centerComponent={<Text style={styles.header}>Home</Text>}
                            rightComponent={
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Icon iconStyle={styles.header} name="search"/>
                                </View>
                            }
                            backgroundColor={"#82a5b8"}
                        />
                        <View style={{alignItems:"center"}}>
                            <View style={styles.titleContainer}>
                                <Text style={{fontSize: RFValue(12),textAlign:"center"}}>{title}</Text>
                            </View>

                            <View style={{flexDirection:"row", marginTop:-10}}>
                                <TouchableOpacity onPress={()=>{this.likeArticles()}} style={styles.likeButton}>
                                  <Text style = {{color:"white", alignSelf:"center", textAlign:"center"}}>
                                  Like
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{this.dislikeArticles()}} style={styles.dislikeButton}>
                                <Text style = {{color:"white", alignSelf:"center", textAlign:"center"}}>
                                  Dislike
                                </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>Linking.openURL(url)} style={styles.openUrl}>
                                  <Text style = {{color:"white", alignSelf:"center", textAlign:"center"}}>
                                    Open URL
                                  </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaProvider>
                </View>
            );
    }
}

const styles = StyleSheet.create({
    likeButton:{
        width: RFValue(50),
        height: RFValue(50),
        alignSelf: 'center',
        backgroundColor:"green",
        margin:5
    },
    dislikeButton:{
      width: RFValue(50),
        height: RFValue(50),
        alignSelf: 'center',
        backgroundColor:"red",
        margin:5
    },
    openUrl:{
      width: RFValue(50),
        height: RFValue(50),
        alignSelf: 'center',
        backgroundColor:"grey",
        margin:5
    },
    header:{
        fontSize: RFValue(25),
        color: "#23404f",
    },
    titleContainer:{
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        borderColor:"#FFFFFF",
        backgroundColor:"#FFFFFF",
        margin: 20
    }
})