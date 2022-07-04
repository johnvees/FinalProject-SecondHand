import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';

const CardProduct = ({
  source = 'https://www.freeiconspng.com/uploads/no-image-icon-11.PNG',
  productName = 'Product Name',
  category = 'Category',
  price = 250000,
  onPress = () => {},
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.cardContainer, style]} onPress={onPress}>
      <Image source={{uri: source}} style={styles.image} resizeMode="cover" />
      <Text style={styles.product_name}>{productName}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.price}>Rp. {price}</Text>
    </TouchableOpacity>
  );
};

export default CardProduct;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    width: ms(156),
    height: ms(204),
    borderRadius: ms(4),
    padding: ms(8),
    alignItems: 'flex-start',
    elevation: ms(4),
  },
  image: {
    width: ms(140),
    height: ms(100),
    borderRadius: ms(4),
    marginBottom: ms(8),
  },
  product_name: {
    fontSize: ms(14),
    color: '#151515',
    marginBottom: ms(4),
  },
  category: {
    fontSize: ms(10),
    color: '#8A8A8A',
    marginBottom: ms(8),
  },
  price: {
    fontSize: ms(14),
    color: '#151515',
  },
});
