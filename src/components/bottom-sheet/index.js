import React, {useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ms} from 'react-native-size-matters';

export default function BS({refRBSheet}) {
  // const refRBSheet = useRef();

  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* <TouchableOpacity
        onPress={() => refRBSheet.current.open()}
        style={styles.closeButton}>
        <Text style={styles.textCLose}>Open Bottom Sheet</Text>
      </TouchableOpacity> */}
      <RBSheet
        ref={refRBSheet}
        height={ms(450)}
        closeOnDragDown={true}
        closeOnPressMask={true}
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
              left: ms(27),
              padding: ms(12),
              backgroundColor: 'white',
            }}>
            <Text
              style={{
                textAlign: 'left',
                color: 'black',
                fontSize: ms(16),
                fontWeight: '500',
              }}>
              Yeay kamu berhasil mendapat harga yang sesuai
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: ms(16),
                fontWeight: '400',
                color: '#8A8A8A',
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
                fontSize: ms(16),
                fontWeight: 'bold',
                marginBottom: ms(10),
              }}>
              Product Match
            </Text>
            <View style={styles.infoCard}>
              <View
                style={{
                  width: ms(50),
                  height: ms(50),
                  backgroundColor: 'blue',
                  borderRadius: ms(12),
                  marginRight: ms(5),
                }}></View>
              <View>
                <Text style={styles.textInfo}>Nama Pembeli</Text>
                <Text
                  style={{
                    fontSize: ms(12),
                    fontWeight: '400',
                    color: '#8A8A8A',
                  }}>
                  Kota
                </Text>
              </View>
            </View>
            <View style={styles.infoCard}>
              <View
                style={{
                  width: ms(50),
                  height: ms(50),
                  backgroundColor: 'blue',
                  borderRadius: ms(12),
                  marginRight: ms(5),
                }}></View>
              <View>
                <Text style={styles.textInfo}>Jam Tangan Casio</Text>
                <Text
                  style={{
                    fontSize: ms(14),
                    color: 'black',
                    fontWeight: '400',
                    textDecorationLine: 'line-through',
                  }}>
                  Rp 250.000
                </Text>
                <Text style={styles.textInfo}>Ditawar Rp 200.000</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => refRBSheet.current.close()}
            style={styles.closeButton}>
            <Text style={styles.textCLose}>Close</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    backgroundColor: 'grey',
  },
  itemContainer: {
    flex: 1,
    padding: 6,
  },
  closeButton: {
    width: ms(296),
    height: ms(48),
    padding: ms(12),
    top: ms(40),
    left: ms(38),
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
    width: ms(320),
    height: ms(200),
    top: ms(16),
    left: ms(27),
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

    elevation: 5,
  },
  infoCard: {
    flexDirection: 'row',
    marginBottom: ms(12),
  },
  textInfo: {
    fontSize: ms(14),
    color: 'black',
    fontWeight: '500',
  },
});
