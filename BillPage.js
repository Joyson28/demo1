import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import  { useState } from 'react'; 
import React from 'react'
import { RadioButton } from 'react-native-paper'; 



export default function BillPage() {
  const [selectedValue, setSelectedValue] = useState('option1'); 

 
  return (
    //First main view
    <View style={styles.mainView}>
     <View style={styles.headView}>
      <Image
      source={require('./assets/backButton.png')} style={{width:52,height:38,marginRight:40}}/>
      <Text style={styles.head}>Book In-Clinic Appointment</Text>
     </View>
  
     

         <View  style={styles.firView}>
          <Image
           source={require('./assets/doc.jpg')} style={{width:100,height:90,borderRadius:10}}/>
           <View style={{paddingLeft:25}}>
           <Text style={styles.textStyle}>Dr. Ramakrishna ⭐</Text>
           <Text  style={[styles.textStyle2,{fontSize:15}]}>Cardiologist</Text>
           </View>
         </View>

         <View  style={styles.secView}>
          <Image
           source={require('./assets/timer.png')} style={{width:27,height:27,borderRadius:10}}/>
           <View style={{paddingLeft:25}}>
           <Text style={styles.textStyle}>Appointment Time</Text>
           <Text  style={styles.textStyle2}>Thu, 25 Feb 11:30 AM</Text>
           </View>
         </View>

        <View  style={styles.thirView}>
          <Text style={styles.textStyle}>Bill Details</Text>
          <View style={styles.viewStyle}>
          <Text  style={[styles.textStyle2]}>Registration Fee</Text>
          <Text  style={[styles.textStyle2]}>₹ 100</Text>
          </View>

          <View style={styles.viewStyle}>
          <Text  style={[styles.textStyle2]}>Consultation Fee</Text>
          <Text  style={[styles.textStyle2]}>₹ 100</Text>
          </View>

          <View style={{height:1,backgroundColor:'black',width:365,marginTop:5}}></View>

          <View style={styles.viewStyle}>
          <Text  style={[styles.textStyle2]}>Total Payable</Text>
          <Text  style={[styles.textStyle2]}>₹ 100</Text>
          </View>
          
        </View>

        <View  style={[styles.thirView,{height:100}]}>
          <Text style={styles.textStyle}>Payment Mode</Text>
           <View style={{flexDirection:'row',paddingTop:5}}>
            
           <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="option1"
                        status={selectedValue === 'option1' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setSelectedValue('option1')} 
                        color='#7071E8'
                    /> 
                    <Text style={styles.radioLabel}> 
                        CASH
                    </Text> 
                </View>

                <View style={[styles.radioButton,{paddingLeft:30}]}> 
                    <RadioButton.Android 
                        value="option2"
                        status={selectedValue === 'option2' ?  
                                 'checked' : 'unchecked'} 
                        onPress={() => setSelectedValue('option2')} 
                        color='#7071E8'
                    /> 
                    <Text style={styles.radioLabel}> 
                        MEDICARE 
                    </Text> 
                </View> 
           
           </View>
         </View>
         <View style={{alignItems:'center',justifyContent:'center',marginTop:50}}>
         <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
        </View>

     </View>

  
  )
}

const styles = StyleSheet.create({
  mainView:{
   // opacity:0.25,
    backgroundColor:'#F1F1F1',
    flex:1,
  },
  headView:{
    flexDirection:'row',
    padding:10,
    alignItems:'center',
    backgroundColor:'#CACBF1',
    justifyContent:'center',
    height:100,
  },
  head:{fontSize:22,
    color:'black',
    marginRight:5
   

  },
 

  firView:{
    marginTop:10,
    height:112,
    backgroundColor:'white',
    alignItems:'center',
    flexDirection:'row',
  paddingLeft:20},

  secView:{
  marginTop:30,
  height:112,
  backgroundColor:'white',
  alignItems:'center',
  flexDirection:'row',
paddingLeft:20},

thirView:{
  marginTop:30,
  paddingTop:10,
  height:151,
  backgroundColor:'white',
  paddingHorizontal:25,
},



radioButton: { 
  flexDirection: 'row', 
  alignItems: 'center', 
}, 
radioLabel: { 
  marginLeft: 1, 
  fontSize: 16, 
  color: '#333', 
  fontWeight:'bold',
  
}, 
confirmButton: {
  backgroundColor: '#5154B0',
  opacity: 0.95,
  width: 321,
  height: 47,
  borderRadius: 20,
  justifyContent:'center' ,
  alignItems:'center',

},
confirmButtonText: {
  fontSize: 25,
  fontWeight: 'bold',
  color: 'white',
},
textStyle:{
    fontSize:21,
    color:'black',
    fontWeight:'bold'
},
textStyle2:{
    fontSize:18,
    paddingTop:3,
    color:'black'

},
viewStyle:{
    flexDirection:'row',
    marginTop:6,
    justifyContent:'space-between'
}
    

})