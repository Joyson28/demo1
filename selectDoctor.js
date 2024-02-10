import { View, Text, StyleSheet, ScrollView, Image, Platform, TouchableHighlight, Pressable, TouchableOpacity} from 'react-native'
import React, { useState } from "react";
import datalist from './docList.json'

export default function selectDoctor(){
  return(
    <View style={styles.mainView}>
     <View style={styles.headView}>
      <Image
      source={require('./assets/backButton.png')} style={{width:52,height:38}}/>
      <Text style={styles.head}>Cardiologist</Text>
     </View>
     <View style={{flexDirection:"row", alignItems:"center", padding:30, }}>
     <Image
      source={require('./assets/undraw_doctors.png')} style={{width:130,height:130}}/>
      <Text style={styles.main2Text}>Top Doctor's</Text>
     </View>

{/*List of Doctor code*/}

<ScrollView>
      {
      datalist.map(datas=> {
        return(
          <TouchableOpacity  onPress={()=> console.log("Doctor selected")}>
          <View key={datas.id} style={styles.card}>
          <Image
           source={{ uri: datas.image }} style={{width:100,height:90,borderRadius:10}}/>
           <View style={{paddingLeft:25, width:230}}>
           <Text style={styles.mainText}>{datas.name} ⭐</Text>
           <Text  style={styles.subText}>{datas.speciality}</Text>
           </View>  
           <TouchableOpacity onPress={()=> console.log("Doctor selected")}>
           <Image
           source={require('./assets/next.png')} style={{width:15,height:17, }}/> 
           </TouchableOpacity>     
          </View>
          </TouchableOpacity>
     )
    })
  }
  </ScrollView>
  </View>
  )}


  const styles = StyleSheet.create({
  mainView:{
    flex:1,
    backgroundColor:'#F1F1F1'
  },

  headView:{
    flexDirection:'row',
    padding:10,
    alignItems:'center',
    backgroundColor:'#CACBF1',
    paddingHorizontal:16,
    height:100
  },

  head:{fontSize:22,
    paddingVertical:4,
    paddingLeft:45,
    color:"black",
  },

  main2Text: {
    fontSize:30,  
    marginLeft:30,
    color:"black",
  },

  card: {
    margin:10,
    height:112,
    backgroundColor:'white',
    alignItems:'center',
    flexDirection:'row',
  paddingLeft:20,
  borderRadius:20,
  },

  mainText: {
    fontSize:20,
    fontWeight:'bold',
    color: "black",
  },

  subText: {
    fontSize:15,
    paddingTop:3,
    color:"black",
  },
})