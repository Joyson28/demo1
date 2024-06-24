import React, { useEffect,useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";

import { View, StyleSheet, StatusBar, Image, Text, Button, TextInput, TouchableOpacity, ScrollView } from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { format } from 'date-fns';

const backButton = require("./assets/backButton.png");

 

 

export default function Form() {

  const route = useRoute();

  const { mobileNumber } = route.params;

  console.log("vusvfvskgfgfkgf",mobileNumber);

  //const {  patientId, patientName } = route.params;

  const navigation = useNavigation();

 

  const [fullName, setFullName] = useState("");

  const [fatherName, setFatherName] = useState("");

  const [inputMobileNumber , setMobileNumber] = useState("");

  const [gender, setGender] = useState("");

  const [emailId, setEmailId] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);

  const [address, setAddress] = useState("");

  const [states, setState] = useState("");

  const [formError, setFormError] = useState("");

  const [isMobileNumberFocused, setIsMobileNumberFocused] = useState(false);

  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {

    if (mobileNumber) {

      setMobileNumber(mobileNumber);

    }

  }, [mobileNumber]);

 

  const handleMobileNumberFocus = () => {

    setIsMobileNumberFocused(true);

  };

 

  const handleMobileNumberBlur = () => {

    setIsMobileNumberFocused(false);

  };

 
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showPicker = () => {
    setShowDatePicker(true);
  };
 
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  


