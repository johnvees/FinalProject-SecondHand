
import Input from './src/components/TextInput'
import Gap from './src/components/Gap'
import { ms } from 'react-native-size-matters'

import { Provider } from 'react-redux'
import store from './src/redux/store'

import { ms } from 'react-native-size-matters'
import { MyFonts } from './src/utils/fonts'

import { MyColors } from './src/Assets/Colors'
import { ms } from 'react-native-size-matters'
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './src/routes/BottomTab';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import {NavigationContainer} from '@react-navigation/native';


const App = () => {
  const Stack = createStackNavigator();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

    

export default App;

const styles = StyleSheet.create({});
