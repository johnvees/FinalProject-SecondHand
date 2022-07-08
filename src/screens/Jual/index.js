import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Input from '../../components/TextInput';
import DropdownComponent from './dropbar';
import {Formik} from 'formik';
import {NumberFormat} from '../../components';
import Gap from '../../components/Gap';
import {launchImageLibrary} from 'react-native-image-picker';
import Button from '../../components/Button/index';
import {ms} from 'react-native-size-matters';
import {BASE_URL, MyColors} from '../../utils';
import axios from 'axios';
import * as yup from 'yup';

const Jual = () => {
  const [value, setValue] = useState('1');
  const [pict, setPict] = useState(null);
  const [kategori, setKategori] = useState([]);

  const getKategori = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/seller/category`);
      setKategori(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, res => {
      console.log('response :', res);
      if (res.didCancel === true || res.error === true) {
        console.log('Error :');
      } else {
        const data = res.assets[0];
        setPict(data);
      }
    });
  };
  const onSubmit = async values => {
    // const formdata = new FormData();
    // formdata.append('name', values.name);
    // formdata.append('description', values.description);
    // formdata.append('base_price', values.base_price);
    // formdata.append('category_ids', values.category_ids.toString());
    // formdata.append('location', values.location);
    try {
      const body = {
        id: values.id,
        name: values.name,
        description: values.description,
        base_price: values.price,
        image_url:
          'https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media',
        image_name: 'PR-1654962957757-sepatu.jpg',
        location: 'Bandung',
      };

      const res = await axios.post(`${BASE_URL}/seller/product`, body);
      navigation.goBack();
    } catch (error) {
      console.log(error);
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
    category_ids: yup.array().required('categoryAlertRequired'),
    location: yup.string().trim().required(),
    image: yup.object().shape({
      height: yup.string().required('Foto diperlukan'),
      width: yup.string().required('Foto diperlukan'),
      type: yup.string().required('Foto diperlukan'),
      fileName: yup.string().required('Foto diperlukan'),
      fileSize: yup.string().required('Foto diperlukan'),
      uri: yup.string().required('Foto diperlukan'),
    }),
  });
  useEffect(() => {
    getKategori();
  }, []);
  return (
    <SafeAreaView style={{marginHorizontal: ms(16), marginVertical: ms(16)}}>
      <StatusBar
        backgroundColor={MyColors.Neutral.NEUTRAL01}
        barStyle="dark-content"
      />
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: '',
          base_price: '',
          category_ids: '',
          description: '',
          location: '',
          image: '',
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <View>
              <Input
                name="name"
                title={'Nama Produk'}
                placeholder={'Nama Produk'}
                value={values.name}
                onChangeText={handleChange('name')}
              />
            </View>
            <Gap height={ms(14)} />
            <View>
              <Input
                name="price"
                placeholder={'Rp 0,00'}
                title={'Harga Produk'}
                value={values.base_price}
                onChangeText={handleChange('price')}
              />
            </View>
            <Gap height={ms(14)} />
            <View>
              <DropdownComponent
                data={kategori}
                value={values.category_ids}
                title={'Kategori'}
                labelField="name"
                valueField="id"
                onChange={item => {
                  setValue(item.name);

                  console.log(item.id);
                  console.log(item.name);
                }}
              />
            </View>
            <Gap height={ms(14)} />
            <View>
              <Input
                name="description"
                placeholder={'Contoh: Jalan Ikan Hiu 33'}
                title={'Deskripsi'}
                value={values.description}
                style={{height: ms(100)}}
                onChangeText={handleChange('description')}
              />
            </View>
            <Gap height={ms(14)} />
            <Text style={{fontSize: ms(14), color: '#000'}}>Foto Produk</Text>
            <Gap height={ms(4)} />
            <View>
              {pict != null && (
                <Image
                  source={{uri: values.image}}
                  style={{
                    height: ms(96),
                    width: ms(96),
                    position: 'absolute',
                    borderRadius: ms(12),
                  }}
                />
              )}

              <TouchableOpacity
                onPress={openGallery}
                style={{
                  height: ms(96),
                  width: ms(96),
                  borderWidth: ms(2),
                  borderRadius: ms(12),
                  justifyContent: 'center',
                  borderStyle: 'dashed',
                  borderColor: '#D0D0D0',
                }}>
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
              <Button outline type={'ctaHalf'} ctaText={'Preview'} />
              <View style={{marginLeft: ms(16)}}></View>
              <Button
                type={'ctaHalf'}
                ctaText={'Terbitkan'}
                onPress={onSubmit}
              />
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Jual;

const styles = StyleSheet.create({});
