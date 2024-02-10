import { Image, StyleSheet, Text, View, Pressable, TouchableHighlight, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";


export default function bookSlots() {
  const [date, setDate] = useState(null); // Initialize with null
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleButtonPress = (time) => {
    console.log(`${time} Selected`);
    setSelectedSlot(time);
    
  };

  const renderButton = (time) => (
    <TouchableHighlight
      key={time}
      style={[
        styles.button,
        selectedSlot === time && styles.selectedButton,
      ]}
      onPress={() => handleButtonPress(time)}
    >
      <Text style={styles.buttonText}>{time}</Text>
    </TouchableHighlight>
  );

  return (
    //First main view
    <View style={styles.mainView}>
     <View style={styles.headView}>
      <Image
      source={require('./assets/backButton.png')} style={{width:52,height:38}}/>
      <Text style={styles.headText}>Book Consultation</Text>
     </View>
         <View  style={styles.main2View}>
          <Image
           source={require('./assets/doc.png')} style={{width:100,height:90,borderRadius:10}}/>
           <View style={{paddingLeft:25}}>
           <Text style={styles.mainText}>Dr. Ramakrishna ⭐</Text>
           <Text  style={styles.subText}>Cardiologist</Text>
           </View>
         </View>

{/*Date selection code*/}

         <View  style={styles.dateView}>
         <Text style={styles.mainText}>Select Date for Consultation</Text>
         <View style={{ flexDirection: "row", alignItems: 'center'}}>
          <Text style={styles.mainText}> Date: </Text>
          <Pressable onPress={showDatepicker}>
            <View style={{ width: 250, height: 30, borderBottomWidth: 2, flexDirection:"row"}}>
              <Text style={[styles.mainText,{ width: 230, height: 30, marginLeft:50, }]}>{showDatePicker ? "Select a date" : (date ? date.toDateString() : "")}</Text>
              <Image source={require('./assets/Vector.png')} style={{width:30,height:30, marginLeft:0 }}/>
           </View>
          </Pressable>
          </View>
          {showDatePicker && (
          <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()} // Pass a default date to the picker
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
          />
          )}
          </View>

    {/*Time slot code*/}

    <View
        style={styles.timeView}>
        <ScrollView>
        <Text style={styles.mainText}>
          Select Time for Consultation
        </Text>

        {/* Morning slots */}
        <View style={{ paddingStart: 7, marginTop: 20 }}>
          <Text style={styles.subText}>Morning</Text>
          <View style={{ flexDirection: "row" }}>
            {["10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM"].map(renderButton)}
          </View>
          <View style={{ flexDirection: "row" }}>
            {["11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM"].map(renderButton)}
          </View>
          <View style={{ flexDirection: "row" }}>
            {["12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM"].map(renderButton)}
          </View>
        </View>

        {/* Afternoon slots */}
        <View style={{ paddingStart: 7, marginTop: 20 }}>
          <Text style={styles.subText}>Afternoon</Text>
          <View style={{ flexDirection: "row" }}>
            {["02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM"].map(renderButton)}
          </View>
          <View style={{ flexDirection: "row" }}>
            {["03:00 PM", "03:15 PM", "03:30 PM", "03:45 PM"].map(renderButton)}
          </View>
        </View>

        {/* Evening slots */}
        <View style={{ paddingStart: 7, marginTop: 20 , marginBottom:20}}>
          <Text style={styles.subText}>Evening</Text>
          <View style={{ flexDirection: "row" }}>
            {["04:00 PM", "04:15 PM", "04:30 PM", "04:45 PM"].map(renderButton)}
          </View>
          <View style={{ flexDirection: "row" }}>
            {["05:00 PM", "05:15 PM", "05:30 PM", "05:45 PM"].map(renderButton)}
          </View>
        </View>
        </ScrollView>
      </View>
      <View style={{alignItems: "center", justifyContent:"center", marginTop:30}}>
      <TouchableOpacity style={styles.confirmButton} onPress={()=> console.log("Slot has been selected")}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
      </View>
    </View>

    
  )
}

const styles = StyleSheet.create({
  mainView:{
   // opacity:0.25,
   flex:1,
    backgroundColor:'#F1F1F1',
    
  },
  headView:{
    flexDirection:'row',
    padding:10,
    alignItems:'center',
    backgroundColor:'#CACBF1',
    paddingHorizontal:16,
    height:100,
    color:"black",
  
  },
  headText:{fontSize:22,
    paddingVertical:4,
    paddingLeft:25

  },
 
  main2View:{
    marginTop:20,
    height:112,
    backgroundColor:'white',
    alignItems:'center',
    flexDirection:'row',
  paddingLeft:20},

  dateView:{
  marginTop:20,
  height:112,
  backgroundColor:'white',
  alignItems:'flex-start',
  justifyContent:'center',
paddingLeft:10},

timeView:{
  height: 350, 
  width: 410, 
  backgroundColor: "white", 
  padding: 5, marginTop:20,
 
 
},

mainText:{
  fontSize:20,
  fontWeight:'bold', 
  color:"black"

},

subText: {
  fontSize: 15, 
  fontWeight: "bold", 
  color:"black"

},

button: {
  backgroundColor: "#F1F1F1",
  padding: 10,
  margin: 5,
  borderRadius: 5,
},

selectedButton: {
  backgroundColor: "lightblue", 
},

buttonText: {
  color: "black",
  fontSize: 16,
},

confirmButton: {
  backgroundColor: '#5154B0',
  opacity: 0.95,
  width: 200,
  height:50,
  borderRadius:20,
  alignItems: "center", 
  justifyContent:"center",


  
},

confirmText: {
  fontSize:25,
  fontWeight:"bold",
  color:"white",
},

})