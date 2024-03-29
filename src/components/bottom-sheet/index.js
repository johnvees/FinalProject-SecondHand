import axios from 'axios';
import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ms} from 'react-native-size-matters';
import {BASE_URL, MyColors, MyFonts} from '../../utils';
import NumberFormat from '../NumberFormat';
import TextInput from '../TextInput';
import Toast from 'react-native-toast-message';
import {useState} from 'react';
import {setLoading} from '../../redux/globalAction';
import {useDispatch} from 'react-redux';
import Button from '../Button';

export default function BS({
  refRBSheet,
  productName = 'Jam Tangan Casio',
  productPrice = '250000',
  productImage,
  setBackDrop,
  productId,
  tokenValue,
  setOrdered,
  type,
  buyerName,
  buyerImage = 'https://www.freeiconspng.com/uploads/no-image-icon-11.PNG',
  buyerCity,
  bidPrice,
  phone,
}) {
  // const refRBSheet = useRef();
  const dispatch = useDispatch();
  const [price, setPrice] = useState();
  const sendOrder = (id, bid) => {
    const body = {
      product_id: id,
      bid_price: bid,
    };
    refRBSheet.current.close();
    dispatch(setLoading(true));
    axios.defaults.headers.common['access_token'] = tokenValue;
    axios
      .post(BASE_URL + '/buyer/order', body)
      .then(response => {
        Toast.show({
          type: 'success',
          text1: 'Berhasil Mengirim Penawaran Harga',
        });
        setOrdered('pending');
        dispatch(setLoading(false));
      })
      .catch(err => {
        dispatch(setLoading(false));
        console.log(err);
        Toast.show({
          type: 'error',
          text1: err.response.data.message,
        });
      });
  };

  if (type == 'nego')
    return (
      <View
        style={{
          flex: 1,
        }}>
        <RBSheet
          ref={refRBSheet}
          height={ms(450)}
          closeOnDragDown={true}
          closeOnPressMask={true}
          onOpen={() => setBackDrop(true)}
          onClose={() => setBackDrop(false)}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#C4C4C4',
              width: ms(90),
            },
            container: {
              borderTopLeftRadius: ms(16),
              borderTopRightRadius: ms(16),
            },
          }}>
          <View style={styles.itemContainer}>
            <View
              style={{
                width: ms(320),
                // left: ms(27),
                padding: ms(12),
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  textAlign: 'left',
                  color: 'black',
                  fontSize: ms(14),
                  fontWeight: '500',
                }}>
                Masukkan Harga Tawaranmu
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: ms(14),
                  fontWeight: '400',
                  color: '#8A8A8A',
                }}>
                Harga tawaranmu akan diketahui penual, jika penjual cocok kamu
                akan segera dihubungi penjual.
              </Text>
            </View>
            <View style={styles.cardView}>
              <View style={styles.infoCard}>
                <Image
                  source={{uri: productImage}}
                  style={{
                    width: ms(50),
                    height: ms(50),
                    backgroundColor: 'blue',
                    borderRadius: ms(12),
                    marginRight: ms(5),
                  }}
                />
                <View>
                  <Text style={styles.textInfo}>{productName}</Text>
                  <Text
                    style={{
                      fontSize: ms(14),
                      color: 'black',
                      fontWeight: '400',
                    }}>
                    {NumberFormat(productPrice)}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: ms(12),
                  marginBottom: ms(-15),
                  marginTop: ms(24),
                  fontFamily: MyFonts.Regular,
                  color: MyColors.Neutral.NEUTRAL00,
                }}>
                Harga Tawar
              </Text>
              <TextInput
                placeholder="Rp 0,00"
                fontSize={12}
                lineHeight={12}
                style={{height: ms(48)}}
                value={price}
                onChangeText={text => setPrice(text)}
              />
            </View>
            <TouchableOpacity
              onPress={() => sendOrder(productId, price)}
              style={styles.closeButton}>
              <Text style={styles.textCLose}>Kirim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={[
                styles.closeButton,
                {backgroundColor: MyColors.Alerrt.danger},
              ]}>
              <Text style={styles.textCLose}>Batal Nego</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    );

  if (type == 'accept')
    return (
      <View
        style={{
          flex: 1,
        }}>
        <RBSheet
          ref={refRBSheet}
          height={ms(450)}
          closeOnDragDown={true}
          closeOnPressMask={true}
          onOpen={() => setBackDrop(true)}
          onClose={() => setBackDrop(false)}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#C4C4C4',
              width: ms(90),
            },
            container: {
              borderTopLeftRadius: ms(16),
              borderTopRightRadius: ms(16),
            },
          }}>
          <View style={styles.itemContainer}>
            <View
              style={{
                padding: ms(12),
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  textAlign: 'left',
                  color: 'black',
                  fontSize: ms(14),
                  marginBottom: ms(8),
                  fontFamily: MyFonts.Medium,
                }}>
                Yeay kamu berhasil mendapat harga yang sesuai
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: ms(14),
                  color: '#8A8A8A',
                  marginBottom: ms(16),
                  fontFamily: MyFonts.Regular,
                }}>
                Segera hubungi pembeli melalui whatsapp untuk transaksi
                selanjutnya
              </Text>
            </View>
            <View style={styles.cardView}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: ms(14),
                  fontFamily: MyFonts.Medium,
                  marginBottom: ms(16),
                }}>
                Product Match
              </Text>
              <View style={styles.infoCard}>
                <Image
                  source={{uri: buyerImage}}
                  style={{
                    width: ms(50),
                    height: ms(50),
                    backgroundColor: 'blue',
                    borderRadius: ms(12),
                    marginRight: ms(16),
                  }}
                />
                <View>
                  <Text style={styles.textInfo}>{buyerName}</Text>
                  <Text
                    style={{
                      fontSize: ms(12),
                      fontWeight: '400',
                      color: '#8A8A8A',
                    }}>
                    {buyerCity}
                  </Text>
                </View>
              </View>
              <View style={styles.infoCard}>
                <Image
                  source={{uri: productImage}}
                  style={{
                    width: ms(50),
                    height: ms(50),
                    backgroundColor: 'blue',
                    borderRadius: ms(12),
                    marginRight: ms(16),
                  }}
                />
                <View>
                  <Text style={styles.textInfo}>{productName}</Text>
                  <Text
                    style={{
                      fontSize: ms(14),
                      color: 'black',
                      fontFamily: MyFonts.Regular,
                      textDecorationLine: 'line-through',
                    }}>
                    {NumberFormat(productPrice)}
                  </Text>
                  <Text style={styles.textInfo}>
                    Ditawar {NumberFormat(bidPrice)}
                  </Text>
                </View>
              </View>
            </View>
            <Button
              type={'ctaHalfCircularWithIcon'}
              ctaText={'Hubungi via WhatsApp'}
              style={{marginTop: ms(24), justifyContent: 'center'}}
              onPress={() => {
                Linking.openURL('whatsapp://send?phone=+62' + phone).catch(
                  err =>
                    Toast.open({
                      type: 'error',
                      text1:
                        'Make sure WhatsApp already installed on your phone',
                    }),
                );
              }}
            />
          </View>
        </RBSheet>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    backgroundColor: 'grey',
  },
  itemContainer: {
    // flex: 1,
    paddingHorizontal: ms(32),
  },
  closeButton: {
    width: ms(296),
    height: ms(48),
    padding: ms(12),
    marginTop: ms(16),
    // top: ms(40),
    // left: ms(38),
    justifyContent: 'center',
    backgroundColor: '#7126B5',
    borderRadius: ms(16),
  },
  textCLose: {
    textAlign: 'center',
    color: 'white',
    fontSize: ms(14),
  },
  cardView: {
    width: ms(296),
    // height: ms(200),
    // top: ms(16),
    // left: ms(27),
    borderRadius: ms(16),
    padding: ms(12),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  infoCard: {
    flexDirection: 'row',
    marginBottom: ms(12),
  },
  textInfo: {
    fontSize: ms(14),
    color: 'black',
    fontFamily: MyFonts.Regular,
  },
});
