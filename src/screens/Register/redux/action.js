import axios from 'axios';
import Toast from 'react-native-toast-message';

import {BASE_URL} from '../../../utils';
import {setLoading} from '../../../redux/globalAction';
import {navigate} from '../../../utils/helpers/navigate';

export const postRegisterAction = values => async dispatch => {
  try {
    dispatch(setLoading(true));

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

    console.log('all result: ', result);

    if (result.status === 201) {
      dispatch(setRegister(result.data));
      navigate('Login'); // ini nanti tinggal dirubah mau navigasi kemana
    }
  } catch (error) {
    console.log('ini error: ', error);
    Toast.show({
      type: 'error', // error, info
      text1: error.response.data.message,
      // text2: 'isi konten'
    });
  } finally {
    dispatch(setLoading(false));
  }
};

const setRegister = payload => {
  return {
    type: 'SET_POST_REGISTER',
    userDataRegister: payload,
  };
};
