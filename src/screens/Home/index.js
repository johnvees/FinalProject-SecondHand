import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
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
import Feather from 'react-native-vector-icons/Feather';

const Index = () => {
  const [keyword, setKeyword] = useState('');
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({id: 0, name: 'Semua'});

  const getBuyerProduct = () => {
    let i = 0;
    const myProduct = [];

    if (activeCategory.name == 'Semua')
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
    else
      axios
        .get(
          'https://market-final-project.herokuapp.com/buyer/product?category_id=' +
            activeCategory.id,
        )
        .then(function (response) {
          setProduct(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  const getCategories = () => {
    let i = 0;
    axios
      .get('https://market-final-project.herokuapp.com/seller/category')
      .then(function (response) {
        setCategories([{name: 'Semua'}, ...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useMemo(() => {
    getBuyerProduct();
  }, [activeCategory]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0, y: 1.0}}
        locations={[0, 0.3, 0.5]}
        colors={['#FFE9C9', '#FFF7ED', '#FFF']}
        style={styles.linearGradient}>
        <View style={styles.mainContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              name="search"
              style={styles.searchInput}
              placeholder="Cari di Second Chance"
              props={{
                placeholderTextColor: MyColors.Neutral.NEUTRAL03,
                selectionColor: MyColors.Primary.DARKBLUE04,
              }}
              value={keyword}
              onChangeText={text => setKeyword(text)}
            />
          </View>
          <View style={styles.bannerContainer}>
            <View>
              <Text style={styles.bannerText}>
                Bulan Ramadhan Banyak diskon!
              </Text>
              <Text style={styles.discountText}>Diskon Hingga</Text>
              <Text style={styles.discountPercentage}>60%</Text>
            </View>
            <Image source={Gift} style={styles.banner} />
          </View>
          <Text style={styles.categoryHeader}>Telusuri Kategori</Text>
          <FlatList
            data={categories}
            horizontal={true}
            renderItem={({item}) => (
              <Button
                active={item.name == activeCategory.name ? true : false}
                type="ctaFilter"
                filterText={item.name}
                style={styles.categoryButton}
                iconName="search"
                onPress={() =>
                  setActiveCategory({id: item.id, name: item.name})
                }
              />
            )}
          />
          {product ? (
            <View style={styles.cardContainer}>
              <FlatList
                data={product}
                numColumns={2}
                renderItem={({item}) => {
                  return (
                    <CardProduct
                      productName={item.name}
                      source={item.image_url}
                      price={item.base_price}
                      category={item.Categories}
                      style={styles.cardProduct}
                    />
                  );
                }}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  linearGradient: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  },
  mainContainer: {
    alignSelf: 'center',
    paddingHorizontal: ms(16),
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#FFF',
    fontSize: ms(14),
    fontFamily: MyFonts.Regular,
    height: ms(48),
    width: ms(328),
    borderRadius: ms(16),
    marginTop: ms(38),
  },
  bannerContainer: {
    flexDirection: 'row',
    paddingTop: ms(32),
    justifyContent: 'space-between',
  },
  bannerText: {
    fontFamily: MyFonts.Bold,
    fontSize: ms(20),
    width: ms(180),
    color: '#000',
  },
  discountText: {
    fontFamily: MyFonts.Regular,
    fontSize: ms(10),
    color: '#000',
    marginTop: ms(16),
  },
  discountPercentage: {
    fontFamily: MyFonts.Regular,
    color: 'red',
    fontSize: ms(18),
    marginTop: ms(4),
  },
  banner: {
    width: ms(127),
    height: ms(123),
  },
  categoryHeader: {
    fontFamily: MyFonts.Regular,
    fontSize: ms(14),
    marginTop: ms(48),
    color: '#151515',
    marginBottom: ms(16),
  },
  categoryButton: {
    height: ms(44),
    marginRight: ms(16),
  },
  cardContainer: {
    flex: 1,
    marginTop: ms(-300),
    paddingBottom: ms(50),
  },
  cardProduct: {
    marginRight: ms(16),
    marginBottom: ms(16),
  },
});
