

//mobile number
 
import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import OtpPage from './OtpPage'; // Import the OTPPage component
 
const docImg = require("./assets/docimg.png");
 
export default function MobileNum() {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState("");
 
  const [buttonPressed, setButtonPressed] = useState(false);
  const [originalOtp, setOriginalOtp] = useState(''); // State variable to store the original OTP
  const [resentOtp, setResentOtp] = useState(''); // State variable to store the resent OTP
 
  // Function to generate a random 6-digit OTP
  const generateOTP = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000);
    console.log("Generated OTP:", newOtp);
    setOriginalOtp(newOtp.toString()); // Store the original OTP
    setResentOtp(''); // Reset the resent OTP when generating a new one
  };
 
  // Call generateOTP whenever mobile number changes
  React.useEffect(() => {
    if (mobileNumber.length === 10) {
      generateOTP();
    }
  }, [mobileNumber]);
 
  const handleOTP = async () => {
 
    setButtonPressed(true);
    if (!mobileNumber || isNaN(mobileNumber) || mobileNumber.length !== 10) {
      console.error('Invalid mobile number');
      return;
    }
 
    const username = 'manipalkh';
    const password = 'Kh%40321%24%23%26%25';
    const from = 'KHINFO';
    const templateId = '1107161613075790657';
 
    const otpMessage = `One time password is "${originalOtp}". Do not disclose or share this OTP with anyone - Kasturba Hospital`;
 //remove comment
    const url = `https://nzd8x8.api.infobip.com/sms/1/text/query?username=${username}&password=${password}&from=${from}&text=${encodeURIComponent(otpMessage)}&to=91${mobileNumber}&indiaDltPrincipalEntityId=1401691940000013004&indiaDltContentTemplateId=${templateId}`;
 
    try {
       const response = await fetch(url, { method: 'POST' });
      const data = await response.json();
      // console.log('OTP sent successfully:', data);
 
      navigation.navigate('OtpPage', { mobileNumber, originalOtp });
      
 
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
 
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(29, 36, 211, 0.25)" />
      <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.main}>
        <Text style={styles.KMC}>KMC</Text>
        <Image source={docImg} style={styles.image} />
      </View>
 
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.quote}>Let’s get started! Enter your mobile number</Text>
        </View>
 
        <View style={styles.box}>
          <TextInput
            style={styles.MOB}
            placeholder="Mobile Number"
            keyboardType="numeric"
            placeholderTextColor={"grey"}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            autoFocus={true}
            color="black" // Add this line to set the text color
          />
        </View>
 

 
           {buttonPressed && (!mobileNumber || mobileNumber.length !== 10) && (
            <Text style={styles.errorText}>Invalid</Text>
          )}
 
        <TouchableOpacity style={styles.button} onPress={handleOTP}>
          <Text style={styles.buttonText}>GET OTP</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    backgroundColor: "rgba(29, 36, 211, 0.25)",
    padding: 45
  },
  KMC: {
    color: "black",
    fontSize: 40,
  },
  image: {
    marginTop: 200,
    marginLeft: 32
  },
  quote: {
    textAlign: 'center',
    fontSize: 20,
    color: "black",
    marginTop: 50,
    fontWeight: "normal"
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: 60,
    width: 370,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  MOB: {
    fontSize: 23,
  },
  button: {
    backgroundColor: "#5154B0",
    height: 50,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 22,
    fontWeight: "400",
    marginTop: 10
  },
  errorText: {
    color: 'red',
    fontSize: 17,
  },
  bottomContainer: {
    alignItems: "center"
  }
});