import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {MyColors} from '../../utils/colors';
import Gap from '../../components/Gap';
import axios from 'axios';

// import images/icons
import IconCamera from '../../assets/images/fi_camera.png';
import IconEdit from '../../assets/images/fi_edit.png';
import IconSetting from '../../assets/images/fi_settings.png';
import IconLogout from '../../assets/images/fi_log-out.png';
import CardLink from '../../components/CardLink';

import Header from '../../components/Header';
import {Button} from '../../components';
import {setToken} from '../Login/redux/action';
import {useEffect, useState} from 'react';
import {setLoading} from '../../redux/globalAction';
import {BASE_URL} from '../../utils';

const Akun = ({navigation}) => {
  const dispatch = useDispatch();
  const [source, setSource] = useState();
  const {tokenValue} = useSelector(state => state.login);
  const logout = () => {
    dispatch(setToken(''));
    console.log('test token baru ', setToken);
    navigation.replace('BottomTab');
  };

  const getUser = async () => {
    // dispatch(getUserDataAction());
    try {
      dispatch(setLoading(true));
      const result = await axios.get(`${BASE_URL}/auth/user`, {
        headers: {access_token: tokenValue},
      });

      setSource(result.data.image_url);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.Container}>
      <Header title={"Akun Saya"} />
      <Gap height={ms(24)} />
      <View style={styles.PictureWrapper}>
        <View style={styles.ProfilePicture}>
          <Image
            source={source ? {uri: source} : IconCamera}
            style={source ? styles.image : styles.iconCamera}
          />
        </View>
      </View>
      <Gap height={ms(16)} />
      <View style={styles.LinkWrapper}>
        <CardLink
          Title={'Ubah Akun'}
          Icon={IconEdit}
          OnPress={() => navigation.navigate('UbahAkun')}
        />
        <CardLink Title={'Pengaturan Akun'} Icon={IconSetting} />
        <CardLink Title={'Keluar'} Icon={IconLogout} OnPress={logout} />
      </View>
      <Gap height={16} />
      <View style={styles.VersionWrapper}>
        <Text style={styles.TextVersion}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

export default Akun;

const styles = StyleSheet.create({
  Container: {
    // backgroundColor: 'red',
    flex: 1,
    padding: ms(16),
  },
  PictureWrapper: {
    // backgroundColor: 'green',
    alignItems: 'center',
  },
  ProfilePicture: {
    width: ms(96),
    height: ms(96),
    backgroundColor: MyColors.Primary.DARKBLUE01,
    borderRadius: ms(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCamera: {
    width: ms(24),
    height: ms(24),
  },
  image: {
    width: ms(36 * 2 + 24),
    height: ms(36 * 2 + 24),
    borderRadius: ms(12),
  },
  VersionWrapper: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextVersion: {
    fontFamily: 'Poppins-Regular',
    color: MyColors.Neutral.NEUTRAL03,
    fontSize: ms(12),
  },
});
