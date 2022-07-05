import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';
import {ms} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';

import {
  BASE_URL,
  BASE_URL_DAERAH,
  MyColors,
  MyFonts,
  TEST_TOKEN,
} from '../../utils';
import {Button, Gap} from '../../components';

export default UbahAkun = ({navigation}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [id, setId] = useState('');

  const getNamaProvinsi = async () => {
    try {
      const result = await axios.get(`${BASE_URL_DAERAH}/provinsi`);
      setProvinsi(result.data.provinsi);
      console.log(result.data.provinsi);
      const res = await axios.get(`${BASE_URL_DAERAH}/kota?id_provinsi=${id}`);
      setKota(res.data.kota_kabupaten);
      console.log(res.data.kota_kabupaten);
    } catch (error) {
      console.log(error);
    }
  };

  const putUser = async values => {
    try {
      const body = {
        full_name: values.fullname,
        phone_number: values.phoneNumber,
        address: values.address,
      };

      const result = await axios.put(`${BASE_URL}/auth/user`, body, {
        headers: {access_token: `${TEST_TOKEN}`},
      });

      if (result.status === 200) {
        console.log('Update Akun success: ', result);
        navigation.replace('Akun');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNamaProvinsi();
  }, [id]);

  const putAccountValidationSchema = yup.object().shape({
    fullname: yup.string().required('Nama Lengkap Dibutuhkan'),
    address: yup.string().required('Alamat Dibutuhkan'),
    phoneNumber: yup
      .string()
      .required('Nomor Handphone Dibutuhkan')
      .min(10, 'Nomor Handphone Terlalu Pendek')
      .max(14, 'Nomor Handphone Terlalu Panjang'),
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={MyColors.Neutral.NEUTRAL01}
        barStyle="dark-content"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="arrow-left"
            size={ms(24)}
            color={MyColors.Neutral.NEUTRAL00}
          />
        </TouchableOpacity>

        <Gap height={ms(24)} />

        <View style={styles.imagePickContainer}>
          <TouchableOpacity style={styles.imagePicker}>
            <Feather
              name="camera"
              size={ms(24)}
              color={MyColors.Primary.DARKBLUE04}
            />
          </TouchableOpacity>
        </View>

        <Gap height={ms(24)} />

        <Formik
          validationSchema={putAccountValidationSchema}
          initialValues={{fullname: '', address: '', phoneNumber: ''}}
          onSubmit={putUser}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <Text style={styles.inputLabel}>Nama Lengkap</Text>
              <TextInput
                name="fullname"
                style={styles.textInput}
                placeholder="Nama Lengkap"
                placeholderTextColor={MyColors.Neutral.NEUTRAL03}
                selectionColor={MyColors.Primary.DARKBLUE04}
                value={values.fullname}
                onChangeText={handleChange('fullname')}
                onBlur={handleBlur('fullname')}
              />
              {errors.fullname && touched.fullname && (
                <Text style={styles.errorInput}>{errors.fullname}</Text>
              )}

              <Gap height={ms(16)} />

              <Text style={styles.inputLabel}>Provinsi</Text>
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && {borderColor: MyColors.Primary.DARKBLUE04},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={provinsi}
                search
                maxHeight={300}
                labelField="nama"
                valueField="nama"
                placeholder={!isFocus ? 'Pilih Provinsi' : '...'}
                searchPlaceholder="Search..."
                value={provinsi}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setId(item.id);
                  setValue(item.nama);
                  setIsFocus(false);
                  console.log(item.nama, item.id);
                }}
              />

              <Gap height={ms(16)} />

              <Text style={styles.inputLabel}>Kota</Text>
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && {borderColor: MyColors.Primary.DARKBLUE04},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={kota}
                search
                maxHeight={300}
                labelField="nama"
                valueField="nama"
                placeholder={!isFocus ? 'Pilih Kota' : '...'}
                searchPlaceholder="Search..."
                value={kota}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.nama);
                  setIsFocus(false);
                  console.log(item.nama, item.id);
                }}
              />

              <Gap height={ms(16)} />

              <Text style={styles.inputLabel}>Alamat</Text>
              <TextInput
                multiline={true}
                name="address"
                style={styles.textArea}
                placeholder="Contoh: Jalan Ikan Hiu 33"
                placeholderTextColor={MyColors.Neutral.NEUTRAL03}
                selectionColor={MyColors.Primary.DARKBLUE04}
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
              />
              {errors.address && touched.address && (
                <Text style={styles.errorInput}>{errors.address}</Text>
              )}

              <Gap height={ms(16)} />

              <Text style={styles.inputLabel}>Nomor Handphone</Text>
              <TextInput
                name="phoneNumber"
                style={styles.textInput}
                placeholder="Contoh: 08123456789"
                placeholderTextColor={MyColors.Neutral.NEUTRAL03}
                selectionColor={MyColors.Primary.DARKBLUE04}
                keyboardType="phone-pad"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <Text style={styles.errorInput}>{errors.phoneNumber}</Text>
              )}

              <Gap height={ms(24)} />
              <Button type={'cta'} ctaText={'Simpan'} onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(16),
    backgroundColor: MyColors.Neutral.NEUTRAL01,
  },
  imagePickContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imagePicker: {
    backgroundColor: MyColors.Primary.DARKBLUE01,
    padding: ms(36),
    maxWidth: ms(36 * 2 + 24),
    borderRadius: ms(12),
  },
  loginTitle: {
    fontFamily: MyFonts.Bold,
    fontSize: ms(24),
    color: MyColors.Neutral.NEUTRAL00,
    marginBottom: ms(24),
  },
  inputContainer: {marginBottom: ms(16), justifyContent: 'center'},
  inputLabel: {
    fontFamily: MyFonts.Regular,
    fontSize: ms(12),
    color: MyColors.Neutral.NEUTRAL00,
    marginBottom: ms(4),
  },
  textInput: {
    fontFamily: MyFonts.Regular,
    maxHeight: ms(48),
    borderWidth: ms(1),
    borderColor: MyColors.Neutral.NEUTRAL02,
    borderRadius: ms(16),
    paddingVertical: ms(14),
    paddingHorizontal: ms(16),
    color: MyColors.Neutral.NEUTRAL00,
    fontSize: ms(14),
  },
  errorInput: {fontFamily: MyFonts.Regular, fontSize: 10, color: 'red'},
  textArea: {
    fontFamily: MyFonts.Regular,
    height: ms(80),
    maxHeight: ms(100),
    borderWidth: ms(1),
    borderColor: MyColors.Neutral.NEUTRAL02,
    borderRadius: ms(16),
    paddingVertical: ms(14),
    paddingHorizontal: ms(16),
    color: MyColors.Neutral.NEUTRAL00,
    fontSize: ms(14),
  },
  dropdown: {
    height: ms(48),
    borderColor: MyColors.Neutral.NEUTRAL02,
    borderWidth: ms(1),
    borderRadius: ms(16),
    paddingVertical: ms(14),
    paddingHorizontal: ms(16),
  },
  placeholderStyle: {
    fontFamily: MyFonts.Regular,
    fontSize: ms(14),
  },
  selectedTextStyle: {
    fontFamily: MyFonts.Regular,
    fontSize: ms(14),
  },
  iconStyle: {
    width: ms(24),
    height: ms(24),
  },
  inputSearchStyle: {
    fontFamily: MyFonts.Regular,
    height: ms(40),
    fontSize: ms(14),
  },
});
