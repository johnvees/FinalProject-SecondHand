import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {ms} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';

const data = [
  {label: 'Aksesoris', value: '1'},
  {label: 'Cinderamata', value: '2'},
  {label: 'Otomotif', value: '3'},
];

const DropdownComponent = ({title, placeholder}) => {
  const [value, setValue] = useState(null);
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
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: '#D0D0D0'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
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
    height: ms(50),
    borderColor: '#8A8A8A',
    borderWidth: ms(0.5),
    borderRadius: ms(10),
    paddingHorizontal: ms(8),
    backgroundColor: 'white',
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
  },
  placeholderStyle: {
    fontSize: ms(16),
  },
  selectedTextStyle: {
    fontSize: ms(16),
  },
  iconStyle: {
    width: ms(20),
    height: ms(20),
  },
  inputSearchStyle: {
    height: ms(40),
    fontSize: ms(16),
  },
});
