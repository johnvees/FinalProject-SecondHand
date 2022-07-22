import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '../../components';
import {BASE_URL, MyColors, MyFonts} from '../../utils';
import {ms} from 'react-native-size-matters';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useEffect} from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setLoading} from '../../redux/globalAction';
import CardNotification from '../../components/CardNotification';

const Index = ({navigation, route}) => {
  const [product, setProduct] = useState();
  const id = route.params.id;
  const dispatch = useDispatch();
  const {tokenValue} = useSelector(state => state.login);

  useEffect(() => {
    try {
      dispatch(setLoading(true));
      axios.defaults.headers.common['access_token'] = tokenValue;
      axios.get(BASE_URL + '/seller/order/' + id).then(Response => {
        setProduct(Response.data);
        dispatch(setLoading(false));
      });
    } catch (err) {
      dispatch(setLoading(false));
      console.log(err);
    }
  }, []);

  return (
    <View
      style={{
        backgroundColor: MyColors.Neutral.NEUTRAL01,
        height: heightPercentageToDP(100),
        width: widthPercentageToDP(100),
        paddingHorizontal: ms(16),
      }}>
      <Button
        type="iconOnly"
        onPress={() => navigation.goBack()}
        iconSize={ms(24)}
        iconColor="black"
        iconName="arrow-left"
        style={styles.backButton}
      />
      <View
        style={{
          paddingVertical: ms(16),
          paddingHorizontal: ms(56),
        }}>
        <Text
          style={{
            fontFamily: MyFonts.Regular,
            fontSize: ms(14),
            textAlign: 'center',
            color: MyColors.Neutral.NEUTRAL00,
          }}>
          Info Penawar
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: ms(16),
          paddingVertical: ms(21),
          paddingHorizontal: ms(16),
          marginBottom: ms(24),
        }}>
        <Image
          source={{uri: product?.Product?.image_url}}
          style={{width: ms(48), height: ms(48), borderRadius: ms(12)}}
        />
        <View style={{marginLeft: ms(16)}}>
          <Text
            style={{
              fontFamily: MyFonts.Regular,
              fontSize: ms(14),
              color: MyColors.Neutral.NEUTRAL00,
            }}>
            {product?.User?.full_name}
          </Text>
          <Text
            style={{
              fontFamily: MyFonts.Regular,
              fontSize: ms(10),
              color: MyColors.Neutral.NEUTRAL03,
            }}>
            {product?.User?.city}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontFamily: MyFonts.Medium,
          fontSize: ms(14),
          color: MyColors.Neutral.NEUTRAL00,
          marginBottom: ms(16),
        }}>
        Daftar Produkmu yang Ditawar
      </Text>
      <CardNotification
        type="bid"
        price={product.base_price}
        penawaran={product.price}
        productName={product.product_name}
        timestamp={product.transaction_date}
        read={true}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  backButton: {
    zIndex: 1,
    position: 'absolute',
    top: ms(16),
    left: ms(16),
  },
});
