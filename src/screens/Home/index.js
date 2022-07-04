import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextInput from '../../components/TextInput';
import {MyColors} from '../../utils/colors/index';
import Gift from '../../assets/images/gift.png';
import {MyFonts} from '../../utils';
import Button from '../../components/Button';
import {ms} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import axios from 'axios';
import CardProduct from '../../components/CardProduct';

const Index = () => {
  const [keyword, setKeyword] = useState('');
  const [product, setProduct] = useState([]);

  const getBuyerProduct = () => {
    let i = 0;
    const myProduct = [];
    axios
      .get('https://market-final-project.herokuapp.com/buyer/product')
      .then(function (response) {
        response.data.forEach(index => {
          i++;
          i <= 10 ? myProduct.push(index) : null;
        });
        setProduct(myProduct);
        console.log(product);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getBuyerProduct();
    console.log(product, '2');
  }, []);
  return (
    <View>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0, y: 1.0}}
        locations={[0, 0.3, 0.5]}
        colors={['#FFE9C9', '#FFF7ED', '#FFF']}
        style={{
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(100),
        }}>
        <View style={{alignSelf: 'center', paddingHorizontal: ms(16)}}>
          <View>
            <TextInput
              name="search"
              style={{
                backgroundColor: '#FFF',
                fontSize: ms(14),
                fontFamily: MyFonts.Regular,
                height: ms(48),
                width: ms(328),
                borderRadius: ms(16),
                marginTop: ms(38),
              }}
              props={{placeholderTextColor: '#8A8A8A'}}
              placeholder="Cari di Second Chance"
              placeholderTextColor={MyColors.Neutral.NEUTRAL03}
              selectionColor={MyColors.Primary.DARKBLUE04}
              value={keyword}
              onChangeText={text => setKeyword(text)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: ms(32),
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontFamily: MyFonts.Bold,
                  fontSize: ms(20),
                  width: ms(180),
                  color: '#000',
                }}>
                Bulan Ramadhan Banyak diskon!
              </Text>
              <Text
                style={{
                  fontFamily: MyFonts.Regular,
                  fontSize: ms(10),
                  color: '#000',
                  marginTop: ms(16),
                }}>
                Diskon Hingga
              </Text>
              <Text
                style={{
                  fontFamily: MyFonts.Regular,
                  color: 'red',
                  fontSize: ms(18),
                  marginTop: ms(4),
                }}>
                60%
              </Text>
            </View>
            <Image source={Gift} style={{width: ms(127), height: ms(123)}} />
          </View>
          <Text
            style={{
              fontFamily: MyFonts.Regular,
              fontSize: ms(14),
              marginTop: ms(48),
              color: '#151515',
              marginBottom: ms(16),
            }}>
            Telusuri Kategori
          </Text>
          <FlatList
            data={['Semua', 'Hobi', 'Kendaraan']}
            horizontal={true}
            renderItem={({item}) => (
              <Button
                type="ctaFilter"
                filterText={item}
                style={{height: ms(44), marginRight: ms(16)}}
                iconName="search"
              />
            )}
          />
          {product ? (
            <FlatList
              data={product}
              numColumns={2}
              renderItem={({item}) => {
                return (
                  <CardProduct
                    productName={item.name}
                    source={item.image_url}
                    price={item.base_price}
                    style={{marginRight: ms(16)}}
                  />
                );
              }}
            />
          ) : (
            <></>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
