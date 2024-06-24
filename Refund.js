//Refund Policy
 
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
 
export default function Refund() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>REFUND POLICY</Text>
 
      <Text style={styles.subheading}>1. Refund Policy:</Text>
      <Text style={styles.text}>
        1.1 Refunds Eligibility: Refunds are only applicable under specific circumstances as outlined below.
      </Text>
      <Text style={styles.text}>
        1.2 Cancellation Deadline: Patients must cancel their appointment at least 24 hours prior to the scheduled appointment time to be eligible for a refund.
      </Text>
      <Text style={styles.text}>
        1.3 Refund Processing Time: Refunds will be processed within 7-10 business days after the cancellation request is approved.
      </Text>
      <Text style={styles.text}>
        1.4 Non-Refundable Services: Certain services, such as emergency appointments or specialized consultations, may not be eligible for refunds.
      </Text>
      <Text style={styles.text}>
        1.5 Refund Method: Refunds will be issued using the same payment method used for the original transaction.
      </Text>
      <Text style={styles.text}>
        1.6 Refund Request: Patients must submit a refund request through contacting the hospital customer service department directly.
      </Text>
 
      <Text style={styles.subheading}>2. Modifications:</Text>
      <Text style={styles.text}>
        The hospital reserves the right to modify the refund and cancellation policies at any time without prior notice. Any changes to the policies will be effective immediately upon posting on the hospital's website.
      </Text>
 
      <Text style={styles.subheading}>Contact Information:</Text>
      <Text style={styles.text}>
        For inquiries regarding the refund and cancellation policies, please contact:
      </Text>
      <Text style={styles.text}>Kasturba Hospital</Text>
      <Text style={styles.text}>Madav Nagar, Manipal, Post Box NO 7</Text>
      <Text style={styles.text}>91 820 2571201-210</Text>
      <Text style={styles.text}>office.kh@manipal.edu</Text>
 
      <Text style={styles.note}>
        Note: By ticking the checkbox, you acknowledge that you have read and understood the terms of this consent agreement and you voluntarily consent to Kasturba Hospital's use of your provided information for communication purposes as described herein.      
 
      </Text>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black',
  },
  subheading: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10,
    color:'black',
    marginBottom: 5,
  },
  text: {
    fontSize: 17,
    marginBottom: 5,
    color:'black',
    lineHeight: 22,
  },
  note: {
    fontSize: 17,
    marginTop: 20,
    marginBottom:40,
    fontStyle: 'italic',
    color:'black',
  },
});