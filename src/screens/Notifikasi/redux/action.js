import axios from 'axios';
import {BASE_URL} from '../../../utils';

export const readNotification =
  (notif, tokenValue, navigation) => async dispatch => {
    axios.defaults.headers.common['access_token'] = tokenValue;
    axios
      .patch(`${BASE_URL}/notification/${notif.id}`, {
        Headers: {
          access_token: tokenValue,
        },
      })
      .then(response => {
        // console.log(response);
        dispatch(getNotification(tokenValue));
        navigation.navigate('DetailProduct', {id: notif.product_id});
      })
      .catch(err => console.log(err));
  };

export const getNotification = tokenValue => async dispatch => {
  axios.defaults.headers.common['access_token'] = tokenValue;
  axios
    .get(`${BASE_URL}/notification?notification_type=seller`)
    .then(response => {
      console.log(response, 'hai');
      dispatch(
        setNotification(
          response.data.sort((a, b) => {
            if (a.createdAt > b.createdAt) return -1;
            else return 1;
          }),
        ),
      );
    })
    .catch(err => console.log(err));
};

export const setBadgeNumber = payload => {
  let badgeNumber = 0;
  for (let i = 0; i < payload.length; i++) {
    if (payload[i].read == false) {
      badgeNumber++;
    }
  }
  return {
    type: 'SET_BADGE_NUMBER',
    badge: badgeNumber,
  };
};

export const setNotification = payload => {
  return {
    type: 'SET_NOTIFICATION',
    notification: payload,
  };
};
