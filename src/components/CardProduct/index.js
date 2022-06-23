import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';

const Index = (
  source = 'https://www.freeiconspng.com/uploads/no-image-icon-13.png',
  product_name = 'Product Name',
  category = 'Category',
  price = 250000,
) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Image source={{uri: source}} style={styles.image} resizeMode="contain" />
      <Text style={styles.product_name}>{product_name}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.price}>Rp. {price}</Text>
    </TouchableOpacity>
  );
};

export default Index;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    width: ms(156),
    height: ms(204),
    borderRadius: ms(4),
    padding: ms(8),
    alignItems: 'flex-start',
  },
  image: {
    width: ms(140),
    height: ms(100),
    borderRadius: ms(4),
  },
  product_name: {
    fontSize: ms(14),
    color: '#151515',
  },
  category: {
    fontSize: ms(10),
    color: '#8A8A8A',
  },
  price: {
    fontSize: ms(14),
    color: '#151515',
  },
});
