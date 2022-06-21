import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters'
import { MyFonts } from './src/utils/fonts'


const App = () => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: ms(30), fontFamily: MyFonts.Regular }}>Text Sample</Text>
      <Text style={{ fontSize: ms(30), fontFamily: MyFonts.Bold }}>Text Sample</Text>
      <Text style={{ fontSize: ms(30), fontFamily: MyFonts.Medium }}>Text Sample</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})