const handleSubmit = async () => {
  if (
    !fullName.trim() ||
    !fatherName.trim() ||
    !mobileNumber.trim() ||
    !gender.trim() ||
    !date ||
    !emailId.trim() ||
    !isEmailValid ||
    !address.trim() ||
    !states.trim()
  ) {
    setFormError("Please enter all the fields with valid data");
    return;
  }

  try {
    const formattedDOB = formatDate(date);
    const requestData = {
      patientFullName: fullName,
      patientTitle: "",
      fatherName: fatherName,
      motherName: "", 
      spouseName: "",
      patientGender: gender,
      patientAddress: address,
      patientMobileNo: mobileNumber,
      patientOcuupation: "",
      patientReligion: "",
      patientNationality: "", 
      patientDistrict: "", 
      patientTaluk: "", 
      patientCity: "", 
      patientArea: "",
      patientState: states,
      patientCountry: "",
      pincode: "", 
      patientEmail: emailId,
      patientMaritailStatus: "", 
      patientDOB: formattedDOB,
    };
   // console.log("requestData", requestData);

    const responseGenerated = await axios.post(
      'http://172.16.7.192:8080/medicsValidation/extapi/api/createPatient',
      requestData,
      {
        headers: {
          userToken: '43eb1b996f4b80ddb07027f2b4ff762295d82e79d677047c9ba8ee0cea378769a42e053da016b7c1eca48a3fb1cf6f3d'
        }
      }
    );
    //console.log("responseGenerated", responseGenerated);

    
    const patientID = responseGenerated.data.data.patientID;
    console.log('Patient ID:', patientID);
    const UHID = responseGenerated.data.data.UHID;
    console.log('UHID:', UHID);
    
    if (responseGenerated.data.STATUS === 200) {
      


   
      const formData = {
        patientID, 
        UHID,
        fullName,
        fatherName,
        mobileNumber,
        gender,
        formattedDOB,
        emailId,
        address,
        states,
      };
      
      console.log("formData",formData);

      const response = await fetch('http://10.0.2.2:8080/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log("response",response);
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      const data = await response.json();
      console.log('Success:', data);

      navigation.navigate('Speciality', {patientId: UHID, patientName:fullName, mobileNumber });
    } else {
      // Handle API response status other than 200
      console.error('Error:', responseGenerated.data);
    }
  } catch (error) {
    console.error('Errorr:', error);
    // Handle error here, show an error message or retry submission
    setFormError("Network request failed. Please try again later.");
  }
};




  const validateEmail = (text) => {

    // Regular expression pattern for validating email addresses

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   

    // Check if the provided text matches the email pattern

    const isValidEmail = emailRegex.test(text);

   

    // Update the state variable to reflect the validity of the email address

    setIsEmailValid(isValidEmail);

   

    // Update the state variable to store the current email address

    setEmailId(text);

  };


  return (

    <View style={styles.container}>

      <StatusBar backgroundColor={"rgba(29, 36, 211, 0.25)"} />

     <ScrollView keyboardShouldPersistTaps="handled">

      <View style={styles.header}>

        <TouchableOpacity onPress={() => navigation.goBack()}>

        <Image source={backButton} />

        </TouchableOpacity>

        <Text style={styles.heading}>Patient Details</Text>

      </View>

 

 

      <View style={styles.formContainer}>

        <View style={styles.inputContainer}>

          <TextInput

            style={styles.input}

            placeholder="Full Name"

            placeholderTextColor={styles.placeholder.color}

            value={fullName}

            onChangeText={(text) => setFullName(text)}

          />

        </View>

 

        <View style={styles.inputContainer}>

          <TextInput

            style={styles.input}

            placeholder="Father Name"

            placeholderTextColor={styles.placeholder.color}

            value={fatherName}

            onChangeText={(text) => setFatherName(text)}

          />

        </View>

 

        <View style={styles.inputContainer}>

  <TextInput

    style={[styles.input, { backgroundColor: '#F2F2F2' }]}

    placeholder="Mobile Number"

    placeholderTextColor={styles.placeholder.color}

    value={inputMobileNumber}

    editable={false} // Make the TextInput read-only

  />

 

 

</View>

 

 

 

        <View style={styles.inputContainer}>

          <TextInput

            style={styles.input}

            placeholder="Gender"

            placeholderTextColor={styles.placeholder.color}

            value={gender}

            onChangeText={(text) => setGender(text)}

          />

        </View>

 

        <View style={styles.inputContainer}>
            <TouchableOpacity onPress={showPicker} style={styles.input}>
              <TextInput
                style={{ fontSize: 22, fontWeight: "bold" }}
                placeholder="Date of Birth"
                placeholderTextColor="#888"
                value={date ? formatDate(date) : ''}
                editable={false} 
                onChangeText={(text) => setDate(selectedDate)}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date || new Date()} // Default to current date if date is null
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

 

        <View style={styles.inputContainer}>

  <TextInput

    style={[styles.input, !isEmailValid && styles.inputError]}

    placeholder="Email id"

    placeholderTextColor={styles.placeholder.color}

    value={emailId}

    onChangeText={(text) => validateEmail(text)}

  />

  {!isEmailValid && <Text style={[styles.errorText]}>Invalid</Text>}

</View>


        <View style={styles.inputContainer}>

          <TextInput

            style={styles.input}

            placeholder="Address"

            placeholderTextColor={styles.placeholder.color}

            value={address}

            onChangeText={(text) => setAddress(text)}

          />

        </View>

 

        <View style={styles.inputContainer}>

          <TextInput

            style={styles.input}

            placeholder="State"

            placeholderTextColor={styles.placeholder.color}

            value={states} f

            onChangeText={(text) => setState(text)}

          />

        </View>

 

        {formError !== "" && <Text style={styles.errorText}>{formError}</Text>}

 

        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>

            <Text style={styles.buttonText}>SUBMIT</Text>

          </TouchableOpacity>

        </View>

      </View>
      </ScrollView>
    </View>

  );

}

 

 

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "rgba(29, 36, 211, 0.25)",

  },

  header: {

    flexDirection: "row",

    paddingTop: 25,

    alignItems: "center",

    paddingHorizontal: 16,

  },

  heading: {

    fontSize: 30,

    color: "black",

    fontWeight: "400",

    paddingLeft: 45,

  },

  formContainer: {

    justifyContent: "center",

    backgroundColor: "white",

    height: 680,

    width: 350,

    marginLeft: 30,

    marginTop: 30,

    borderRadius: 30,

    shadowColor: "#000",

    shadowOpacity: 0.5,

    shadowRadius: 3.84,

    elevation: 10,

  },

  input: {

    height: 47,

    borderBottomColor: "rgba(29, 36, 211, 0.25)",

    borderBottomWidth: 1,

    paddingLeft: 10,

    fontSize: 22,

    fontWeight: "300",

    width: "90%",

    marginHorizontal: "8%",

    color: "black",

    fontWeight: "300",

  },

 

 

  

  placeholder: {

    color: "gray",

  },

 

 

  inputError: {

    borderBottomColor: "red",

  },

  placeholder: {

    color: "gray",

  },

  errorText: {

    color: "red",

    fontSize: 14,

    marginTop: 5,

    textAlign: 'center',

  },

  buttonContainer: {

    alignItems: "center",

  },

  button: {

    backgroundColor: "#5154B0",

    height: 50,

    width: 150,

    borderRadius: 20,

  },

  buttonText: {

    textAlign: "center",

    color: "white",

    fontSize: 22,

    fontWeight: "400",

    marginTop: 10,

  },

  inputContainer: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    width: '80%',

    marginHorizontal: '8%',

    marginBottom: 20,

  },
});





