import {setUserId} from 'appcenter';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {ms} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BASE_URL} from '../../utils';
import Gap from '../Gap';

const DropdownComponent = ({title}) => {
  const [value, setValue] = useState('1');
  const [isFocus, setIsFocus] = useState(false);
  const [kategori, setKategori] = useState(['1']);

  const getKategori = async name => {
    try {
      const res = await axios.get(`${BASE_URL}/seller/category`);
      setKategori(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   const renderLabel = () => {
  //     if (value || isFocus) {
  //       return (
  //         <Text style={[styles.label, isFocus && {color: 'blue'}]}>{title}</Text>
  //       );
  //     }
  //     return null;
  //   };
  useEffect(() => {
    getKategori();
  }, []);
  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Text style={styles.text}>{title}</Text>
      <Gap height={ms(4)} />
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: '#D0D0D0'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={kategori}
        maxHeight={300}
        labelField="name"
        valueField="value"
        placeholder={!isFocus ? 'Pilih Kategori' : '...'}
        value={kategori}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.name);
          setIsFocus(false);
          console.log(item.id);
          console.log(item.name);
        }}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color={isFocus ? '#7126B5' : '#D0D0D0'}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {},
  dropdown: {
    borderColor: 'red',
    borderWidth: ms(0.5),
    borderRadius: ms(10),
    paddingHorizontal: ms(16),
    paddingVertical: ms(14),
  },
  icon: {
    marginRight: ms(5),
  },
  label: {
    position: 'absolute',
    left: ms(22),
    top: ms(8),
    zIndex: ms(999),
    fontSize: ms(14),
    color: 'red',
  },
  placeholderStyle: {
    fontSize: ms(16),
    color: 'red',
  },
  selectedTextStyle: {
    fontSize: ms(16),
    color: 'red',
  },
  iconStyle: {
    width: ms(20),
    height: ms(20),
  },
  inputSearchStyle: {
    height: ms(40),
    fontSize: ms(30),
    color: 'red',
  },
});
