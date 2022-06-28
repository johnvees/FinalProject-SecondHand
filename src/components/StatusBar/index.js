import {StatusBar} from 'react-native';
import React from 'react';

export default function index({barStyle, backgroundColor}) {
  return <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />;
}
