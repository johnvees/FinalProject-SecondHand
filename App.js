import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters'
import { MyFonts } from './src/utils/fonts'


const App = () => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: ms(30), fontFamily: MyFonts.Regular }}>Test Fonts</Text>
      <Text style={{ fontSize: ms(30), fontFamily: MyFonts.Bold }}>Test Fonts</Text>
      <Text style={{ fontSize: ms(30), fontFamily: MyFonts.Medium }}>Test Fonts</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})