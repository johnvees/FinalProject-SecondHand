import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import NumberFormat from '../NumberFormat';

const Index = ({
  source = 'https://www.freeiconspng.com/uploads/no-image-icon-11.PNG',
  type = 'Tipe Notifikasi',
  productName = 'Nama Product',
  price = 250000,
  penawaran = 0,
  read = false,
  timestamp = '-- -- ----,--:--',
  style = {},
  onPress = () => {},
}) => {
  const notification_type = {
    bid: 'Penawaran Product',
    create: 'Menambahkan Product',
  };
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ];
  const date = new Date(timestamp);
  const displayDate = `${date.getUTCDate()} ${
    month[date.getMonth()]
  }, ${date.toLocaleTimeString()}`;
  return (
    <TouchableOpacity style={[styles.cardContainer, style]} onPress={onPress}>
      <Image source={{uri: source}} style={styles.image} resizeMode="cover" />
      <View style={{width: ms(264)}}>
        <View style={styles.content}>
          <Text style={styles.secondaryText}>{notification_type[type]}</Text>
          <View style={styles.topContent}>
            <Text style={styles.secondaryText}>{displayDate}</Text>
            <View style={!read ? styles.unRead : styles.beRead}></View>
          </View>
        </View>
        <Text style={styles.primaryText}>{productName}</Text>
        {type == 'bid' ? (
          <View>
            <Text
              style={[
                styles.primaryText,
                {textDecorationLine: 'line-through'},
              ]}>
              {NumberFormat(price)}
            </Text>
            <Text style={styles.primaryText}>
              Di tawar {NumberFormat(penawaran)}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Index;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    width: ms(328),
    height: ms(86),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  image: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(12),
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topContent: {
    flexDirection: 'row',
  },
  primaryText: {
    fontSize: ms(14),
    color: '#151515',
    marginBottom: ms(4),
  },
  secondaryText: {
    fontSize: ms(10),
    color: '#8A8A8A',
    marginBottom: ms(4),
  },
  unRead: {
    width: ms(8),
    height: ms(8),
    backgroundColor: '#FA2C5A',
    borderRadius: ms(8),
    marginLeft: ms(8),
  },
  beRead: {
    width: ms(8),
    height: ms(8),
    marginLeft: ms(8),
  },
});
