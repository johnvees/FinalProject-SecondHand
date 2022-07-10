import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {MyColors, MyFonts} from '../../utils';
import Feather from 'react-native-vector-icons/Feather';
import {ms} from 'react-native-size-matters';
import {Button} from '../../components';

const Notifikasi = () => {
  return (
    <View
      style={{
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Feather name="bell" size={ms(70)} color={MyColors.Neutral.NEUTRAL03} />
      <Text
        style={{
          fontFamily: MyFonts.Regular,
          color: MyColors.Neutral.NEUTRAL03,
          fontSize: ms(16),
          marginTop: ms(30),
        }}>
        Silahkan Login atau Buat Akun Terlebih Dahulu
      </Text>
      <View>
        <Button ctaText={'hei'} type="cta" onPress={() => {}} />
      </View>
    </View>
  );
};

export default Notifikasi;

const styles = StyleSheet.create({});
