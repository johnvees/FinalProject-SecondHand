import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Input from '../../components/TextInput';
import DropdownComponent from './dropbar';
import {Formik} from 'formik';
import Gap from '../../components/Gap';
import {launchImageLibrary} from 'react-native-image-picker';
import Button from '../../components/Button/index';
import {ms} from 'react-native-size-matters';
import {BASE_URL, MyColors, MyFonts} from '../../utils';
import axios from 'axios';
import * as yup from 'yup';
import {TEST_TOKEN} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/globalAction';
import {getNotification, setBadgeNumber} from '../Notifikasi/redux/action';
import {useMemo} from 'react';

const Jual = ({navigation}) => {
  const [value, setValue] = useState([]);
  const [pict, setPict] = useState(null);
  const [pictDB, setPictDB] = useState(null);
  const [kategori, setKategori] = useState([0]);
  const {tokenValue, userData} = useSelector(state => state.login);
  const {notification} = useSelector(state => state.notification);
  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(setBadgeNumber(notification));
  }, [notification]);

  const getKategori = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/seller/category`);
      setKategori(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openGallery = async values => {
    await launchImageLibrary({mediaType: 'photo', quality: 1}, res => {
      console.log('response :', res);
      if (res.didCancel || res.error) {
        console.log('Cancel a Pict');
      } else {
        const data = res.assets[0].uri;
        setPict(data);
        values.image_url = data;
        setPictDB(res.assets[0]);
      }
    });
  };
  const onSubmit = async values => {
    try {
      dispatch(setLoading(true));
      const formdata = new FormData();
      formdata.append('name', values.name);
      formdata.append('description', values.description);
      formdata.append('base_price', values.base_price);
      formdata.append('category_ids', value.toString());
      formdata.append('location', 'Bandung');
      formdata.append('image', {
        uri: pictDB.uri,
        type: pictDB.type,
        name: pictDB.fileName,
      });

      const res = await fetch(
        'https://market-final-project.herokuapp.com/seller/product',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            access_token: `${tokenValue}`,
          },
          body: formdata,
        },
      );
      console.log(values.name);
      console.log(value);
      const data = await res.json();
      console.log(data);
      console.log(res.status);
      if (res.status >= 200) {
        dispatch(getNotification(tokenValue));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(4, 'Minimal 4 Character')
      .max(25, 'Maksimal 25 Character')
      .required('Nama Produk Diperlukan'),
    description: yup
      .string()
      .trim()
      .min(4, 'Minimal 4 Character')
      .max(25, 'Maksimal 25 Character')
      .required('Deskripsi Diperlukan'),
    base_price: yup
      .number()
      .typeError('price Alert Number')
      .required('price Alert Required'),
  });
  useEffect(() => {
    getKategori();
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <StatusBar
        backgroundColor={MyColors.Neutral.NEUTRAL01}
        barStyle="dark-content"
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: ms(14),
          fontWeight: '500',
          color: MyColors.Neutral.NEUTRAL00,
        }}>
        Lengkapi Datail Produk
      </Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: '',
          base_price: '',
          category_ids: '',
          Categories: '',
          description: '',
          location: '',
          User: {
            full_name: userData.name,
          },
          image_url: '',
        }}
        onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <ScrollView
              style={{marginVertical: ms(8), marginHorizontal: ms(13)}}
              showsVerticalScrollIndicator={false}>
              <View>
                <Input
                  name="name"
                  title={'Nama Produk'}
                  placeholder={'Nama Produk'}
                  value={values.name}
                  onChangeText={handleChange('name')}
                />
                {errors.name && touched.name && (
                  <Text style={styles.errorInput}>{errors.name}</Text>
                )}
              </View>
              <Gap height={ms(14)} />
              <View>
                <Input
                  name="price"
                  placeholder={'Rp 0,00'}
                  title={'Harga Produk'}
                  value={values.base_price}
                  onChangeText={handleChange('base_price')}
                />
                {errors.base_price && touched.base_price && (
                  <Text style={styles.errorInput}>{errors.base_price}</Text>
                )}
              </View>
              <Gap height={ms(14)} />
              <View>
                <DropdownComponent
                  data={kategori}
                  value={value}
                  title={'Kategori'}
                  labelField="name"
                  valueField="id"
                  onChange={item => {
                    setValue(item);
                    values.category_ids = item;
                    values.Categories = [];
                    for (let i = 0; i < item.length; i++)
                      values.Categories[i] = {
                        id: item[i],
                        name: kategori[kategori.findIndex(c => c.id == item[i])]
                          .name,
                      };
                  }}
                />
              </View>
              <Gap height={ms(14)} />
              <View>
                <Input
                  name="description"
                  placeholder={'Contoh: Jalan Ikan Hiu 33'}
                  title={'Deskripsi'}
                  value={[values.description]}
                  style={{height: ms(100)}}
                  onChangeText={handleChange('description')}
                />
                {errors.description && touched.description && (
                  <Text style={styles.errorInput}>{errors.description}</Text>
                )}
              </View>
              <Gap height={ms(14)} />
              <Text style={{fontSize: ms(14), color: '#000'}}>Foto Produk</Text>
              <Gap height={ms(4)} />
              <View>
                <TouchableOpacity
                  onPress={() => openGallery(values)}
                  style={{
                    height: ms(96),
                    width: ms(96),
                    borderWidth: ms(1),
                    borderRadius: ms(12),
                    justifyContent: 'center',
                    borderStyle: 'dashed',
                    borderColor: '#D0D0D0',
                  }}>
                  <Image
                    source={{uri: pict}}
                    style={{
                      height: ms(96),
                      width: ms(96),
                      position: 'absolute',
                      zIndex: 5,
                      borderRadius: ms(12),
                    }}
                  />
                  <Text
                    style={{
                      fontSize: ms(50),
                      textAlign: 'center',
                      color: '#D0D0D0',
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              <Gap height={ms(16)} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Button
                  outline
                  type={'ctaHalf'}
                  ctaText={'Preview'}
                  onPress={() => {
                    console.log(values, 'values');
                    navigation.navigate('DetailProduct', {
                      type: 'preview',
                      product: values,
                    });
                  }}
                />
                <View style={{marginLeft: ms(16)}}></View>
                <Button
                  type={'ctaHalf'}
                  ctaText={'Terbitkan'}
                  onPress={handleSubmit}
                />
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Jual;

const styles = StyleSheet.create({
  errorInput: {fontFamily: MyFonts.Regular, fontSize: 10, color: 'red'},
});
