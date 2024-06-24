
 
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import  { useState, useEffect } from 'react';
import React from 'react'
import { RadioButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
 
 
 
export default function BillPage() {
  const route = useRoute();
  const { patientId, patientName,medicareNumber, teamData, selectedSpecialtyName, doctorName,doctorId, date,mobileNumber } = route.params;
 
    console.log("Patient ID:", patientId);
    console.log("Patient Name:", patientName);
    console.log("Selected Team Data:", teamData);
    console.log("Selected Doctor Name:", doctorName);
    console.log("Formatted Date:", date);
    console.log('MEDICARE NUMBER',medicareNumber);
 
 
   const [selectedValue, setSelectedValue] = useState('option1');
   const navigation = useNavigation();
 
 
 
 
  const [consultationFee, setConsultationFee] = useState(0);
  const [registrationFee, setRegistrationFee] = useState(0);
  const [totalPayable, setTotalPayable] = useState(registrationFee + consultationFee);
  // Assuming the original patient ID is in the format '03424103'
const formattedPatientId = patientId.trim();
 

 
 
useEffect(() => {
  const fetchFees = async () => {
    try {
      const teamId = teamData.TeamCode;
      const OPD = teamData.OPD;
 
      const response = await fetch(`http://172.16.7.196/medics/extapi/api/getConsultationCharges?entityRID=4&patientID=${formattedPatientId}&TeamRID=${teamId}&isOPD=${OPD}&DoctorId=${doctorId}`);
      console.log('url ', response);
 
      if (response.ok) {
        const data = await response.json();
        console.log('Data from API:', data);
 
        if (data && data.data && data.data.length > 0) {
          const feeData = data.data;
 
          let registrationAmt = 0;
          let consultationAmt = 0;
 
          if (feeData.length === 2) {
            registrationAmt = parseFloat(feeData[0].PaitentAmt);
            consultationAmt = parseFloat(feeData[1].PaitentAmt);
          } else if (feeData.length === 1) {
            consultationAmt = parseFloat(feeData[0].PaitentAmt);
          }
 
          setRegistrationFee(registrationAmt);
          setConsultationFee(consultationAmt);
        } else {
          console.error('Error: Fees data is missing or in incorrect format');
        }
      } else {
        console.error('Error fetching fees:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching fees:', error);
    }
  };
 
  fetchFees();
}, []);
 
 
// const totalPayable = registrationFee + consultationFee;
 
useEffect(() => {
  // Calculate the total payable amount based on the default payment mode
  setTotalPayable(selectedValue === 'option1' ? registrationFee + consultationFee : 0);
}, [selectedValue, registrationFee, consultationFee]);
 
 
   const backButton = ()=>{
    navigation.goBack();
   };

   const handleConfirm = async () => {
    try {
      const teamId = teamData.TeamCode;
      const OPD = teamData.OPD;
  
      const response = await fetch(`http://172.16.7.196/medics/extapi/api/getConsultationCharges?entityRID=4&patientID=${formattedPatientId}&TeamRID=${teamId}&isOPD=${OPD}&DoctorId=${doctorId}`);
      //console.log('url ', response);
  
      if (response.ok) {
        const responseData = await response.json();
       // console.log('Data from API:', responseData);
  
        navigation.navigate('Successfull', {
          teamCode: teamData.TeamCode,
          doctorId: doctorId,
          defaultLocationID: teamData.DefaultLocationID,
          patientId: patientId,
          patientName,
          date: date,
          apiResponse: responseData,
          mobileNumber
        });
      } else {
        console.error('Error fetching fees:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching fees:', error);
    }
  };
  
  
  

   
  return (
    //First main view
    <View style={styles.mainView}>
     <View style={styles.headView}>
     <TouchableOpacity onPress={backButton}>
      <Image
      source={require('./assets/backButton.png')} style={{width:52,height:38,marginRight:40}}/>
      </TouchableOpacity>
      <Text style={styles.head}>Book In-Clinic Appointment</Text>
     </View>
 
     
 
         <View  style={styles.firView}>
 
          <Image
           source={require('./assets/doc.jpg')} style={{width:100,height:90,borderRadius:10}}/>
           <View style={{paddingLeft:25}}>
           <Text style={styles.mainText}>{doctorName}</Text>
           <Text  style={styles.subText}>{selectedSpecialtyName}</Text>
 
           </View>
         </View>
 
         <View  style={styles.secView}>
          <Image
           source={require('./assets/timer.png')} style={{width:27,height:27,borderRadius:10}}/>
           <View style={{paddingLeft:25}}>
           <Text style={styles.textStyle}>Appointment Date</Text>
 
           
           <Text  style={styles.textStyle2}>{date}
 
           </Text>
 
 
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
                               
                        onPress={async() => {setSelectedValue('option1');
                        setSelectedValue('option1');
                        setTotalPayable(registrationFee + consultationFee);
                        }}
                        color='#7071E8'
                    />
                    <Text style={styles.radioLabel}>
                        CASH
                    </Text>
                </View>
 
                <View style={[styles.radioButton,{paddingLeft:30}]}>
                <RadioButton.Android
        value="option2"
        status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
        onPress={async () => {
            setSelectedValue('option2');
            try {
                const MedicareRes = await fetch(`http://172.16.7.196/medics/extapi/api/getPatientDetailsByID?patientID=${formattedPatientId}&entityRID=4&medicareNo=${medicareNumber}`);
                if (MedicareRes.ok) {
                    const data = await MedicareRes.json();
                    if (data && data.data && data.data.AssingedMedicareLimit && data.data.BalanceMedicareLimit) {
                        const assignedLimit = data.data.AssingedMedicareLimit;
                        let remainingLimit = data.data.BalanceMedicareLimit;
                        console.log("AssingedMedicareLimit:", assignedLimit);
                        console.log("BalanceMedicareLimit:", remainingLimit);
                       
                        // Calculate total bill amount
                        const totalBillAmount = consultationFee + registrationFee;
 
                        if (remainingLimit >= totalBillAmount) {
                            console.log("Bill amount is covered by Medicare limit.");
                            // Deduct the bill amount from remainingLimit
                            remainingLimit -= totalBillAmount;
                            console.log("Remaining Medicare limit after deduction:", remainingLimit);
                            setTotalPayable(0);
                            // Proceed further with appointment creation and bill generation
                        } else {
                            console.log("Medicare limit is less than bill amount.");
                            // Display a message to the user or handle the case accordingly
                            const amountToPay = totalBillAmount - remainingLimit;
                            console.log("Patient needs to pay out of pocket:", amountToPay);
                            // Set totalPayable to the amount patient needs to pay out of pocket
                            setTotalPayable(amountToPay);
                        }
                        // Set totalPayable to 0 since Medicare covers the bill
                       
                    } else {
                        console.log("Error: Incomplete Medicare limit data in the API response.");
                    }
                } else {
                    console.log("Error fetching Medicare limit:", MedicareRes.status);
                }
            } catch (error) {
                console.error('Error fetching Medicare limit:', error);
            }
        }}
        color='#7071E8'
    />
                    <Text style={styles.radioLabel}>
                        MEDICARE
                    </Text>
                </View>
           
           </View>
         </View>
         
 
        <View  style={styles.thirView}>
          <Text style={styles.textStyle}>Bill Details</Text>
          <View style={styles.viewStyle}>
          <Text  style={[styles.textStyle2]}>Registration Fee</Text>
          <Text  style={[styles.textStyle2]}>₹{registrationFee}</Text>
          </View>
 
          <View style={styles.viewStyle}>
          <Text  style={[styles.textStyle2]}>Consultation Fee</Text>
          <Text  style={[styles.textStyle2]}>₹{consultationFee}</Text>
          </View>
 
         
         
        </View>
 
        <View  style={styles.forthView}>
        <View style={styles.viewStyle}>
          <Text  style={[styles.textStyle]}>Total Payable:  </Text>
          <Text  style={[styles.textStyle]}>₹{totalPayable}</Text>
          </View>
         </View>
   
         <View style={{alignItems:'center',justifyContent:'center',marginTop:30}}>
         <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
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
  height:130,
  backgroundColor:'white',
  paddingHorizontal:25,
},
forthView:{
  marginTop:30,
  height:50,
  backgroundColor:'white',
  justifyContent:'space-between',
  alignItems:'center'
 // paddingHorizontal:25,
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
 