import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Menu } from 'react-native-paper';

// Set StatusBar color
StatusBar.setBackgroundColor('#CACBF1');

const SpecialityScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false); // State to manage menu visibility

  // Data for FlatList
  const data = [
    { id: '1', name: 'Speciality 1' },
    { id: '2', name: 'Speciality 2' },
    { id: '3', name: 'Speciality 3' },
    { id: '4', name: 'Speciality 4' },
    { id: '5', name: 'Speciality 5' },
    { id: '6', name: 'Speciality 6' },
    { id: '7', name: 'Speciality 7' },
    { id: '8', name: 'Speciality 8' },
    { id: '9', name: 'Speciality 9' },
    { id: '10', name: 'Speciality 10' },
    { id: '11', name: 'Speciality 11' },
    { id: '12', name: 'Speciality 12' },
    { id: '13', name: 'Speciality 13' },
    { id: '14', name: 'Speciality 14' },
    { id: '15', name: 'Speciality 15' },
  ];

  // Render each item in FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)} style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Function to handle menu press
  const handleMenuPress = () => {
    setMenuVisible(!menuVisible); // Toggle menu visibility
  };

  // Function to handle item click
  const handleItemClick = (item) => {
    // Perform action when item is clicked, such as navigation or showing details
    console.log(`Clicked on ${item.name}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topnavigation}>
        <Image
          source={require('./assets/backButton.png')}
          style={[styles.backButton, { marginTop: 5 }]}
        />
        <TouchableOpacity onPress={handleMenuPress}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={<Image source={require('./assets/menu.png')} style={[styles.menu, { marginTop: 5 }]} />}
          >
            <Menu.Item onPress={() => {}} title="Refund Policy" />
            <Menu.Item onPress={() => {}} title="Download Policy" />
            <Menu.Item onPress={() => {}} title="Logout" />
          </Menu>
        </TouchableOpacity>
      </View>

      <View style={styles.pageHead}>
        <Text style={styles.HeaderText}>Find doctors by{'\n'} Speciality</Text>
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
          {/* Add FlatList component */}
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContent}
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
    fontSize: 30,
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
  flatListContent: {
    flexGrow: 1,
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
  }

});

export default SpecialityScreen;
