import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {MyColors, MyFonts} from '../../utils';
import {ms} from 'react-native-size-matters';

const Loading = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={MyColors.Neutral.NEUTRAL01} />
      <Text style={styles.text}>Your Data Being Send...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPercentageToDP('100%'),
    width: widthPercentageToDP('100'),
    backgroundColor: MyColors.Neutral.NEUTRAL000,
  },
  text: {
    fontFamily: MyFonts.Regular,
    fontSize: ms(20),
    color: MyColors.Neutral.NEUTRAL01,
    marginTop: ms(16),
  },
});
