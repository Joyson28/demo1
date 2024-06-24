import React, { useEffect, useRef } from "react";
import { Image, View, StyleSheet, Text, StatusBar, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const logoImg = require("./assets/kmc1.jpg");

export default function Splash() {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation(); // Access the navigation object

  useEffect(() => {
    const bounceInAnimation = Animated.timing(bounceAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bounce, // Use the bounce easing function
      useNativeDriver: true,
    });

    const bounceOutAnimation = Animated.timing(bounceAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.bounce, // Use the bounce easing function
      useNativeDriver: true,
    });

    // Run the bounce-in animation initially
    bounceInAnimation.start();

    // After 2 seconds, run the bounce-out animation and navigate to mobileNum screen
    setTimeout(() => {
      bounceOutAnimation.start(() => {
        navigation.navigate('mobileNum');
      });
    }, 3000);
  }, [bounceAnim, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <Animated.Image
        source={logoImg}
        style={[
          styles.image,
          {
            transform: [
              {
                scale: bounceAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.2], // Adjust the scale factor as needed
                }),
              },
            ],
          },
        ]}
      />
      <Text style={styles.KH}>Kasturba Hospital</Text>
      <Text style={styles.quote}>
        KMC's top Doctors to guide you to{'\n'}
        <Text style={{ textAlign: 'center' }}>better health everyday</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 240,
    height: 240,
  },
  KH: {
    color: "#7E6051",
    fontSize: 48,
    marginTop: 20,
    fontWeight: "500",
  },
  quote: {
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "400",
    color: "black",
  },
});
