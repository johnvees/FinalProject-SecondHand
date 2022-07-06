import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {ms} from 'react-native-size-matters';
import Gap from '../Gap';

export default function Input({
  title,
  secure,
  value,
  onChangeText,
  placeholder,
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
      <Text style={styles.text}>{title}</Text>
      <Gap height={ms(4)} />
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
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
  text: {
    color: '#000',
    fontSize: ms(14),
    lineHeight: ms(20),
  },
});
