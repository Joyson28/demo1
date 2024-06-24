
//Addpatient
 
import React from "react";
import { View, StyleSheet,Image, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
 
export default function AddPatient({ route }) {
  const { patients,mobileNumber } = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState(null);
 
 
 console.log("fhfhfrhthr",mobileNumber);
  const handlePatientPress = (patient) => {
    setSelectedPatient(patient);
    setModalVisible(true);
  };
  const handleNext = () => {
    setModalVisible(false);
    // Navigate to the specialty page here
    navigation.navigate('Speciality', { mobileNumber,patientId: selectedPatient.PG_REGNO, patientName:selectedPatient.PG_REG_NAME,medicareNumber:selectedPatient.PG_MEDICARE_REF_BY }); 
  console.log('Patient id', selectedPatient.PG_REGNO)
  console.log('Patient Name', selectedPatient.PG_REG_NAME)
  console.log('Medicare Number', selectedPatient.PG_MEDICARE_REF_BY)
  console.log('mobileNumber',mobileNumber)
    // Replace 'SpecialtyPage' with the actual name of your specialty page component
  };
  const BackButton = () => {
    navigation.goBack();
  };
 

  const  addpatient=()=>{
       navigation.navigate('form',{mobileNumber});
      }
    
 
  return (
    <View style={styles.container}>
      <View style={styles.topnavigation}>
      <TouchableOpacity onPress={BackButton}>
          <Image
            source={require('./assets/backButton.png')}
            style={[styles.backButton, { marginTop: 5 }]}
          />
        </TouchableOpacity>
      <Text style={styles.heading}>Registered Patients</Text>
     
      </View>
     <View style={styles.flatcontainer}>
      <FlatList
        data={patients}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePatientPress(item)}>
            <View style={styles.patientItem}>
              <Text style={styles.patientName}>{item.PG_REG_NAME}</Text>
              <Text style={styles.patientRegNo}>Hosp Number: {item.PG_REGNO}</Text>
            </View>
          </TouchableOpacity>
        )}
       
        keyExtractor={(item) => item.PG_REGNO.toString()}
      />
     </View>
          <View style={styles.AddPatient}>
        <Image source={require('./assets/Vector1.png')} style={{ marginTop: 40, marginLeft: 120 }} />
        <Text style={styles.addpat}>Add New Patient</Text>
        <TouchableOpacity style={styles.addButton}  onPress={() => addpatient()}>
          <Text style={styles.addButtonText}>+ADD</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedPatient(null);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Patient Details</Text>
          {selectedPatient && (
            <>
              <Text style={styles.patientDetail}>Name: {selectedPatient.PG_REG_NAME}</Text>
              <Text style={styles.patientDetail}>Hosp Number: {selectedPatient.PG_REGNO}</Text>
              {/* Add more patient details as needed */}
            </>
          )}
           <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#5154B0",}}
              onPress={handleNext}
            >
              <Text style={styles.textOpen}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.closeButton, backgroundColor: "#5154B0",}}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textClose}>Close</Text>
            </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CACBF1',
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    marginLeft:30
  },
  topnavigation: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    paddingHorizontal: 2,
    paddingTop: 5,
    alignItems: 'center',
  },
  patientItem: {
 
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 0,
    marginBottom: 0,
    // elevation: 2,
  },
  flatcontainer:{
    height:400,
    marginTop:20,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  patientRegNo: {
    color: '#666',
    marginTop: 5,
  },
  AddPatient: {
    marginTop: 40,
     marginLeft: 30,
    borderRadius: 20,
    width: 300,
    height: 220,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOpacity:0.5,
    elevation:10,
},
  addpat: {
    marginTop: 10,
    marginLeft: 80,
    fontSize: 18,
    color: 'black',
  },
  addButton: {
    backgroundColor: '#5154B0',
    opacity: 0.95,
    width: 100,
    height: 37,
    borderRadius: 20,
    paddingLeft: 60,
    paddingTop: 5,
    marginTop: 30,
    marginLeft: 100,
  },
  addButtonText: {
    right: 30,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  modalView: {
    margin: 20,
    marginTop: 500,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  patientDetail: {
    marginBottom: 10,
    fontSize: 18,
    color: "black",
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  openButton:{
 
    marginTops:10,
    width:70,
    height:35,
    marginRight:140,
    borderRadius:15,
   
  },
  textOpen:{
    color:'white',
    marginLeft:20,
    marginTop:5,
  },
  closeButton:{
   
    width:70,
    height:35,
    bottom:35,
    marginLeft:130,
    borderRadius:15,
   
  },
  textClose:{
    color:'white',
    marginLeft:20,
    marginTop:5,
  }
});