import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ms} from 'react-native-size-matters';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native-gesture-handler';
import {MyColors, MyFonts} from '../../utils';
import {Button, NumberFormat} from '../../components';

const DetailProduct = ({navigation, route}) => {
  const [product, setProduct] = useState({});
  //   const id = route.params.id;

  useEffect(() => {
    axios
      .get('https://market-final-project.herokuapp.com/buyer/product/98')
      .then(Response => {
        setProduct(Response.data);
      });
  }, []);

  return (
    <View>
      <ScrollView style={{height: heightPercentageToDP(100)}}>
        <Image
          source={{uri: product.image_url}}
          style={{width: widthPercentageToDP(100), height: ms(300)}}
          resizeMode="cover"
        />
        <View style={{paddingHorizontal: ms(16), marginBottom: ms(72)}}>
          <View
            style={{
              marginTop: ms(-35),
              backgroundColor: MyColors.Neutral.NEUTRAL01,
              paddingHorizontal: ms(24),
              paddingVertical: ms(16),
              borderRadius: ms(16),
              elevation: 1,
              marginBottom: ms(16),
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: ms(14),
                fontFamily: MyFonts.Regular,
                marginBottom: ms(4),
              }}>
              {product.name}
            </Text>
            <FlatList
              data={product.Categories}
              horizontal={true}
              renderItem={({item}) => (
                <Text
                  style={{
                    color: MyColors.Neutral.NEUTRAL03,
                    fontSize: ms(10),
                    fontFamily: MyFonts.Regular,
                    marginBottom: ms(8),
                  }}>
                  {item.name}
                </Text>
              )}
            />
            <Text
              style={{
                color: 'black',
                fontSize: ms(14),
                fontFamily: MyFonts.Regular,
              }}>
              {NumberFormat(product.base_price)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: MyColors.Neutral.NEUTRAL01,
              padding: ms(16),
              borderRadius: ms(16),
              elevation: 1,
              marginBottom: ms(19),
            }}>
            <Image
              source={{uri: product?.User?.image_url}}
              style={{
                width: ms(48),
                height: ms(48),
                borderRadius: ms(12),
                marginRight: ms(16),
              }}
              resizeMode="cover"
            />
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: ms(14),
                  fontFamily: MyFonts.Regular,
                }}>
                {product?.User?.full_name}
              </Text>
              <Text
                style={{
                  color: MyColors.Neutral.NEUTRAL03,
                  fontSize: ms(14),
                  fontFamily: MyFonts.Regular,
                }}>
                {product?.User?.city}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: MyColors.Neutral.NEUTRAL01,
              padding: ms(16),
              borderRadius: ms(16),
              elevation: 1,
              marginBottom: ms(16),
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: ms(14),
                fontFamily: MyFonts.Regular,
              }}>
              Deskripsi
            </Text>
            <Text
              style={{
                color: MyColors.Neutral.NEUTRAL03,
                fontSize: ms(14),
                fontFamily: MyFonts.Regular,
              }}>
              {product.description}
              loremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitamet
            </Text>
          </View>
        </View>
        <Button
          type="iconOnly"
          onPress={() => navigation.navigate.goBack()}
          iconSize={ms(24)}
          iconColor="black"
          iconName="arrow-left"
          style={{
            backgroundColor: MyColors.Neutral.NEUTRAL01,
            borderRadius: ms(24),
            zIndex: 1,
            position: 'absolute',
            top: ms(44),
            left: ms(16),
            padding: ms(2),
          }}
        />
      </ScrollView>
      <Button
        type="cta"
        ctaText={'Saya Tertarik dan Ingin Nego'}
        onPress={() => navigation.navigate('Login')}
        style={{
          zIndex: 1,
          position: 'absolute',
          top: heightPercentageToDP(100) - ms(72),
          marginHorizontal: ms(16),
        }}
      />
    </View>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({});
