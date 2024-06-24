import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Unsuccessful = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { errorMessage } = route.params || {}; // Safely access route parameters

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Unsuccessful</Text>
      <Text style={styles.message}>{errorMessage || 'An error occurred during the transaction. Please try again.'}</Text>
      <Button title="Retry" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Unsuccessful;
