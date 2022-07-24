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
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';

import NoImage from '../../assets/images/no_image.png';
import {Button, CardNotification, CardProduct, Gap} from '../../components';
import {BASE_URL, MyColors, MyFonts} from '../../utils';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {navigate, navigationRef} from '../../utils/helpers/navigate';
import axios from 'axios';
import {useCallback} from 'react';
import {setLoading} from '../../redux/globalAction';
import BS from '../../components/bottom-sheet';
import {useRef} from 'react';

const DaftarJual = ({navigation}) => {
  const refRBSheet = useRef();
  const {tokenValue} = useSelector(state => state.login);
  const [btnProdukActive, setBtnProdukActive] = useState(true);
  const [btnDiminatiActive, setBtnDiminatiActive] = useState(false);
  const [btnTerjualActive, setBtnTerjualActive] = useState(false);
  const [type, setType] = useState('produk');
  const [photo, setPhoto] = useState(NoImage);
  const [userData, setUserData] = useState({
    fullname: '',
    city: '',
  });
  const [product, setProduct] = useState([]);
  const [item, setItem] = useState([]);
  const [backdrop, setBackDrop] = useState(false);
  const [diminati, setDiminati] = useState([]);
  const [terjual, setTerjual] = useState([]);
  const dispatch = useDispatch();

  const getTerjual = async () => {
    try {
      dispatch(setLoading(true));
      const result = await axios.get(
        `${BASE_URL}/seller/order?status=accepted`,
        {
          headers: {access_token: tokenValue},
        },
      );
      setTerjual(result.data);
    } catch (error) {
      console.log('ini errornya:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getDiminati = async () => {
    try {
      dispatch(setLoading(true));
      const result = await axios.get(
        `${BASE_URL}/seller/order?status=pending`,
        {
          headers: {access_token: tokenValue},
        },
      );
      setDiminati(result.data);
    } catch (error) {
      console.log('ini errornya:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getUser = async () => {
    try {
      dispatch(setLoading(true));
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
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getSellerProduct = async () => {
    try {
      dispatch(setLoading(true));
      const result = await axios.get(`${BASE_URL}/seller/product`, {
        headers: {access_token: tokenValue},
      });

      console.log('ini result seller product: ', result);
      console.log('ini result seller product data: ', result.data);

      setProduct(result.data);
    } catch (error) {
      console.log('ini errornya:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const ProdukItem = () => {
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

    return product[0] ? (
      <View>
        <AddProduct />
        <FlatList
          data={product}
          numColumns={2}
          renderItem={({item}) => (
            <CardProduct
              productName={item.name}
              source={item.image_url}
              price={item.base_price}
              category={item.Categories}
              style={styles.cardProduct}
              onPress={() =>
                navigation.navigate('DetailProduct', {id: item.id})
              }
            />
          )}
        />
      </View>
    ) : (
      <View>
        <AddProduct />
        <Text style={styles.noItem}>Belum ada Product yang Anda terbitkan</Text>
      </View>
    );
  };

  const DiminatiItem = () => {
    console.log(diminati);
    return diminati[0] ? (
      <FlatList
        data={diminati}
        renderItem={({item}) => {
          console.log(item);
          return (
            <View>
              <CardNotification
                type={'bid'}
                penawaran={item?.price}
                source={item?.Product?.image_url}
                productName={item?.Product?.name}
                price={item?.Product?.base_price}
                timestamp={item?.createdAt}
                read={true}
                onPress={() =>
                  navigation.navigate('TerimaTolak', {id: item?.id})
                }
              />
              <View style={styles.divider}></View>
            </View>
          );
        }}
      />
    ) : (
      <Text style={styles.noItem}>Belum ada Product yang Diminati</Text>
    );
  };

  const TerjualItem = item => {
    return terjual[0] ? (
      <FlatList
        data={terjual}
        renderItem={({item}) => {
          console.log(item);
          return (
            <View>
              <CardNotification
                type={'accepted'}
                penawaran={item?.price}
                source={item?.Product?.image_url}
                productName={item?.Product?.name}
                price={item?.Product?.base_price}
                timestamp={item?.createdAt}
                read={true}
                onPress={() => {
                  setItem(item);
                  refRBSheet.current.open();
                }}
              />
              <View style={styles.divider}></View>
            </View>
          );
        }}
      />
    ) : (
      <Text style={styles.noItem}>Belum ada Product yang Terjual</Text>
    );
  };

  const renderSheet = useCallback(() => {
    return (
      <BS
        refRBSheet={refRBSheet}
        type={'accept'}
        productName={item?.Product?.name}
        productPrice={item?.Product?.base_price}
        productImage={item?.Product?.image_url}
        setBackDrop={setBackDrop}
        tokenValue={tokenValue}
        buyerName={item?.User?.full_name}
        buyerCity={item?.User?.city}
        bidPrice={item?.price}
        phone={item?.User?.phone_number}
      />
    );
  }, [item]);

  const ViewRenderItem = useCallback(() => {
    if (type === 'produk') {
      return <ProdukItem />;
    } else if (type === 'diminati') {
      return <DiminatiItem />;
    } else if (type === 'terjual') {
      return <TerjualItem />;
    }
  }, [type, diminati, product, terjual]);

  useEffect(() => {
    getUser();
    getSellerProduct();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          position: 'absolute',
          zIndex: 1,
          height: heightPercentageToDP(100),
          width: widthPercentageToDP(100),
          display: backdrop ? 'flex' : 'none',
        }}></View>
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
              getSellerProduct();
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
              getDiminati();
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
              getTerjual();
            }}
          />
        </ScrollView>

        <Gap height={ms(24)} />

        {ViewRenderItem()}
        {renderSheet()}
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
  cardProduct: {
    marginRight: ms(16),
    marginBottom: ms(16),
  },
  noItem: {
    fontFamily: MyFonts.Regular,
    color: MyColors.Neutral.NEUTRAL03,
    fontSize: ms(14),
    textAlign: 'center',
    marginTop: ms(30),
  },
});
