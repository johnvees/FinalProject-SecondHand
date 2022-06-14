import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
