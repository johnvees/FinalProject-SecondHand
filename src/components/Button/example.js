import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '../index';
import {ms} from 'react-native-size-matters';

const Example = () => {
  return (
    <View>
      <Text>Button Icon Only</Text>
      <Button
        type={'iconOnly'}
        iconName={'arrow-left'}
        iconColor={'#000000'}
        iconSize={ms(24)}
      />
      <Text>Button Filter</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button
          type={'ctaFilter'}
          iconName={'search'}
          active
          filterText={'Semua'}
        />
        <Button type={'ctaFilter'} iconName={'search'} filterText={'Hobi'} />
        <Button
          type={'ctaFilter'}
          iconName={'search'}
          filterText={'Kendaraan'}
        />
        <Button type={'ctaFilter'} iconName={'heart'} filterText={'Diminati'} />
      </View>
      <Text>Button CTA</Text>
      <Button type={'cta'} ctaText={'Login'} />
      <Text>Button CTA With Icon</Text>
      <Button type={'ctaWithIcon'} ctaText={'Hubungi via Whatsapp'} />
      <Text>Button CTA Disabled</Text>
      <Button
        disabled
        type={'ctaDisabled'}
        ctaText={'Menunggu Respon Penjual'}
      />
      <Text>Button Half</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button outline type={'ctaHalf'} ctaText={'Preview'} />
        <Button type={'ctaHalf'} ctaText={'Terbitkan'} />
      </View>
      <Text>Button Half Circular</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button outline type={'ctaHalfCircular'} ctaText={'Tolak'} />
        <Button type={'ctaHalfCircular'} ctaText={'Terima'} />
      </View>
      <Text>Button Half Circular With Icon</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button outline type={'ctaHalfCircular'} ctaText={'Status'} />
        <Button type={'ctaHalfCircularWithIcon'} ctaText={'Hubungi'} />
      </View>
      <Text>Button Edit</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button type={'edit'} />
      </View>
      <Text>Button Ghost</Text>
      <View style={{alignItems: 'center'}}>
        <Button
          type={'ghost'}
          ghostPrimaryText={'Belum punya akun? '}
          ghostSecondaryText={'Daftar di sini'}
        />
      </View>
    </View>
  );
};

export default Example;

const styles = StyleSheet.create({});
