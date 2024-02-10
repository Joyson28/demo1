import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

export default function OtpPage() {
  return (
    <View style={styles.mainView}>
      <Image
      source={require('./assets/backButton.png')} style={styles.backButton}/>
      <Text style={styles.enterText}>Enter the 6-digit OTP </Text>
      <View style={styles.otpBox}>
        <TextInput style={styles.input} keyboardType="numeric" selectionColor="black" maxLength={6} placeholder='▢▢▢▢▢▢ ' />
      </View>
      <View style={{flexDirection:'row',flex:1,margin:30,justifyContent:'center'}}>
      <Text style={[styles.text, { marginLeft:8,fontSize:19}]}>Didn't Recieve the code?</Text>

      <TouchableOpacity >
      <Text style={[styles.text, { color:'blue'  ,marginLeft:8,fontSize:19}]}>
        Resend
      </Text>
    </TouchableOpacity>
      </View>
      <View style={{flex:1,alignItems:'center',marginBottom:300, marginLeft:65}}>
      <Image
      source={require('./assets/otp_img.png')} />
      </View>

      <View style={{alignItems:'center',justifyContent:'center',marginBottom:50}}>
         <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>CONFRIM</Text>
      </TouchableOpacity>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  mainView:{
    backgroundColor:'#CACBF1',
    flex:1
  },
  backButton:{
    width:52,
    height:38,
    margin:20},
    enterText:{
      fontSize:29,
      marginLeft:90
    },
    otpBox:{
      width:249,
      height:59,
      borderRadius:30,
      backgroundColor:'white',
      alignContent:'center',
      marginLeft:90,
      marginTop:40
    },
    input:
    {
      width:200,
     paddingVertical:5,
      textAlign: 'center',
      fontSize:30,
      marginLeft:25,
      borderBottomWidth: 1,
      letterSpacing:5
    },
    confirmButton: {
  backgroundColor: '#5154B0',
  opacity: 0.95,
  width: 176,
   height: 47,
  borderRadius: 20,
  alignItems:'center',
  justifyContent:'center',
 
},
confirmButtonText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'white',
},

})