import {Provider, useDispatch, useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import codePush from 'react-native-code-push';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/lib/integration/react';

import {store, persistedStore} from './src/redux/store';
import BottomTab from './src/routes/BottomTab';
import {Login, Register, DetailProduct, UbahAkun} from './src/screens';
import {Loading} from './src/components';
import {navigationRef} from './src/utils/helpers/navigate';
import {useMemo} from 'react';
import {
  getNotification,
  setBadgeNumber,
} from './src/screens/Notifikasi/redux/action';

const codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};

const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  console.log('state global: ', stateGlobal);
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  const {tokenValue} = useSelector(state => state.login);
  const {notification} = useSelector(state => state.notification);

  useMemo(() => {
    dispatch(setBadgeNumber(notification));
  }, [notification]);

  useMemo(() => {
    if (tokenValue) dispatch(getNotification(tokenValue));
  }, [navigationRef.getCurrentRoute().name]);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="BottomTab">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="UbahAkun" component={UbahAkun} />
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="DetailProduct" component={DetailProduct} />
        </Stack.Navigator>
      </NavigationContainer>
      {stateGlobal.Global.loading && <Loading />}
      <Toast />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

export default codePush(codePushOptions)(App);

const styles = StyleSheet.create({});
