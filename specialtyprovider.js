import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Speciality from './Speciality'; // Assuming this is your root component

const App = () => {
  return (
    <PaperProvider>
      <Speciality />
    </PaperProvider>
  );
};

export default App;
