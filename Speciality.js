import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// Set StatusBar color
StatusBar.setBackgroundColor('#CACBF1');

const SpecialityScreen = ({ route }) => {
  
  const { patientId, patientName,medicareNumber,mobileNumber} = route.params;
  //console.log('Patient id', patientId)
  const [menuVisible, setMenuVisible] = useState(false); // State to manage menu visibility
  const [specialtyData, setSpecialtyData] = useState([]); // State to store fetched specialty data
  const [data, setData] = useState([]); // State to store fetched data
  const navigation = useNavigation();

  // Fetch specialty data from the server
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetch("http://10.0.2.2:8080/specialties"); // Update the server URL
        const data = await response.json();
      //  console.log(data);

        // Check if data is in the expected format
        if (Array.isArray(data)) {
          const filteredSpecialties = data.filter(specialty => !specialty.dd_value.startsWith("KHSB")); // Filter out specialties starting with "KHSB"
          const specialtyValues = filteredSpecialties.map(specialty => specialty.dd_value); // Extract dd_value from each specialty object
          setSpecialtyData(specialtyValues);
          setData(data); // Store fetched data in state

          // Log all dd_value values after filtering
          console.log("Specialty Data Values:", specialtyValues);
        } else {
          console.error("Error: Data is not in the expected format");
        }
      } catch (error) {
        console.error('Error fetching specialty data:', error);
      }
    };
    fetchSpecialties();
  }, []);

  // Function to handle menu press
  const handleMenuPress = () => {
    setMenuVisible(!menuVisible); // Toggle menu visibility
  };

  // Function to handle item click
  const handleItemClick = (selectedItem) => {
    if (selectedItem) {
      console.log("Selected Value:", selectedItem);
      const selectedSpecialtyData = data.filter(specialty => specialty.dd_value === selectedItem);
      console.log("Selected Specialty Data:", selectedSpecialtyData);
      navigation.navigate('SelectTeam', { patientId: patientId, patientName:patientName,medicareNumber:medicareNumber,selectedSpecialtyData: selectedSpecialtyData, formattedDate: formattedDate , selectedSpecialtyName: selectedItem,mobileNumber});    } else {
      console.error("Error: Specialty data is incomplete");
      console.log("medicare number: ",medicareNumber);
    }
  };
 


  // Render item for FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)} style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  const BackButton = () => {
    navigation.goBack();
  };

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // JavaScript months are 0-based, so January is 0
  const year = today.getFullYear();
  const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;

  return (
    <View style={styles.container}>
      <View style={styles.topnavigation}>
        <TouchableOpacity onPress={BackButton}>
          <Image
            source={require('./assets/backButton.png')}
            style={[styles.backButton, { marginTop: 5 }]}
          />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>Select Speciality</Text>
        <TouchableOpacity onPress={handleMenuPress}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={<Image source={require('./assets/menu.png')} style={[styles.menu, { marginTop: 5 }]} />}
          >
            <Menu.Item onPress={() => { navigation.navigate('Refund') }} title="Refund Policy" />
            <Menu.Item onPress={() => { }} title="Download Policy" />
            <Menu.Item onPress={() => { }} title="Logout" />
          </Menu>
        </TouchableOpacity>
      </View>
      <View style={styles.pageHead}>
        <View style={styles.dateView}>
          <Text style={styles.dateText1}>Date:</Text>
          <Text style={styles.dateText2}> {formattedDate}</Text>
        </View>
        <Image
          source={require('./assets/specialityDoctor.png')}
          style={styles.Headimage}
        />
      </View>
      <View style={styles.ListBox}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.searchText}
            placeholder="      Search"
            placeholderTextColor="black"
          />
          <Image
            source={require('./assets/searchVector.png')}
            style={styles.searchimage}
          />
        </View>
        <View style={styles.FlatlistCont}>
          <FlatList
            data={specialtyData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()} // Use index as the key for each item
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CACBF1',
  },
  topnavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    alignItems: 'center',
  },
  pageHead: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  HeaderText: {
    fontFamily: 'GothicA1-Regular',
    fontSize: 25,
  },
  Headimage: {
    marginLeft: 30,
  },
  ListBox: {
    marginTop: 50,
    borderRadius: 20,
    marginLeft: 55,
    width: 300,
    height: 500,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'black',
  },
  searchText: {
    flex: 1,
    height: 60,
    padding: 10,
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
  },
  searchimage: {
    width: 30,
    height: 30,
  },
  FlatlistCont: {
    marginTop: 10,
    flex: 1,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  itemText: {
    fontSize: 18,
    color: 'black', // Change font color to black
  },
  dateText1: {
    fontFamily: 'GothicA1-Regular',
    fontSize: 22,
    fontWeight: 'bold'
  },
  dateText2: {
    fontFamily: 'GothicA1-Regular',
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingTop: 2,
    borderRadius: 5,
    width: 150,
    height: 37,
    marginLeft: 5
  },
  dateView: {
    flexDirection: 'row',
    marginTop: 50
  }
});

export default SpecialityScreen;
