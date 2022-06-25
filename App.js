import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react'
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import BottomTab from './src/routes/BottomTab';
import { Login, Register } from './src/screens';

const App = () => {
  const Stack = createStackNavigator();
  
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
