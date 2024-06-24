
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, TextInput,Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
 

 
export default function OTPPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { mobileNumber, originalOtp } = route.params;
  const [enteredOTP, setEnteredOTP] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false); // Initially, the button is enabled
  const [countdown, setCountdown] = useState(30); // Initial countdown value
 
  // useRef to hold a reference to the interval timer
  const timerRef = useRef(null);
 
  useEffect(() => {
    if (resendDisabled) {
      // Clear any existing timer
      if (timerRef.current) clearInterval(timerRef.current);
 
      // Start the countdown timer
      timerRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev === 0) {
            // If countdown reaches 0, clear the interval
            clearInterval(timerRef.current);
            timerRef.current = null;
            return 0; // Set countdown to 0
          } else {
            return prev - 1; // Decrement countdown
          }
        });
      }, 1000);
    } else {
      // Clear the timer when the component is unmounted or when resend is enabled
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
 
    // Cleanup function to clear the interval
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [resendDisabled]);
 
  const BackButton = ()=>{
    navigation.goBack();
   }

  const handleConfirm = async () => {
    try {
      // Check if the current time is within the allowed appointment booking time range
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
     
      const isWithinTimeRange = currentHour > 8 || (currentHour === 8 && currentMinute >= 30) && currentHour < 16 || (currentHour === 16 && currentMinute <= 30);
  
      if (isWithinTimeRange) {
        // Proceed with OTP verification and navigation logic
        if (enteredOTP === originalOtp) {
          // OTP matches the entered OTP
          // Make API call to fetch patient details
          const response = await fetch(`http://172.16.7.74/WebApiDemo1/API/Patient/${mobileNumber}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
  
          if (data.length > 0) {
            // Patients exist for the provided mobile number, navigate to AddPatient screen
            navigation.navigate('AddPatient', { patients: data,mobileNumber });
          } else {
            // No patients exist for the provided mobile number, show alert dialog
            Alert.alert(
              'No Patients Found',
              'There are no patients associated with this mobile number. Do you want to add a new patient?',
              [
                {
                  text: 'Yes',
                  onPress: () => navigation.navigate('form', {mobileNumber: mobileNumber}),
                },
                {
                  text: 'No',
                  onPress: () => navigation.navigate('mobileNum'),
                  style: 'cancel',
                },
              ],
              { cancelable: false }
            );
          }
        } else {
          // OTP didn't match, show error message or handle appropriately
          Alert.alert('Invalid OTP', 'Please enter a valid OTP.');
        }
      } else {
        // Current time is outside the allowed appointment booking time range
        navigation.navigate('WarningPage');
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
      // Handle error
    }
  };
  
  const handleResendOTP = async () => {
    try {
      // Disable the resend button
      setResendDisabled(true);
      // Reset the countdown timer
      setCountdown(30);
 
      // Generate a new OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000);
      console.log('New OTP:', newOtp);
 
      const username = 'manipalkh';
      const password = 'Kh%40321%24%23%26%25';
      const from = 'KHINFO';
      const templateId = '1107161613075790657';
 
      // Construct the message with the new OTP
      const otpMessage = `One time password is "${newOtp}". Do not disclose or share this OTP with anyone - Kasturba Hospital`;
 
      // Construct the URL for sending OTP via Infobip API
      const url = `https://nzd8x8.api.infobip.com/sms/1/text/query?username=${username}&password=${password}&from=${from}&text=${encodeURIComponent(otpMessage)}&to=91${mobileNumber}&indiaDltPrincipalEntityId=1401691940000013004&indiaDltContentTemplateId=${templateId}`;
 
      // Send the new OTP via Infobip API
      const response = await fetch(url, { method: 'POST' });
      const data = await response.json();
 
      if (response.ok) {
        console.log('OTP resent successfully:', data);
        // Set a timer to re-enable the resend button after 30 seconds
        setTimeout(() => setResendDisabled(false), 30000);
        // Navigate to the OTP page with the new OTP
        navigation.navigate('OtpPage', { mobileNumber, originalOtp: newOtp.toString() });
      } else {
        // OTP resend failed, show error message
        throw new Error(data.error || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error resending OTP:', error.message);
      // Handle error
      Alert.alert('Error', error.message || 'Failed to resend OTP. Please try again later.');
      // Re-enable the resend button in case of error
      setResendDisabled(false);
    }
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
     
     {/* <Image source={backButton}/> */}
     <TouchableOpacity onPress={BackButton}>
        <Image
          source={require('./assets/backButton.png')}
          style={[styles.backButton, { marginTop: 5 }]}
        />
        </TouchableOpacity>
 
     {/* <Text style={styles.heading}>Patient Details</Text> */}
   </View>
      <Text style={styles.title}>Enter the 6-digit OTP  </Text>
 
  <Text style={styles.title}> to {mobileNumber} </Text>
 
<View style={styles.otpBoxContainer}>
      <View style={styles.otpBox}>
 
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter OTP"
        value={enteredOTP}
        onChangeText={setEnteredOTP}
      />
      </View>
      </View>
 
      <View style={{flexDirection:'row',flex:1,margin:30,justifyContent:'center'}}>
<Text style={[styles.text, { marginLeft:8,fontSize:19}]}>Didn't Recieve the code?</Text>
<TouchableOpacity
 onPress={handleResendOTP}
 disabled={resendDisabled}>

 
        <Text style={styles.resendButtonText}>{resendDisabled ? `Resend OTP (${countdown})` : '  RESEND OTP'}</Text>
 
</TouchableOpacity>
</View>
 
      <View style={{flex:1,alignItems:'center',marginBottom:300, marginLeft:65}}>
    <Image
      source={require('./assets/otp_img.png')} />
  </View>
<View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>CONFIRM</Text>
      </TouchableOpacity>
      </View>
     
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "#CACBF1",
  },
 
  header: {
    flexDirection: "row",
    paddingTop: 25,
    //alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton:{
    width:52,
    height:38,
    margin:20
  },
 
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    // marginBottom: 20,
    marginLeft:60,
    color:"black"
 
  },
  otpBoxContainer:{
    // justifyContent:"center"
    alignItems:"center",
  },
  otpBox:{
    width:309,
    height:59,
    borderRadius:30,
    backgroundColor:'white',
    // alignContent:'center',
    // marginLeft:70,
    marginTop:40,
    alignItems:"center"
    // justifyContent:"center"
  },
 
  input: {
    // width: '80%',
    height: 50,
    fontSize:25,
    // borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    // paddingHorizontal: 10,
    // marginBottom: 20,
  },
  buttonContainer:{
    alignItems:"center"
  },
  button: {
    // backgroundColor: '#5154B0',
    // width: '80%',
    // height: 50,
    // borderRadius: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginBottom: 10,
 
    backgroundColor: '#5154B0',
    opacity: 0.95,
    width: 176,
    height: 47,
    borderRadius: 20,
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 60,
    // marginLeft:50
 
  },
  buttonText: {
    fontSize: 18,
  fontWeight: 'bold',
  color: 'white',
  },
  resendButton: {
    backgroundColor: '#ff9800',
    width: '80%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendButtonDisabled: {
    backgroundColor: 'gray',
  },
  resendButtonText: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
 
});