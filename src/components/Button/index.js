import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ms} from 'react-native-size-matters';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const Button = ({
  type,
  style,
  onPress,
  active,
  disabled,
  outline,
  iconName,
  iconColor,
  iconSize,
  filterText,
  ctaText,
  ghostPrimaryText,
  ghostSecondaryText,
}) => {
  if (type === 'iconOnly') {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <Feather name={iconName} size={iconSize} color={iconColor} />
      </TouchableOpacity>
    );
  } else if (type === 'ctaFilter') {
    return (
      <TouchableOpacity style={styles.filterButton(active)} onPress={onPress}>
        <Feather
          name={iconName}
          size={ms(20)}
          color={active ? '#FFF' : '#000'}
        />
        <Text style={styles.textButton(active)}>{filterText}</Text>
      </TouchableOpacity>
    );
  } else if (type === 'cta') {
    return (
      <TouchableOpacity style={styles.ctaButton(disabled)} onPress={onPress}>
        <Text style={styles.ctaText}>{ctaText}</Text>
      </TouchableOpacity>
    );
  } else if (type === 'ctaWithIcon') {
    return (
      <TouchableOpacity style={styles.ctaButton(disabled)} onPress={onPress}>
        <Text style={styles.ctaText}>{ctaText}</Text>
        <FontAwesome name="whatsapp" size={ms(16)} color="#FFF" />
      </TouchableOpacity>
    );
  } else if (type === 'ctaDisabled') {
    return (
      <View style={styles.ctaButton(disabled)}>
        <Text style={styles.ctaText}>{ctaText}</Text>
      </View>
    );
  } else if (type === 'ctaHalf') {
    return (
      <TouchableOpacity style={styles.ctaHalfButton(outline)} onPress={onPress}>
        <Text style={styles.ctaHalfText(outline)}>{ctaText}</Text>
      </TouchableOpacity>
    );
  } else if (type === 'ctaHalfCircular') {
    return (
      <TouchableOpacity
        style={styles.ctaHalfCircularButton(outline)}
        onPress={onPress}>
        <Text style={styles.ctaHalfCircularText(outline)}>{ctaText}</Text>
      </TouchableOpacity>
    );
  } else if (type === 'ctaHalfCircularWithIcon') {
    return (
      <TouchableOpacity
        style={styles.ctaHalfCircularButton(outline)}
        onPress={onPress}>
        <Text style={styles.ctaHalfCircularText(outline)}>{ctaText}</Text>
        <FontAwesome name="whatsapp" size={ms(16)} color="#FFF" />
      </TouchableOpacity>
    );
  } else if (type === 'edit') {
    return (
      <TouchableOpacity style={styles.editButton} onPress={onPress}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    );
  } else if (type === 'ghost') {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.ghostPrimaryText}>
          {ghostPrimaryText}
          <Text style={styles.ghostSecondaryText}>{ghostSecondaryText}</Text>
        </Text>
      </TouchableOpacity>
    );
  }
};

export default Button;

const styles = StyleSheet.create({
  filterButton: active => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: active ? '#7126B5' : '#E2D4F0',
    paddingHorizontal: ms(16),
    paddingVertical: ms(12),
    borderRadius: ms(12),
  }),
  textButton: active => ({
    marginStart: ms(8),
    color: active ? '#FFF' : '#000',
    fontSize: ms(14),
  }),
  ctaButton: disabled => ({
    paddingHorizontal: ms(24),
    paddingVertical: ms(14),
    backgroundColor: disabled ? '#D0D0D0' : '#7126B5',
    borderRadius: ms(16),
    flexDirection: 'row',
    alignItems: 'center',
  }),
  ctaText: {
    fontSize: ms(14),
    color: '#FFF',
    textAlign: 'center',
    flex: 1,
    alignItems: 'center',
  },
  ctaHalfButton: outline => ({
    paddingHorizontal: ms(24),
    paddingVertical: ms(14),
    backgroundColor: outline ? '#FFF' : '#7126B5',
    borderRadius: ms(16),
    borderWidth: outline ? ms(1) : ms(0),
    borderColor: '#7126B5',
    flex: 1,
  }),
  ctaHalfText: outline => ({
    fontSize: ms(14),
    color: outline ? '#000' : '#FFF',
    textAlign: 'center',
  }),
  ctaHalfCircularButton: outline => ({
    paddingHorizontal: ms(24),
    paddingVertical: ms(8),
    backgroundColor: outline ? '#FFF' : '#7126B5',
    borderRadius: ms(16),
    borderWidth: outline ? ms(1) : ms(0),
    borderColor: '#7126B5',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  ctaHalfCircularText: outline => ({
    fontSize: ms(14),
    color: outline ? '#000' : '#FFF',
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
  }),
  editButton: {
    paddingHorizontal: ms(12),
    paddingVertical: ms(4),
    backgroundColor: '#FFF',
    borderRadius: ms(8),
    borderWidth: ms(1),
    borderColor: '#7126B5',
  },
  editText: {
    fontSize: ms(12),
    color: '#000',
    textAlign: 'center',
  },
  ghostPrimaryText: {
    fontSize: ms(14),
    color: '#000',
  },
  ghostSecondaryText: {
    fontSize: ms(14),
    color: '#7126B5',
    fontWeight: 'bold',
  },
});
