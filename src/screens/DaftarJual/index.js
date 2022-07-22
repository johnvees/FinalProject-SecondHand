import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';

import NoImage from '../../assets/images/no_image.png';
import {Button, Gap} from '../../components';

const DaftarJual = () => {
  const [btnProdukActive, setBtnProdukActive] = useState(true);
  const [btnDiminatiActive, setBtnDiminatiActive] = useState(false);
  const [btnTerjualActive, setBtnTerjualActive] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Daftar Jual Saya</Text>

      <View style={styles.profileBorder}>
        <View style={styles.profileContainer}>
          <Image source={NoImage} style={styles.profilePhoto} />
          <Text style={styles.profileName}>Nama Penjual</Text>
          <Text style={styles.profileCity}>Kota</Text>
          <Button type={'edit'} />
        </View>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Button
          type={'ctaFilter'}
          iconName={'box'}
          filterText={'Produk'}
          active={btnProdukActive}
          onPress={() => {
            setBtnProdukActive(true);
            setBtnTerjualActive(false);
            setBtnDiminatiActive(false);
          }}
        />

        <Gap widht={ms(16)} />

        <Button
          type={'ctaFilter'}
          iconName={'heart'}
          filterText={'Diminati'}
          active={btnDiminatiActive}
          onPress={() => {
            setBtnProdukActive(false);
            setBtnTerjualActive(false);
            setBtnDiminatiActive(true);
          }}
        />

        <Gap widht={ms(16)} />

        <Button
          type={'ctaFilter'}
          iconName={'dollar-sign'}
          filterText={'Terjual'}
          active={btnTerjualActive}
          onPress={() => {
            setBtnProdukActive(false);
            setBtnTerjualActive(true);
            setBtnDiminatiActive(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DaftarJual;

const styles = StyleSheet.create({});
