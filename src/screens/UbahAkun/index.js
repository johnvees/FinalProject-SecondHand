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
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';
import {ms} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

import {BASE_URL, BASE_URL_DAERAH, MyColors, MyFonts} from '../../utils';
import {Button, Gap} from '../../components';
import UserDefault from '../../assets/images/userDefault.png';
import {getUserDataAction} from './redux/action';

export default UbahAkun = ({navigation}) => {
  const dispatch = useDispatch();
  const {tokenValue} = useSelector(state => state.login);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [id, setId] = useState('');
  const [photo, setPhoto] = useState(UserDefault);
  const [photoForDB, setPhotoForDB] = useState(UserDefault);
  const [userData, setUserData] = useState({
    fullname: '',
    phoneNumber: '',
    address: '',
    city: '',
  });

  const getNamaProvinsi = async () => {
    try {
      const result = await axios.get(`${BASE_URL_DAERAH}/provinsi`);
      setProvinsi(result.data.provinsi);
      console.log(result.data.provinsi);
      const res = await axios.get(`${BASE_URL_DAERAH}/kota?id_provinsi=${id}`);
      setKota(res.data.kota_kabupaten);
      console.log(res.data.kota_kabupaten);
      console.log('ambil nama kota: ', userData.city);
    } catch (error) {
      console.log(error);
    }
  };

  const putUser = async values => {
    try {
      const multiPartBody = new FormData();

      multiPartBody.append('full_name', values.fullname);
      multiPartBody.append('phone_number', values.phoneNumber);
      multiPartBody.append('address', values.address);
      multiPartBody.append('city', value);
      multiPartBody.append('image', {
        uri: photoForDB.uri,
        name: photoForDB.fileName,
        type: photoForDB.type,
      });

      const result = await fetch(`${BASE_URL}/auth/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: tokenValue,
        },
        body: multiPartBody,
      });

      console.log(await result.json());
      console.log(photoForDB);

      if (result.status === 200) {
        console.log('Update Akun success: ', result);
        navigation.replace('Akun');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    // dispatch(getUserDataAction());
    try {
      const result = await axios.get(`${BASE_URL}/auth/user`, {
        headers: {access_token: tokenValue},
      });

      setUserData({
        fullname: result.data.full_name,
        phoneNumber: result.data.phone_number,
        address: result.data.address,
        city: result.data.city,
      });

      if (result.data.image_url === null) {
        setPhoto(UserDefault);
      } else {
        const setUserPhoto = {uri: result.data.image_url};
        setPhoto(setUserPhoto);
      }

      const setUserCity = result.data.city;
      setValue(setUserCity);

      if (result.status === 200) {
        console.log('Get Data Akun success: ', result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getImage = () => {
    launchImageLibrary({includeBase64: true, quality: 0.5}, response => {
      console.log('response :', response);
      console.log('response 2:', response.assets[0]);
      if (response.didCancel === true || response.error === true) {
        Toast.show({
          type: 'error', // error, info
          text1: 'Gagal Memilih Foto',
          // text2: 'isi konten'
        });
      } else {
        const source = {uri: response.assets[0].uri};
        setPhoto(source);
        setPhotoForDB(response.assets[0]);
      }
    });
  };

  useEffect(() => {
    getUser();
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
          <TouchableOpacity onPress={getImage}>
            <Image source={photo} style={styles.userPhoto} />
          </TouchableOpacity>
        </View>

        <Gap height={ms(24)} />

        <Formik
          enableReinitialize={true}
          validationSchema={putAccountValidationSchema}
          initialValues={userData}
          onSubmit={putUser}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
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
                value={values.city}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChangeText={handleChange('city')}
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
  userPhoto: {
    width: ms(36 * 2 + 24),
    height: ms(36 * 2 + 24),
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
    color: MyColors.Neutral.NEUTRAL00,
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
