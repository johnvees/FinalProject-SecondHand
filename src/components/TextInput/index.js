import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {ms} from 'react-native-size-matters';
import Gap from '../Gap';

import Feather from 'react-native-vector-icons/Feather';
import {MyColors} from '../../utils';

export default function Input({
  title,
  secure,
  value,
  onChangeText,
  placeholder,
  style,
  props = {},
  fontSize = 14,
  lineHeight = 20,
}) {
  const [border, setBorder] = useState('#D0D0D0');
  const onFocusForm = () => {
    setBorder('#7126B5');
  };

  const onBlurForm = () => {
    setBorder('#D0D0D0');
  };
  return (
    <View>
      <Text style={styles.text(fontSize, lineHeight)}>{title}</Text>
      <Gap height={ms(4)} />
      <TextInput
        {...props}
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={[styles.input(border), style]}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={MyColors.Neutral.NEUTRAL03}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: border => ({
    borderRadius: ms(10),
    borderWidth: ms(1),
    borderColor: border,
    paddingHorizontal: ms(16),
    paddingVertical: ms(14),
    color: '#8A8A8A',
  }),
  text: (fontSize, lineHeight) => ({
    color: '#000',
    fontSize: ms(fontSize),
    lineHeight: ms(lineHeight),
  }),
});
