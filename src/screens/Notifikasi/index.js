import {StyleSheet, Text, FlatList, View, Image} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {BASE_URL, MyColors, MyFonts} from '../../utils';
import Feather from 'react-native-vector-icons/Feather';
import {ms} from 'react-native-size-matters';
import {Button} from '../../components';
import {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import {useMemo} from 'react';
import CardNotification from '../../components/CardNotification';

const Notifikasi = ({navigation}) => {
  const [user, setUser] = useState({});
  const [notification, setNotification] = useState({});
  const postLogin = async values => {
    try {
      const body = {
        email: 'cemilick@gmail.com',
        password: 'Qwqwqw.123',
      };

      axios.post(`${BASE_URL}/auth/login`, body).then(response => {
        setUser(response.data);
        console.log(user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const notLogin = (
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
          marginBottom: ms(16),
        }}>
        Silahkan Login atau Buat Akun Terlebih Dahulu
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button ctaText={'Login'} type="cta" onPress={() => postLogin()} />
        <Text
          style={{
            fontFamily: MyFonts.Regular,
            color: MyColors.Neutral.NEUTRAL03,
            marginHorizontal: ms(16),
          }}>
          Atau
        </Text>
        <Button
          ctaText={'Buat Akun'}
          type="cta"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );

  const getNotification = () => {
    axios.post(`${BASE_URL}/notification`, body).then(response => {
      console.log(response);
    });
  };

  useMemo(() => {
    setNotification([
      {
        id: 1,
        product_id: 98,
        product_name: 'Kursus Laravel',
        bid_price: 300000,
        transaction_date: '2000-01-01T00:00:00.000Z',
        status: 'bid',
        seller_name: 'tegar',
        buyer_name: 'michael',
        receiver_id: 1,
        image_url:
          'https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1655481259190-Belajar laravel.PNG?alt=media',
        read: false,
        created_at: '2000-01-01T00:00:00.000Z',
        updated_at: '2000-01-01T00:00:00.000Z',
        Product: {
          id: 1,
          name: 'Kursus Laravel',
          base_price: 500000,
          image_url:
            'https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media',
          image_name: 'PR-1654962957757-sepatu.jpg',
          location: 'Jakarta',
          user_id: 124,
          status: 'available',
        },
      },
    ]);
  }, [user]);

  return user.access_token ? (
    <View>
      <Image
        source={{uri: notification[0].image_url}}
        style={{width: ms(100), height: ms(100)}}
        resizeMode="contain"
      />
      <FlatList
        data={notification}
        renderItem={({item}) => {
          return (
            <CardNotification
              source={item.image_url}
              productName={item.product_name}
              price={item.base_price}
              type={item.status}
              penawaran={item.bid_price}
              read={item.read}
              timestamp={item.created_at}
            />
          );
        }}
      />
    </View>
  ) : (
    notLogin
  );
};

export default Notifikasi;

const styles = StyleSheet.create({});
