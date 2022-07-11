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
  const id = route.params.id;

  useEffect(() => {
    axios
      .get('https://market-final-project.herokuapp.com/buyer/product/' + id)
      .then(Response => {
        setProduct(Response.data);
      });
  }, []);

  return (
    <View>
      <ScrollView style={styles.container}>
        <Image
          source={{uri: product.image_url}}
          style={styles.banner}
          resizeMode="cover"
        />
        <View style={styles.contentContainer}>
          <View style={styles.cardProduct1}>
            <Text style={styles.productName}>{product.name}</Text>
            <FlatList
              data={product.Categories}
              horizontal={true}
              renderItem={({item}) => (
                <Text style={styles.productCategories}>{item.name}</Text>
              )}
            />
            <Text style={styles.productPrice}>
              {NumberFormat(product.base_price)}
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
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>
        </View>
        <Button
          type="iconOnly"
          onPress={() => navigation.navigate.goBack()}
          iconSize={ms(24)}
          iconColor="black"
          iconName="arrow-left"
          style={styles.footerButton}
        />
      </ScrollView>
      <Button
        type="cta"
        ctaText={'Saya Tertarik dan Ingin Nego'}
        onPress={() => navigation.navigate('Login')}
        style={styles.backButton}
      />
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
  footerButton: {
    backgroundColor: MyColors.Neutral.NEUTRAL01,
    borderRadius: ms(24),
    zIndex: 1,
    position: 'absolute',
    top: ms(44),
    left: ms(16),
    padding: ms(2),
  },
  backButton: {
    zIndex: 1,
    position: 'absolute',
    top: heightPercentageToDP(100) - ms(72),
    marginHorizontal: ms(16),
  },
});
