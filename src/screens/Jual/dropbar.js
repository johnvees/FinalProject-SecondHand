import {setUserId} from 'appcenter';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {ms} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BASE_URL} from '../../utils';
import Gap from '../../components/Gap';

const DropdownComponent = ({
  title,
  labelField,
  valueField,
  data,
  value,
  onChange,
  onChangeText,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  //   const renderLabel = () => {
  //     if (value || isFocus) {
  //       return (
  //         <Text style={[styles.label, isFocus && {color: 'blue'}]}>{title}</Text>
  //       );
  //     }
  //     return null;
  //   };

  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Text style={styles.text}>{title}</Text>
      <Gap height={ms(4)} />
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: '#7126B5'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField={labelField}
        valueField={valueField}
        placeholder={'Pilih Kategori'}
        value={value}
        showsVerticalScrollIndicator={false}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChangeText={onChangeText}
        onChange={onChange}
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
    borderWidth: ms(1),
    borderRadius: ms(10),
    paddingHorizontal: ms(16),
    paddingVertical: ms(12),
    borderColor: '#D0D0D0',
  },
  icon: {
    marginRight: ms(5),
  },

  placeholderStyle: {
    fontSize: ms(16),
  },
  selectedTextStyle: {
    fontSize: ms(16),
  },

  text: {
    fontSize: ms(14),
    color: '#000',
  },
});
