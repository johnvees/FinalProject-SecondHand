import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import TouchID from 'react-native-touch-id';
import {ms} from 'react-native-size-matters';

const Biometric = ({onPress, navigation}) => {
  const optionalConfigObject = {
    title: 'Authentication Required',
    color: '#eb0707',
  };

  const pressHandler = () => {
    TouchID.authenticate(
      'to demo this react-native component',
      optionalConfigObject,
    )
      .then(success => {
        console.log(success);
        alert('Authenticated Successfully');
      })
      .catch(error => {
        console.log(error);
        alert('Authentication Failed');
      });
  };

  const clickHandler = () => {
    TouchID.isSupported()
      .then(biometryType => {
        if (biometryType === 'FaceID') {
          alert('FaceID Supported');
        } else if (biometryType === 'TouchID') {
          alert('TouchID Supported');
        } else if (biometryType === true) {
          alert('Supported TouchID for Android');
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.textTittle}>Authentication With Touch ID</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clickHandler()} style={styles.button}>
        <Text style={styles.textTittle}>Check is Support for Biometrics</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Biometric;

const styles = StyleSheet.create({
  container: {
    top: ms(20),
    position: 'absolute',
  },
  button: {
    paddingHorizontal: ms(24),
    paddingVertical: ms(14),
    backgroundColor: '#E2D4F0',
    width: ms(250),
    borderRadius: ms(16),
    alignItems: 'center',
  },
  textTittle: {
    color: 'black',
    fontWeight: '400',
  },
});
