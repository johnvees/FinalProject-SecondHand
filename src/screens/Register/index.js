import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';
import Feather from 'react-native-vector-icons/Feather';

import {
  BASE_URL,
  MyColors,
  MyFonts,
  useTogglePasswordVisibility,
} from '../../utils';
import {Button} from '../../components';

const Register = ({navigation}) => {
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  const postRegister = async values => {
    try {
      const body = {
        full_name: values.fullname,
        email: values.email,
        password: values.password,
        phone_number: 'null',
        address: 'null',
        image: null,
        city: 'null',
      };

      const result = await axios.post(`${BASE_URL}/auth/register`, body);

      if (result.status === 201) {
        console.log('register success: ', result);
        navigation.goBack();
      }
    } catch (error) {
      console.log('register error: ', error);
    }
  };

  const registerValidationSchema = yup.object().shape({
    fullname: yup.string().required('Full name is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Password must have a special character',
      )
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => navigation.goBack()}>
        <Feather
          name="arrow-left"
          size={ms(24)}
          color={MyColors.Neutral.NEUTRAL00}
        />
      </TouchableOpacity>

      <Text style={styles.loginTitle}>Daftar</Text>

      <Formik
        validationSchema={registerValidationSchema}
        initialValues={{fullname: '', email: '', password: ''}}
        onSubmit={postRegister}>
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
            <View style={styles.inputContainer}>
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
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                name="email"
                style={styles.textInput}
                placeholder="Contoh: johndoe@gmail.com"
                placeholderTextColor={MyColors.Neutral.NEUTRAL03}
                selectionColor={MyColors.Primary.DARKBLUE04}
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorInput}>{errors.email}</Text>
              )}
            </View>

            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                name="password"
                style={styles.textInput}
                placeholder="Masukkan password"
                placeholderTextColor={MyColors.Neutral.NEUTRAL03}
                selectionColor={MyColors.Primary.DARKBLUE04}
                secureTextEntry={passwordVisibility}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorInput}>{errors.password}</Text>
              )}
              <Button
                type={'iconOnly'}
                iconName={rightIcon}
                iconSize={ms(24)}
                iconColor={MyColors.Neutral.NEUTRAL03}
                onPress={handlePasswordVisibility}
                style={styles.passwordContainer}
              />
            </View>

            <Button type={'cta'} ctaText={'Daftar'} onPress={handleSubmit} />
          </>
        )}
      </Formik>

      <View style={styles.secondaryButtonContainer}>
        <Button
          type={'ghost'}
          ghostPrimaryText={'Sudah punya akun? '}
          ghostSecondaryText={'Masuk di sini'}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(16),
    backgroundColor: MyColors.Neutral.NEUTRAL01,
  },
  backButtonContainer: {
    marginBottom: ms(40),
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
  passwordContainer: {position: 'absolute', right: ms(10), top: ms(12)},
  secondaryButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  errorInput: {fontFamily: MyFonts.Regular, fontSize: 10, color: 'red'},
});
