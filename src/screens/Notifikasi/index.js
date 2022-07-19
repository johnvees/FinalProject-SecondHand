import {StyleSheet, Text, FlatList, View, Image} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {BASE_URL, MyColors, MyFonts, TEST_TOKEN} from '../../utils';
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

  const readNotification = id => {
    axios.defaults.headers.common['access_token'] = TEST_TOKEN;

    axios
      .patch(`${BASE_URL}/notification/${id}`)
      .then(response => {
        console.log(response);
        getNotification();
      })
      .catch(err => console.log(err));
  };

  const getNotification = () => {
    axios.defaults.headers.common['access_token'] = TEST_TOKEN;

    axios
      .get(`${BASE_URL}/notification?notification_type=seller`)
      .then(response => {
        console.log(response);
        setNotification(response.data);
      })
      .catch(err => console.log(err));
  };

  useMemo(() => {
    getNotification();
  }, [user]);

  return notification[0] ? (
    <View
      style={{
        backgroundColor: '#FFF',
        padding: ms(16),
      }}>
      <Text
        style={{
          fontFamily: MyFonts.Bold,
          fontSize: ms(20),
          color: MyColors.Neutral.NEUTRAL00,
          marginBottom: ms(24),
        }}>
        Notifikasi
      </Text>
      <FlatList
        data={notification}
        renderItem={({item}) => {
          return (
            <View>
              <CardNotification
                source={item.image_url}
                productName={item.product_name}
                price={item.base_price}
                type={item.status}
                penawaran={item.bid_price}
                read={item.read}
                timestamp={item.createdAt}
                onPress={() => readNotification(item.id)}
              />
              <View
                style={{
                  height: ms(1),
                  width: widthPercentageToDP(100),
                  backgroundColor: MyColors.Neutral.NEUTRAL02,
                  marginBottom: ms(16),
                  marginTop: ms(6),
                }}></View>
            </View>
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
