import {FlatList, StyleSheet, Text, View} from 'react-native';
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
          <View>
            <TextInput
              name="search"
              style={{
                backgroundColor: '#FFF',
                fontSize: ms(14),
                fontFamily: MyFonts.Regular,
                height: ms(48),
                width: ms(328),
                borderRadius: ms(16),
                marginTop: ms(38),
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
            <Text
              style={{
                fontFamily: MyFonts.Bold,
                fontSize: ms(20),
                width: ms(180),
                color: '#000',
                marginTop: ms(32),
              }}>
              Bulan Ramadhan Banyak diskon!
            </Text>
            <Text
              style={{
                fontFamily: MyFonts.Regular,
                fontSize: ms(10),
                color: '#000',
                marginTop: ms(16),
              }}>
              Diskon Hingga
            </Text>
            <Text
              style={{
                fontFamily: MyFonts.Regular,
                color: 'red',
                fontSize: ms(18),
                marginTop: ms(4),
              }}>
              60%
            </Text>
          </View>
          <Text
            style={{
              fontFamily: MyFonts.Regular,
              fontSize: ms(14),
              marginTop: ms(48),
              color: '#151515',
              marginBottom: ms(16),
            }}>
            Telusuri Kategori
          </Text>
          <FlatList
            data={['Semua', 'Hobi', 'Kendaraan']}
            horizontal={true}
            renderItem={({item}) => (
              <Button
                type="ctaFilter"
                filterText={item}
                style={{height: ms(44)}}
                iconName="search"
              />
            )}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
