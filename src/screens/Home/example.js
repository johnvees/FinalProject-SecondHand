import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StatusBar} from '../../components';
import {MyColors} from '../../utils';

const Home = () => {
  return (
    <View>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={MyColors.Neutral.NEUTRAL01}
      />
      <Text>HomePage</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
