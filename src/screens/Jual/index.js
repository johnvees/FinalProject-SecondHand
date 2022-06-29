import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Input from '../../components/TextInput';
import {Formik} from 'formik';

const Jual = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        price: '',
        category: '',
        description: '',
        pict: '',
      }}>
      <SafeAreaView>
        <View>
          <Text>Nama Produk</Text>
          <Input placeholder={'Nama Produk'} />
        </View>
        <View>
          <Text>Harga Produk</Text>
          <Input placeholder={'Harga Produk'} />
        </View>
      </SafeAreaView>
    </Formik>
  );
};

export default Jual;

const styles = StyleSheet.create({});
