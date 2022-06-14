import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Akun from '../screens/Akun';
import DaftarJual from '../screens/DaftarJual';
import Jual from '../screens/Jual';
import Notifikasi from '../screens/Notifikasi';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Akun" component={Akun} />
      <Tab.Screen name="DaftarJual" component={DaftarJual} />
      <Tab.Screen name="Jual" component={Jual} />
      <Tab.Screen name="Notifikasi" component={Notifikasi} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
