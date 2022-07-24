import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import {ms} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {Home, Akun, DaftarJual, Jual, Notifikasi} from '../screens';
import {useMemo} from 'react';
import {navigationRef} from '../utils/helpers/navigate';
import {getNotification} from '../screens/Notifikasi/redux/action';
const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  const {badge} = useSelector(state => state.notification);
  const {tokenValue} = useSelector(state => state.login);
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      initialRouteName="DaftarJual"
      screenOptions={{headerShown: false, tabBarActiveTintColor: '#7126B5'}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: tabInfo => {
            return (
              <Feather
                name="home"
                size={ms(24)}
                color={tabInfo.focused ? '#7126B5' : '#8A8A8A'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Notifikasi"
        component={Notifikasi}
        options={
          badge
            ? {
                tabBarIcon: tabInfo => {
                  return (
                    <Feather
                      name="bell"
                      size={ms(24)}
                      color={tabInfo.focused ? '#7126B5' : '#8A8A8A'}
                    />
                  );
                },
                tabBarBadge: badge,
              }
            : {
                tabBarIcon: tabInfo => {
                  return (
                    <Feather
                      name="bell"
                      size={ms(24)}
                      color={tabInfo.focused ? '#7126B5' : '#8A8A8A'}
                    />
                  );
                },
              }
        }
      />
      <Tab.Screen
        name="Jual"
        component={Jual}
        options={{
          tabBarIcon: tabInfo => {
            return (
              <Feather
                name="plus-circle"
                size={ms(24)}
                color={tabInfo.focused ? '#7126B5' : '#8A8A8A'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="DaftarJual"
        component={DaftarJual}
        options={{
          tabBarIcon: tabInfo => {
            return (
              <Feather
                name="list"
                size={ms(24)}
                color={tabInfo.focused ? '#7126B5' : '#8A8A8A'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Akun"
        component={Akun}
        options={{
          tabBarIcon: tabInfo => {
            return (
              <Feather
                name="user"
                size={ms(24)}
                color={tabInfo.focused ? '#7126B5' : '#8A8A8A'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
