import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
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

const Index = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({id: 0, name: 'Semua'});
  const [modalVisible, setModalVisible] = useState(false);
  const [searchProduct, setSearchProduct] = useState(null);
  const onSearch = keyword => {
    setModalVisible(true);
    setSearchProduct(null);
    axios
      .get(
        'https://market-final-project.herokuapp.com/buyer/product?search=' +
          keyword,
      )
      .then(function (response) {
        setSearchProduct(response.data);
        console.log(searchProduct[0], 'product');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getBuyerProduct = keyword => {
    let i = 0;
    const myProduct = [];
    setProduct(null);

    const url =
      activeCategory.name != 'Semua'
        ? 'https://market-final-project.herokuapp.com/buyer/product?category_id=' +
          activeCategory.id
        : 'https://market-final-project.herokuapp.com/buyer/product';

    axios
      .get(url)
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

  const getCategories = () => {
    axios
      .get('https://market-final-project.herokuapp.com/seller/category')
      .then(function (response) {
        setCategories([{name: 'Semua'}, ...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const renderSearchProduct = useCallback(() => {
    if (searchProduct) {
      if (!searchProduct[0]) {
        return (
          <View style={styles.searchProductContainer}>
            <Text style={styles.notFoundText}>Product tidak ditemukan</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.searchProductContainer}>
            <FlatList
              data={searchProduct}
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
        );
      }
    } else {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={MyColors.Neutral.NEUTRAL03} />
        </View>
      );
    }
  }, [searchProduct]);

  useMemo(() => {
    getBuyerProduct();
  }, [activeCategory]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setKeyword('');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setKeyword('');
              }}>
              <Text style={styles.textStyle}>Kembali ke Home</Text>
            </Pressable>
            <View style={styles.searchContainer}>
              <TextInput
                name="search"
                style={styles.searchInput}
                placeholder="Cari di Second Chance"
                props={{
                  placeholderTextColor: MyColors.Neutral.NEUTRAL03,
                  selectionColor: MyColors.Primary.DARKBLUE04,
                  onSubmitEditing: () => {
                    onSearch(keyword);
                  },
                }}
                value={keyword}
                onChangeText={text => setKeyword(text)}
              />
              <TouchableOpacity
                style={styles.searchIcon}
                onPress={() => onSearch(keyword)}>
                <Feather
                  name="search"
                  size={20}
                  color={MyColors.Neutral.NEUTRAL03}
                />
              </TouchableOpacity>
            </View>
            {renderSearchProduct()}
          </View>
        </View>
      </Modal>
      {/*--------------------------- Main Component --------------------------- */}
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
                onSubmitEditing: () => {
                  onSearch(keyword);
                },
              }}
              value={keyword}
              onChangeText={text => setKeyword(text)}
            />
            <TouchableOpacity
              style={styles.searchIcon}
              onPress={() => onSearch(keyword)}>
              <Feather
                name="search"
                size={20}
                color={MyColors.Neutral.NEUTRAL03}
              />
            </TouchableOpacity>
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
                      onPress={() =>
                        navigation.navigate('DetailProduct', {id: item.id})
                      }
                    />
                  );
                }}
              />
            </View>
          ) : (
            <View style={styles.loaderContainer}>
              <ActivityIndicator
                size="large"
                color={MyColors.Neutral.NEUTRAL03}
              />
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  searchIcon: {position: 'absolute', top: ms(70), right: ms(20)},
  searchProductContainer: {
    marginTop: ms(40),
  },
  notFoundText: {
    color: MyColors.Neutral.NEUTRAL03,
    fontFamily: MyFonts.Regular,
    fontSize: ms(16),
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  },
  button: {
    width: ms(200),
    marginTop: ms(50),
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: MyColors.Primary.DARKBLUE03,
  },
  textStyle: {
    fontFamily: MyFonts.Bold,
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  loaderContainer: {
    marginTop: ms(-400),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  },
  mainContainer: {
    alignSelf: 'center',
    paddingHorizontal: ms(16),
  },
  searchContainer: {},
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
