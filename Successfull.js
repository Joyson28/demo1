import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Success() {
  const route = useRoute();
  const { teamCode, doctorId, defaultLocationID, patientId, date, apiResponse, mobileNumber, patientName } = route.params || {};
  const [visitID, setVisitID] = useState(null);
  const [billInfo, setBillInfo] = useState(null);
  const [billSeqNo, setBillSeqNo] = useState(null);
  const [apiResponseData, setApiResponseData] = useState([]);

  // Print received data to console
  useEffect(() => {
    console.log('Received Data:');
    console.log('Team Code:', teamCode);
    console.log('Doctor ID:', doctorId);
    console.log('Default Location ID:', defaultLocationID);
    console.log('Patient ID:', patientId);
    console.log('Patient Name:', patientName);
    console.log('Date:', date);
    console.log('Mobile Number:', mobileNumber);
  }, [teamCode, doctorId, defaultLocationID, patientId, date, apiResponse]);

  useEffect(() => {
    const fetchBillSeqNo = async () => {
      try {
        let lastBillSeqNo = await AsyncStorage.getItem('lastBillSeqNo');
        if (!lastBillSeqNo) {
          lastBillSeqNo = '2021';
        } else {
          lastBillSeqNo = (parseInt(lastBillSeqNo, 10) + 1).toString();
        }
        setBillSeqNo(lastBillSeqNo);
        console.log('Generated Bill Sequence Number:', lastBillSeqNo); // Print generated bill sequence number
        await AsyncStorage.setItem('lastBillSeqNo', lastBillSeqNo);
      } catch (error) {
        console.error('Error fetching or updating bill sequence number:', error);
      }
    };

    fetchBillSeqNo();
  }, []);

  // Extract data from apiResponse
  useEffect(() => {
    if (apiResponse && apiResponse.data) {
      const responseData = apiResponse.data;
      setApiResponseData(responseData);
      console.log('API Response Data:', responseData);
    }
  }, [apiResponse]);

  useEffect(() => {
    const savePatientVisit = async () => {
      try {
        const apiUrl = 'http://172.16.7.192:8080/medicsValidation/extapi/api/savePatientVisit';
        const userToken = '43eb1b996f4b80ddb07027f2b4ff762295d82e79d677047c9ba8ee0cea378769a42e053da016b7c1eca48a3fb1cf6f3d';
        const requestBody = {
          teamID: teamCode,
          doctorID: String(doctorId), // Convert doctorId to string explicitly
          locationID: defaultLocationID,
          patientID: patientId,
          MPSREF_ID: '849488494880',
          hasAppointment: '0',
          appointmentDate: date
        };

        const response = await axios.post(apiUrl, requestBody, {
          headers: {
            userToken: userToken
          }
        });

        if (response.status === 200) {
          const generatedVisitID = response.data.data.visitID;
          setVisitID(generatedVisitID);
          console.log('Visit ID:', generatedVisitID);
          await saveBill(generatedVisitID); // Call saveBill after saving patient visit
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const saveBill = async (visitID) => {
      try {
        const apiUrl = 'http://172.16.7.192:8080/medicsValidation/extapi/api/saveBill';
        const userToken = '43eb1b996f4b80ddb07027f2b4ff762295d82e79d677047c9ba8ee0cea378769a42e053da016b7c1eca48a3fb1cf6f3d';

        // Process the API response data to create the items array
        const items = apiResponseData.map(item => ({
          serviceID: item.ServiceID,
          Quantity: item.Quantity,
          Rate: item.Rate,
          Discount: item.Discount,
          Tax: item.Tax,
          Gross: item.Gross,
          PatientAmt: item.PaitentAmt,
          CompanyAmt: item.CompanyAmt,
        }));
        console.log('items', items);

        const requestBody = {
          visitID: visitID,
          patientID: patientId,
          billNoPrefix: 'PatApp',
          billSeqNo: billSeqNo,
          medicareNo: '',
          MPSREF_ID: '849488494880',
          items: items
        };
        console.log("requestBody of save bill", requestBody);

        const response = await axios.post(apiUrl, requestBody, {
          headers: {
            userToken: userToken
          }
        });

        if (response.status === 200) {
          const billData = response.data.data;
          setBillInfo(billData);
          console.log('Bill Info:', billData);
          sendConfirmationSMS(); // Call sendConfirmationSMS after saving bill
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (billSeqNo && apiResponseData.length > 0) {
      savePatientVisit();
    }
  }, [billSeqNo, apiResponseData]);

  const sendConfirmationSMS = async () => {
    if (!mobileNumber || isNaN(mobileNumber) || mobileNumber.length !== 10) {
      console.error('Invalid mobile number');
      return;
    }

    const username = 'manipalkh';
    const password = 'Kh%40321%24%23%26%25';
    const from = 'KHINFO';
    const templateId = '1107161787814102905';
    const msg = `Dear ${patientName}, Your registration has been confirmed at Kasturba Hospital, Manipal on Date ${new Date().toLocaleDateString('en-GB')}. For more information call: 08202922761. Regards, KH, Manipal`;

    const url = `https://nzd8x8.api.infobip.com/sms/1/text/query?username=${username}&password=${password}&from=${from}&text=${encodeURIComponent(msg)}&to=91${mobileNumber}&indiaDltPrincipalEntityId=1401691940000013004&indiaDltContentTemplateId=${templateId}`;
console.log('confirmation payment',url);
    try {
      const response = await fetch(url, { method: 'POST' });
      const data = await response.json();
      console.log('Confirmation message sent successfully:', data);
    } catch (error) {
      console.error('Error sending confirmation message:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.circle}>
          <Text style={styles.tick}>✓</Text>
        </View>
        <View style={styles.textview}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Payment Success!</Text>
          <Text style={{ fontSize: 18, color: 'black' }}>
            {'\n'}{'\t\t'}Your Appointment has been booked successfully
          </Text>
          {visitID && (
            <Text style={{ fontSize: 18, color: 'black' }}>
              {'\n'}{'\t\t'}Visit ID: {visitID}
            </Text>
          )}
          {billInfo && (
            <Text style={{ fontSize: 18, color: 'black' }}>
              {'\n'}{'\t\t'}Billing Number: {billInfo.BillingNumber}
            </Text>
          )}
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Generate Receipt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(29, 36, 211, 0.25)",
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: 300,
    height: 500,
    padding: 45,
    alignItems: 'center',
    shadowColor: '#000', // Shadow color
    shadowOpacity: 0.5, // Shadow opacity
    shadowOffset: {
      width: 0, // No shadow horizontally
      height: 9, // Shadow height
    },
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Android shadow
  },
  circle: {
    width: 80,
    marginTop: 50,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tick: {
    fontSize: 50,
    color: 'white',
  },
  textview: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 2,
    borderColor: '#5154B0',
    height: 50,
    width: 200,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 60,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: "center",
    color: "#5154B0",
    fontSize: 20,
    fontWeight: "400",
  }
});




