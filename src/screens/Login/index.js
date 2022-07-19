import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

import {
  BASE_URL,
  MyColors,
  MyFonts,
  useTogglePasswordVisibility,
} from '../../utils';
import {Button} from '../../components';

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  const postLogin = async values => {
    try {
      const body = {
        email: values.email,
        password: values.password,
      };

      dispatch({type: 'SET_LOADING', value: true});
      const result = await axios.post(`${BASE_URL}/auth/login`, body);

      if (result.status === 201) {
        console.log(result);
        dispatch({type: 'SET_LOADING', value: false});
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
      dispatch({type: 'SET_LOADING', value: false});
      Toast.show({
        type: 'error', // error, info
        text1: error.response.data.message,
        // text2: 'isi konten'
      });
    }
  };

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
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

      <Text style={styles.loginTitle}>Masuk</Text>

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={postLogin}>
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
            <Button type={'cta'} ctaText={'Masuk'} onPress={handleSubmit} />
          </>
        )}
      </Formik>

      <View style={styles.secondaryButtonContainer}>
        <Button
          type={'ghost'}
          ghostPrimaryText={'Belum punya akun? '}
          ghostSecondaryText={'Daftar di sini'}
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
