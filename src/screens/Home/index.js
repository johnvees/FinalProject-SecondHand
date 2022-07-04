import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TextInput from '../../components/TextInput';
import {MyColors} from '../../utils/colors/index';

import {MyFonts} from '../../utils';
import Button from '../../components/Button';
import {ms} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const Index = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.4}}
        colors={['#FFE9C9', '#FFF']}
        style={{
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(100),
        }}>
        <View style={{alignSelf: 'center'}}>
          <TextInput
            name="search"
            style={{
              backgroundColor: '#FFF',
              placeholderTextColor: '#000',
              fontSize: ms(14),
              fontFamily: MyFonts.Regular,
              height: ms(48),
              width: ms(328),
              borderRadius: ms(16),
            }}
            props={{placeholderTextColor: '#8A8A8A'}}
            placeholder="Cari di Second Chance"
            placeholderTextColor={MyColors.Neutral.NEUTRAL03}
            selectionColor={MyColors.Primary.DARKBLUE04}
            value={keyword}
            onChangeText={text => setKeyword(text)}
          />
        </View>
        <View>
          <Text style={{fontFamily: MyFonts.Bold, fontSize: ms(20)}}>
            Bulan Ramadhan Banyak diskon!
          </Text>
          <Text style={{fontFamily: MyFonts.Bold, fontSize: ms(10)}}>
            Diskon Hingga
          </Text>
          <Text
            style={{
              fontFamily: MyFonts.Regular,
              color: 'red',
              fontSize: ms(18),
            }}>
            60%
          </Text>
        </View>
        <Text style={{fontStyles: MyFonts.Regular, fontSize: ms(14)}}>
          Telusuri Kategori
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button type="ctaFilter" filterText={'Semua'} />
          <Button type="ctaFilter" filterText={'Hobi'} />
          <Button type="ctaFilter" filterText={'Kendaraan'} />
        </View>
      </LinearGradient>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
