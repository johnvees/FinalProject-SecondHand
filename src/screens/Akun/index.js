import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {Button} from '../../components';

const Akun = ({navigation}) => {
  return (
    <View>
      <Text>Akun</Text>
      <Button
        type={'cta'}
        ctaText={'ubah akun'}
        onPress={() => navigation.navigate('UbahAkun')}
      />
    </View>
  );
};

export default Akun;

const styles = StyleSheet.create({});
