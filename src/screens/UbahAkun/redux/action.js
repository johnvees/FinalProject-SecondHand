import axios from 'axios';
import Toast from 'react-native-toast-message';

import {setLoading} from '../../../redux/globalAction';
import {BASE_URL} from '../../../utils';

export const getUserDataAction = () => async dispatch => {
  try {
    dispatch(setLoading(true));

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
      dispatch(setUserData(result.data));
      console.log('Get Data Akun success: ', result.data);
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

const setUserData = payload => {
  return {
    type: 'SET_GET_USER_DATA',
    getUserData: payload,
  };
};
