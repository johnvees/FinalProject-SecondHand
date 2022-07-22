import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';

import NoImage from '../../assets/images/no_image.png';
import {Button, Gap} from '../../components';
import {MyColors} from '../../utils';

const DaftarJual = () => {
  const [btnProdukActive, setBtnProdukActive] = useState(true);
  const [btnDiminatiActive, setBtnDiminatiActive] = useState(false);
  const [btnTerjualActive, setBtnTerjualActive] = useState(false);
  const [type, setType] = useState('');

  const ProdukItem = item => {
    return (
      <View>
        <Text>produkItem</Text>
      </View>
    );
  };

  const DiminatiItem = item => {
    return (
      <View>
        <Text>diminati</Text>
      </View>
    );
  };

  const TerjualItem = item => {
    return (
      <View>
        <Text>terjual</Text>
      </View>
    );
  };

  const viewRenderItem = () => {
    if (type === 'produk') {
      return <ProdukItem />;
    } else if (type === 'diminati') {
      return <DiminatiItem />;
    } else if (type === 'terjual') {
      return <TerjualItem />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              setType('produk');
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
              setType('diminati');
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
              setType('terjual');
              console.log(type);
              setBtnProdukActive(false);
              setBtnTerjualActive(true);
              setBtnDiminatiActive(false);
            }}
          />
        </ScrollView>

        <FlatList
          data={type}
          key={type}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={viewRenderItem}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DaftarJual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(16),
    backgroundColor: MyColors.Neutral.NEUTRAL01,
  },
});
