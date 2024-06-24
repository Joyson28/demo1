import { StyleSheet, Text, View, TouchableOpacity, Image, Platform ,BackHandler} from 'react-native';
import React from 'react';

export default function WarningPage() {
  const handleCloseButton = () => {
    // Close the app
    if (Platform.OS === 'ios') {
      // For iOS, use Linking API to open app settings
      Linking.openSettings();
    } else if (Platform.OS === 'android') {
      // For Android, use BackHandler API to exit the app
      BackHandler.exitApp();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image source={require('./assets/warning.png')} style={{ width: 150, height: 150 }} />

        <View style={styles.textview}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Warning!</Text>
          <Text style={{ fontSize: 18, color: 'black', marginTop: 20 }}>
            Appointment booking hours are between 8:00 AM and 4:30 PM.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCloseButton}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(29, 36, 211, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  main: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: 300,
    height: 500,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowRadius: 4,
    elevation: 5,
  },

  textview: {
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
    textAlign: 'center',
    color: '#5154B0',
    fontSize: 22,
    fontWeight: '400',
  },
});
