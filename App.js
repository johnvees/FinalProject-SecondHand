import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import BotSheet from './src/components/bottom-sheet';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View>
      <Text>App</Text>
      <BotSheet />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
