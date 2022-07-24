import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';

import NoImage from '../../assets/images/no_image.png';
import {Button, CardNotification, CardProduct, Gap} from '../../components';
import {BASE_URL, MyColors, MyFonts} from '../../utils';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {navigate} from '../../utils/helpers/navigate';
import axios from 'axios';

const DaftarJual = () => {
  const {tokenValue} = useSelector(state => state.login);
  const [btnProdukActive, setBtnProdukActive] = useState(true);
  const [btnDiminatiActive, setBtnDiminatiActive] = useState(false);
  const [btnTerjualActive, setBtnTerjualActive] = useState(false);
  const [type, setType] = useState('');
  const [photo, setPhoto] = useState(NoImage);
  const [userData, setUserData] = useState({
    fullname: '',
    city: '',
  });

  const getUser = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/auth/user`, {
        headers: {access_token: tokenValue},
      });

      setUserData({
        fullname: result.data.full_name,
        city: result.data.city,
      });

      console.log('user photo:', photo);

      if (result.data.image_url === null) {
        setPhoto(NoImage);
      } else {
        const setUserPhoto = {uri: result.data.image_url};
        setPhoto(setUserPhoto);
      }

      console.log('user photo:', photo);

      if (result.status === 200) {
        console.log('Get Data Akun success: ', result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSellerProduct = async () => {};

  const ProdukItem = item => {
    const AddProduct = () => {
      return (
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => navigate('Jual')}>
          <View style={styles.cardContentContainer}>
            <Feather
              name="plus"
              size={ms(24)}
              color={MyColors.Neutral.NEUTRAL03}
            />
            <Text style={styles.cardContentTitle}>Tambah Produk</Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View>
        <AddProduct />
        <CardProduct />
      </View>
    );
  };

  const DiminatiItem = item => {
    return (
      <View>
        <CardNotification />
        <View style={styles.divider}></View>
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Daftar Jual Saya</Text>

        <Gap height={ms(16)} />

        <View style={styles.profileBorder}>
          <View style={styles.profileContainer}>
            <Image source={photo} style={styles.profilePhoto} />
            <View style={{flex: 1, marginEnd: ms(16)}}>
              <Text
                style={styles.profileName}
                ellipsizeMode={'tail'}
                numberOfLines={1}>
                {userData.fullname}
              </Text>
              <Gap height={ms(4)} />
              <Text
                style={styles.profileCity}
                ellipsizeMode={'tail'}
                numberOfLines={1}>
                {userData.city}
              </Text>
            </View>
            <Button type={'edit'} onPress={() => navigate('UbahAkun')} />
          </View>
        </View>

        <Gap height={ms(24)} />

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

        <Gap height={ms(24)} />

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
  title: {
    fontFamily: MyFonts.Bold,
    fontSize: ms(20),
    color: MyColors.Neutral.NEUTRAL00,
  },
  profileBorder: {
    borderRadius: ms(16),
    backgroundColor: MyColors.Neutral.NEUTRAL01,
    maxHeight: ms(80),
    shadowColor: MyColors.Neutral.NEUTRAL00,
    elevation: ms(2),
    padding: ms(16),
    marginHorizontal: ms(1),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePhoto: {
    maxWidth: ms(48),
    maxHeight: ms(48),
    borderRadius: ms(12),
    resizeMode: 'contain',
    marginEnd: ms(16),
  },
  profileName: {
    fontFamily: MyFonts.Medium,
    fontSize: ms(14),
    color: MyColors.Neutral.NEUTRAL00,
  },
  profileCity: {
    fontFamily: MyFonts.Regular,
    fontSize: ms(10),
    color: MyColors.Neutral.NEUTRAL03,
  },
  cardContainer: {
    height: ms(80),
    borderRadius: ms(4),
    borderWidth: ms(1),
    borderColor: MyColors.Neutral.NEUTRAL02,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContentContainer: {
    alignItems: 'center',
  },
  divider: {
    height: ms(1),
    width: widthPercentageToDP(100),
    backgroundColor: MyColors.Neutral.NEUTRAL02,
    marginBottom: ms(16),
    marginTop: ms(6),
  },
});
