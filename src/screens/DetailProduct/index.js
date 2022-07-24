import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import axios, {Axios} from 'axios';
import {ms} from 'react-native-size-matters';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native-gesture-handler';
import {BASE_URL, MyColors, MyFonts} from '../../utils';
import {Button, NumberFormat} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import BS from '../../components/bottom-sheet';
import {setLoading} from '../../redux/globalAction';

const DetailProduct = ({navigation, route, values}) => {
  const [product, setProduct] = useState({});
  const id = route.params.id;
  const type = route.params.type;
  const {tokenValue} = useSelector(state => state.login);
  const refRBSheet = useRef();
  const [showRB, setShowRB] = useState(false);
  const [ordered, setOrdered] = useState();
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.Global);

  function checkOrder() {
    try {
      axios.defaults.headers.common['access_token'] = tokenValue;
      axios.get(BASE_URL + '/buyer/order').then(response => {
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i].product_id, id);
          if (response.data[i].product_id == id) {
            setOrdered(true);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
    setOrdered(false);
  }

  useEffect(() => {
    try {
      dispatch(setLoading(true));
      if (type == 'preview') {
        setProduct(route.params.product);
        console.log(route.params.product, 'valval');
        dispatch(setLoading(false));
      } else {
        axios
          .get('https://market-final-project.herokuapp.com/buyer/product/' + id)
          .then(Response => {
            setProduct(Response.data);
            dispatch(setLoading(false));
          });
        checkOrder();
      }
    } catch (err) {
      dispatch(setLoading(false));
      console.log(err);
    }
  }, []);

  return (
    <View>
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          height: heightPercentageToDP(100),
          width: widthPercentageToDP(100),
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: showRB ? 'flex' : 'none',
        }}></View>
      <ScrollView style={styles.container}>
        <Image
          source={{uri: product?.image_url}}
          style={styles.banner}
          resizeMode="cover"
        />
        <View style={styles.contentContainer}>
          <View style={styles.cardProduct1}>
            <Text style={styles.productName}>{product?.name}</Text>
            <FlatList
              data={product?.Categories}
              horizontal={true}
              renderItem={({item, index}) => (
                <Text style={styles.productCategories}>
                  {index > 0 ? ', ' : ''}
                  {item?.name}
                </Text>
              )}
            />
            <Text style={styles.productPrice}>
              {NumberFormat(product?.base_price)}
            </Text>
          </View>
          <View style={styles.cardProduct2}>
            <Image
              source={{uri: product?.User?.image_url}}
              style={styles.sellerImage}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.sellerName}>{product?.User?.full_name}</Text>
              <Text style={styles.sellerCity}>{product?.User?.city}</Text>
            </View>
          </View>
          <View style={styles.cardProduct3}>
            <Text style={styles.descriptionHeader}>Deskripsi</Text>
            <Text style={styles.descriptionText}>{product?.description}</Text>
          </View>
          <BS
            refRBSheet={refRBSheet}
            productId={id}
            productName={product?.name}
            productPrice={product?.base_price}
            productImage={product?.image_url}
            setBackDrop={setShowRB}
            tokenValue={tokenValue}
            setOrdered={setOrdered}
            type={'nego'}
          />
        </View>
        <Button
          type="iconOnly"
          onPress={() => navigation.goBack()}
          iconSize={ms(24)}
          iconColor="black"
          iconName="arrow-left"
          style={styles.backButton}
        />
      </ScrollView>
      {type != 'preview' ? (
        !ordered ? (
          <Button
            type="cta"
            ctaText={'Saya Tertarik dan Ingin Nego'}
            onPress={() => {
              refRBSheet.current.open();
              console.log(refRBSheet);
            }}
            style={styles.footerButton}
          />
        ) : (
          <Button
            type="ctaDisabled"
            ctaText={'Menunggu Respon Seller'}
            onPress={() => navigation.navigate('Login')}
            style={[styles.footerButton, styles.disabled]}
          />
        )
      ) : (
        <Button
          type="cta"
          ctaText={'Terbitkan'}
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.footerButton}
        />
      )}
    </View>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  container: {height: heightPercentageToDP(100)},
  banner: {width: widthPercentageToDP(100), height: ms(300)},
  contentContainer: {paddingHorizontal: ms(16), marginBottom: ms(72)},
  cardProduct1: {
    marginTop: ms(-35),
    backgroundColor: MyColors.Neutral.NEUTRAL01,
    paddingHorizontal: ms(24),
    paddingVertical: ms(16),
    borderRadius: ms(16),
    elevation: 1,
    marginBottom: ms(16),
  },
  productName: {
    color: 'black',
    fontSize: ms(14),
    fontFamily: MyFonts.Regular,
    marginBottom: ms(4),
  },
  productCategories: {
    color: MyColors.Neutral.NEUTRAL03,
    fontSize: ms(10),
    fontFamily: MyFonts.Regular,
    marginBottom: ms(8),
  },
  productPrice: {
    color: 'black',
    fontSize: ms(14),
    fontFamily: MyFonts.Regular,
  },
  cardProduct2: {
    flexDirection: 'row',
    backgroundColor: MyColors.Neutral.NEUTRAL01,
    padding: ms(16),
    borderRadius: ms(16),
    elevation: 1,
    marginBottom: ms(19),
  },
  sellerImage: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(12),
    marginRight: ms(16),
  },
  sellerName: {
    color: 'black',
    fontSize: ms(14),
    fontFamily: MyFonts.Regular,
  },
  sellerCity: {
    color: MyColors.Neutral.NEUTRAL03,
    fontSize: ms(14),
    fontFamily: MyFonts.Regular,
  },
  cardProduct3: {
    backgroundColor: MyColors.Neutral.NEUTRAL01,
    padding: ms(16),
    borderRadius: ms(16),
    elevation: 1,
    marginBottom: ms(16),
  },
  descriptionHeader: {
    color: 'black',
    fontSize: ms(14),
    fontFamily: MyFonts.Regular,
  },
  descriptionText: {
    color: MyColors.Neutral.NEUTRAL03,
    fontSize: ms(14),
    fontFamily: MyFonts.Regular,
  },
  backButton: {
    backgroundColor: MyColors.Neutral.NEUTRAL01,
    borderRadius: ms(24),
    zIndex: 1,
    position: 'absolute',
    top: ms(44),
    left: ms(16),
    padding: ms(2),
  },
  footerButton: {
    zIndex: 1,
    position: 'absolute',
    top: heightPercentageToDP(100) - ms(72),
    marginHorizontal: ms(16),
    width: widthPercentageToDP(100) - ms(32),
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: MyColors.Neutral.NEUTRAL03,
  },
});
