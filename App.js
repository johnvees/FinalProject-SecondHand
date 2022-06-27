import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Bot from './src/component/bottomSheet';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View>
      <Text>App</Text>
      <Bot />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
