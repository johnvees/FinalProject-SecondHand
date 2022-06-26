import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NumberFormat} from './index';

const Index = () => {
  return (
    <View>
      <Text>
        <NumberFormat number={500000} />
      </Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
