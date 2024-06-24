
//Select team
 
import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, ActivityIndicator, Image, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 
StatusBar.setBackgroundColor('#CACBF1');
 
const OPD = ({ route }) => {
    const {  patientId, patientName, mobileNumber} = route.params;
  const { selectedSpecialtyData, formattedDate, selectedSpecialtyName,medicareNumber } = route.params;
 
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [teams, setTeams] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [selectedTeamDoctors, setSelectedTeamDoctors] = useState([]);
  const [doctorDropdownVisible, setDoctorDropdownVisible] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 
  const [doctorDropdownItems, setDoctorDropdownItems] = useState([]);
  const navigation = useNavigation();
  const [opdType, setOpdType] = useState("");
  const [teamId, setTeamId] = useState("");
  const [allFieldsSelected, setAllFieldsSelected] = useState(false);
 
  useEffect(() => {
    fetchDropdownItems(selectedSpecialtyData[0].dd_index);
  }, [selectedSpecialtyData]);
 
  const fetchDropdownItems = (specialtyId) => {
    const apiLink = `http://172.16.7.192:8080/medicsValidation/extapi/api/getTeamsBySpeciality?entityRID=4&SpecialityID=${specialtyId}&Date=${formattedDate}`;
console.log('apiLink:  ',apiLink);
    fetch(apiLink)
      .then(response => response.json())
      .then(data => {
        if (data.STATUS === 200) {
          setTeams(data.data);
          setDropdownItems(data.data.map(team => team.Team));
        } else {
          console.error("Failed to fetch teams:", data);
        }
      })
      .catch(error => {
        console.error("Error fetching teams:", error);
      });
  };
 
  useEffect(() => {
    checkFieldsSelected();
  }, [selectedTeam, selectedDoctor]);
 
  const checkFieldsSelected = () => {
    if (selectedTeam && selectedDoctor) {
      setAllFieldsSelected(true);
    } else {
      setAllFieldsSelected(false);
    }
  };
 
  const fetchDoctorsForTeam = async (teamName) => {
    try {
      const response = await fetch('http://10.0.2.2:8080/doctors');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      let doctorsForTeam = data.filter(doctor => doctor.st_name === teamName && doctor.st_entity_rid === 4);
      if (teams.find(team => team.Team === teamName && team.OPD === 'Y')) {
        doctorsForTeam = doctorsForTeam.filter(doctor => doctor.st_team_head === 'Y');
      }
      setSelectedTeamDoctors(doctorsForTeam);
      setDoctorDropdownItems(doctorsForTeam.map(doctor => ({ name: doctor.staff_name, id: doctor.staff_rid })));
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };
 
  const handleTeamSelection = (teamName) => {
    const selectedTeam = teams.find(team => team.Team === teamName);
    if (selectedTeam) {
      setSelectedTeam(selectedTeam);
      setDropdownVisible(false);
      setOpdType(selectedTeam.OPD);
      setTeamId(selectedTeam.TeamCode);
      fetchDoctorsForTeam(teamName);
      setSelectedDoctor("");
    } else {
      console.error("Selected team not found in the teams data.");
    }
  };
 
  const setSelectedDoctorData = (doctor) => {
    setSelectedDoctor(doctor.name);
    setSelectedDoctorId(doctor.id);
  };
 
  const handleDoctorSelection = (doctor) => {
    setSelectedDoctorData(doctor);
    setDoctorDropdownVisible(false);
    fetchDoctorLeaveData();
  };
 
  const fetchDoctorLeaveData = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/doctor_leave?entity_rid=4`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching doctor leave data:', error);
      return null;
    }
  };
 
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
 
    while (currentDate <= endDate) {
      // Format the date as "yyyy-mm-dd"
      const yyyy = currentDate.getFullYear();
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
      const dd = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${yyyy}-${mm}-${dd}`;
    //   console.log(`Formatted Date: ${formattedDate}`);
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
 
    return dates;
};

const handleConfirm = async () => {
  try {
      setIsLoading(true); // Show loader
     
      setSelectedDoctorData({ name: selectedDoctor, id: selectedDoctorId });
     console.log("Selected Doctor:", selectedDoctor);
     console.log("Selected Doctor ID:", selectedDoctorId);
  //  console.log("Formatted Date:", formattedDate);
 
      const leaveData = await fetchDoctorLeaveData();
 
      if (!leaveData) {
          console.error('No doctor leave data available.');
          return;
      }
 
      // Format leave dates as "yyyy-mm-dd"
      leaveData.forEach(entry => {
          entry.dateRange = getDatesInRange(new Date(entry.leave_fromdate), new Date(entry.leave_todate));
        });
 
     // console.log("Leave Data:", leaveData);
 
     // Convert formattedDate to "yyyy-mm-dd" format
     const [day, month, year] = formattedDate.split('-');
      const formattedDateToCompare = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
 
 
      const isDoctorOnLeave = leaveData.some(entry => {
          // Debugging logs to check values
          // console.log(`Comparing: ${entry.doccode} === ${selectedDoctorId}`);
        // console.log(`Date to Compare: ${formattedDateToCompare}`);
       //  console.log(`Entry Date Range: ${entry.dateRange}`);
 
          return entry.doctor_rid === selectedDoctorId &&
                 entry.dateRange.includes(formattedDateToCompare);
      });
 
      console.log("isDoctorOnLeave", isDoctorOnLeave);
      if (isDoctorOnLeave) {
          console.log("Selected doctor is on leave! Please select a different doctor.");
          alert("Selected doctor is on leave! Please select a different doctor.");
 
          return;
      }
 
 
        const teamData = {
                OPD: selectedTeam.OPD,
                Specialityid: selectedSpecialtyData[0].dd_index,
                Team: selectedTeam.Team,
                TeamCode: selectedTeam.TeamCode,
                DefaultLocationID: selectedTeam.DefaultLocationID
              };
             
        navigation.navigate('BillPage', {
            patientId,
            patientName,
            medicareNumber,
            selectedSpecialtyName,
            teamData: teamData,
            doctorName: selectedDoctor,
            doctorId: selectedDoctorId,
            date: formattedDate,mobileNumber
        });
 
            } catch (error) {
              console.error('Error confirming selection:', error);
            } finally {
              setIsLoading(false);
            }
          };
  return (
    <View style={styles.container}>
      <View style={styles.headView}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image source={require('./assets/backButton.png')} style={{ width: 52, height: 38 }} />
        </TouchableOpacity>
        <View style={{ marginRight: 85 }}>
          <Text style={{ fontFamily: 'GothicA1-Regular', fontSize: 25, color: "black" }}>Select Doctor</Text>
        </View>
      </View>
      <View style={{ marginHorizontal: 40, alignItems: "center" }}>
        <Text style={{ fontSize: 30, color: 'black', fontWeight: "bold" }}>{selectedSpecialtyName}</Text>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.dropdownContainer}>
          <View style={styles.select}>
            <Text style={styles.dropdownLabel}>Select Department:</Text>
            <TouchableOpacity style={styles.dropdownButton} onPress={() => setDropdownVisible(!dropdownVisible)}>
              <Text style={styles.dropdownButtonText}>{selectedTeam.Team || "Select"}</Text>
            </TouchableOpacity>
            {dropdownVisible && (
              <View style={styles.dropdownMenu}>
                {teams.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.dropdownMenuItem} onPress={() => handleTeamSelection(item.Team)}>
                    <Text>{item.Team}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={styles.dropdownContainer}>
          <View style={styles.select}>
            <Text style={styles.dropdownLabel}>Select Doctor:</Text>
            <TouchableOpacity
              style={[styles.dropdownButton, { width: selectedDoctor.length > 10 ? 200 : 'auto' }]}
              onPress={() => setDoctorDropdownVisible(!doctorDropdownVisible)}
            >
              <Text style={styles.dropdownButtonText}>{selectedDoctor || "Select"}</Text>
            </TouchableOpacity>
            {doctorDropdownVisible && (
              <View style={styles.dropdownMenu}>
                {doctorDropdownItems.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.dropdownMenuItem} onPress={() => handleDoctorSelection(item)}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={styles.Headimage}>
        <Image
          source={require('./assets/specialityDoctor.png')}
          style={{ width: 200, height: 200, }}
        /></View>
      <View style={styles.confirmButtonContainer}>
        <TouchableOpacity
          style={[styles.confirmButton, allFieldsSelected ? {} : styles.disabledConfirmButton]}
          onPress={handleConfirm}
          disabled={!allFieldsSelected || isLoading}
        >
          {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.confirmButtonText}>Confirm</Text>}
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};
 

 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#CACBF1",
    },
    headView: {
      padding: 16,
      flexDirection: 'row',
      height: 100,
      justifyContent: 'space-between',
    },
    validationMessage: {
      marginTop: 5,
      color: 'red',
      fontSize: 14,
      textAlign: 'center',
    },
    dropdownContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 50,
    },
    dropdownLabel: {
      marginRight: 10,
      fontSize: 22,
      color:'black'
 
    },
    dropdownButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: 'white',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'black',
    },
    dropdownButtonText: {
      fontSize: 19,
      color:'black'
    },
    dropdownMenu: {
      position: 'absolute',
      top: 40,
      left: 0,
      right: 0,
      width: "40%",
      marginLeft: 200,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      zIndex: 1,
    },
    dropdownMenuItem: {
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    modalContainer: {
      marginTop: 250,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      width: 390,
      height: 200,
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 9 },
      shadowRadius: 4,
      elevation: 5,
    },
    closeButtonText: {
      marginTop: 10,
      color: 'blue',
    },
    confirmButton: {
      backgroundColor: "#5154B0",
      paddingVertical: 12,
      paddingHorizontal: 100,
      borderRadius: 8,
      alignSelf: 'center',
      marginTop:70,
    },
    confirmButtonText: {
      color: 'white',
      fontSize: 22,
 
      fontWeight: 'bold',
    },
    select: {
      width: "100%",
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginLeft: 30,
    },
    subContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      height: 630,
      marginTop: 20,
      marginStart: 15,
      marginEnd: 13,
      borderRadius: 30,
      shadowColor: '#000',
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 9 },
      shadowRadius: 4,
    },
   
    disabledConfirmButton: {
            backgroundColor: '#cccccc',
          },
 
          Headimage:{
                    alignItems:"center",
                    marginTop:50,
                    opacity: 0.8
                   
                  }
  });
 
 
export default OPD;