import {setUserId} from 'appcenter';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {ms} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Gap from '../../components/Gap';

const DropdownComponent = ({
  title,
  labelField,
  valueField,
  data,
  value,
  onChange,
  onChangeText,
  placeholder,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Text style={styles.text}>{title}</Text>
      <Gap height={ms(4)} />
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
        selectedStyle={styles.selectedStyle}
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
  selectedStyle: {
    borderRadius: 12,
  },
});
