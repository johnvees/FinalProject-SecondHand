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

import {BASE_URL} from './src/utils';

const Home = ({navigation}) => {
  const postLogin = async values => {
    try {
      const body = {
        email: values.email,
        password: values.password,
      };

      const result = await axios.post(`${BASE_URL}/auth/login`, body);

      if (result.status === 201) {
        console.log(result);
        // menambahkan navigation.replace
      }
    } catch (error) {
      console.log(error);
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
        <View style={styles.backButton}></View>
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
                placeholderTextColor={'#8A8A8A'}
                selectionColor={'#7126B5'}
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
                placeholderTextColor={'#8A8A8A'}
                selectionColor={'#7126B5'}
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorInput}>{errors.password}</Text>
              )}
              <TouchableOpacity style={styles.passwordContainer}>
                <View style={styles.eyeButton}></View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonLogin} onPress={handleSubmit}>
              <Text style={styles.buttonLoginTitle}>Masuk</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <View style={styles.secondaryButtonContainer}>
        <TouchableOpacity>
          <Text style={styles.secondaryButtonText}>
            Belum punya akun?{' '}
            <Text style={styles.secondaryButtonTitle}>Daftar di sini</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(16),
    backgroundColor: '#FFFFFF',
  },
  backButtonContainer: {
    marginBottom: ms(40),
  },
  backButton: {
    height: ms(24),
    width: ms(24),
    backgroundColor: '#8A8A8A',
  },
  loginTitle: {
    fontSize: ms(24),
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: ms(24),
  },
  inputContainer: {marginBottom: ms(16), justifyContent: 'center'},
  inputLabel: {
    fontSize: ms(12),
    color: '#000000',
    marginBottom: ms(4),
  },
  textInput: {
    maxHeight: ms(48),
    borderWidth: ms(1),
    borderColor: '#D0D0D0',
    borderRadius: ms(16),
    paddingVertical: ms(14),
    paddingHorizontal: ms(16),
    color: '#000000',
    fontSize: ms(14),
  },
  passwordContainer: {position: 'absolute', right: ms(10)},
  eyeButton: {
    height: ms(24),
    width: ms(24),
    backgroundColor: '#8A8A8A',
  },
  buttonLogin: {
    paddingHorizontal: ms(24),
    paddingVertical: ms(14),
    backgroundColor: '#7126B5',
    borderRadius: ms(16),
  },
  buttonLoginTitle: {
    fontSize: ms(14),
    color: '#FFFFFF',
    fontWeight: '500',
    textAlign: 'center',
  },
  secondaryButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: ms(14),
    color: '#000000',
  },
  secondaryButtonTitle: {
    fontSize: ms(14),
    fontWeight: 'bold',
    color: '#7126B5',
  },
  errorInput: {fontSize: 10, color: 'red'},
});
