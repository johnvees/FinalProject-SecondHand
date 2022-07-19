import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters'
import { MyColors } from '../../utils/colors';
import Gap from '../../components/Gap'

// import images/icons
import IconCamera from '../../assets/images/fi_camera.png'
import IconEdit from '../../assets/images/fi_edit.png'
import IconSetting from '../../assets/images/fi_settings.png'
import IconLogout from '../../assets/images/fi_log-out.png'
import CardLink from '../../components/CardLink';

import { Button } from '../../components';
import Header from '../../components/Header';

const Akun = ({ navigation }) => {
  return (
    <View style={styles.Container}>
      <Header title={"Akun Saya"} />
      <Gap height={ms(24)} />
      <View style={styles.PictureWrapper}>
        <View style={styles.ProfilePicture}>
          <Image source={IconCamera} style={styles.iconCamera} />
        </View>
      </View>
      <Gap height={ms(16)} />
      <View style={styles.LinkWrapper}>
        <CardLink Title={"Ubah Akun"} OnPress={() => navigation.navigate("UbahAkun")} Icon={IconEdit} />
        <CardLink Title={"Pengaturan Akun"} Icon={IconSetting} />
        <CardLink Title={"Keluar"} Icon={IconLogout} />
      </View>
      <Gap height={16} />
      <View style={styles.VersionWrapper}>
        <Text style={styles.TextVersion}>
          Version 1.0.0
        </Text>
      </View>
    </View>
  );
};

export default Akun;

const styles = StyleSheet.create({
  Container: {
    // backgroundColor: 'red',
    flex: 1,
    padding: ms(16)
  },
  PictureWrapper: {
    // backgroundColor: 'green',
    alignItems: 'center'
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
    height: ms(24)
  },
  VersionWrapper: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextVersion: {
    fontFamily: 'Poppins-Regular',
    color: MyColors.Neutral.NEUTRAL03,
    fontSize: ms(12)
  }
});
