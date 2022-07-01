import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TextInput from '../../components/TextInput';
import {MyColors} from '../../utils/colors/index';

import {MyFonts} from '../../utils';
import Button from '../../components/Button';
import {ms} from 'react-native-size-matters';

const Index = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <View>
      <View>
        <TextInput
          name="search"
          style={styles.textInput}
          placeholder="Cari di Second Chance"
          placeholderTextColor={MyColors.Neutral.NEUTRAL03}
          selectionColor={MyColors.Primary.DARKBLUE04}
          value={keyword}
        />
      </View>
      <View>
        <Text style={{fontStyles: MyFonts.Regular, fontSize: ms(20)}}>
          Bulan Ramadhan Banyak diskon!
        </Text>
        <Text style={{fontStyles: MyFonts.Regular, fontSize: ms(10)}}>
          Diskon Hingga
        </Text>
        <Text
          style={{fontStyles: MyFonts.Regular, color: 'red', fontSize: ms(18)}}>
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
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
