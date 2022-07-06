import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Input from '../../components/TextInput';
import DropdownComponent from '../../components/DropDownBar';
import {Formik} from 'formik';
import {NumberFormat} from '../../components';
import Gap from '../../components/Gap';
import {ms} from 'react-native-size-matters';

const Jual = () => {
  const nominal = values => {
    return <NumberFormat number={values.number} />;
  };
  return (
    <SafeAreaView>
      <Formik initialValues={{name: ''}}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <View>
              <Input title={'Nama Produk'} placeholder={'Nama Produk'} />
            </View>
            <View>
              <Input
                placeholder={'Harga Produk'}
                title={'Harga Produk'}
                value={values.number}
              />
            </View>
            <View>
              <DropdownComponent title={'Kategori'} />
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Jual;

const styles = StyleSheet.create({});
