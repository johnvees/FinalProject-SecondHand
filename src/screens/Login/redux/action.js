import axios from 'axios';
import Toast from 'react-native-toast-message';

import {BASE_URL} from '../../../utils';
import {setLoading} from '../../../redux/globalAction';

export const postLoginAction = values => async dispatch => {
  try {
    dispatch(setLoading(true));

    const body = {
      email: values.email,
      password: values.password,
    };

    const result = await axios.post(`${BASE_URL}/auth/login`, body);

    console.log('all result: ', result);

    if (result.status === 201) {
      dispatch(setLogin(result.data));
      dispatch(setToken(result.data.access_token));
      navigation.goBack(); // ini nanti tinggal dirubah mau navigasi kemana
    }
  } catch (error) {
    console.log('ini error', error);
    Toast.show({
      type: 'error', // error, info
      text1: error.response.data.message,
      // text2: 'isi konten'
    });
  } finally {
    dispatch(setLoading(false));
  }
};

const setLogin = payload => {
  return {
    type: 'SET_POST_LOGIN',
    userDataLogin: payload,
  };
};

export const setToken = payload => {
  return {
    type: 'SET_TOKEN',
    token: payload,
  };
};
