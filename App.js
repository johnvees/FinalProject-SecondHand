import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MyColors } from './src/Assets/Colors'
import { ms } from 'react-native-size-matters'

const App = () => {
  return (
    <View>
      <Text style={{ color: MyColors.Primary.DARKBLUE04, fontSize: ms(40) }}>Test Color</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})