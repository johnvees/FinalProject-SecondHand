import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Biometric from './src/component/bio-auth';

const App = () => {
  return (
    <View>
      <Text>App</Text>
      <Biometric />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
