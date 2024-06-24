import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';


import mobileNum from './mobileNum';
import AddPatient from './AddPatient';
import Speciality from './Speciality';
import form from './form';
import OtpPage from './OtpPage';
import BillPage from './BillPage';
import splash from './splash';
import WarningPage from './WarningPage';
import Successfull from './Successfull';
import Unsuccessful from './Unsuccessful';
import SelectTeam from './SelectTeam';
import Refund from './Refund';


const Stack = createStackNavigator();

const App = () => {


  return (
    <PaperProvider>
      <NavigationContainer >
        <Stack.Navigator>


          <Stack.Screen name="splash" component={splash} options={{ headerShown: false }} />
          <Stack.Screen name="mobileNum" component={mobileNum} options={{ headerShown: false }} />
          <Stack.Screen name="AddPatient" component={AddPatient} options={{ headerShown: false }} />
          <Stack.Screen name="OtpPage" component={OtpPage} options={{ headerShown: false }} />
          <Stack.Screen name="form" component={form} options={{ headerShown: false }} />
          <Stack.Screen name="Speciality" component={Speciality} options={{ headerShown: false }} />
          <Stack.Screen name="Refund" component={Refund} options={{ headerShown: false }} />

          <Stack.Screen name="SelectTeam" component={SelectTeam} options={{ headerShown: false }} />
          <Stack.Screen name="BillPage" component={BillPage} options={{ headerShown: false }} />
          <Stack.Screen name="WarningPage" component={WarningPage} options={{ headerShown: false }} />
          <Stack.Screen name="Successfull" component={Successfull} options={{ headerShown: false }} />
          <Stack.Screen name="Unsuccessful" component={Unsuccessful} options={{ headerShown: false }} />
         
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
