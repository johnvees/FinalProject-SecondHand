import {Provider} from 'react-redux';
import store from './src/redux/store';
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import codePush from 'react-native-code-push';

import BottomTab from './src/routes/BottomTab';
import {Login, Register} from './src/screens';

const codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};

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
  );
};

export default codePush(codePushOptions)(App);

const styles = StyleSheet.create({});
