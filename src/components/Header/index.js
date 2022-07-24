import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Gap from '../Gap'
import { ms } from 'react-native-size-matters'
import { MyColors, MyFonts } from '../../utils'

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.textHeader}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: ms(16),
  },
  textHeader: {
    fontSize: ms(20),
    fontFamily: MyFonts.Bold,
    color: MyColors.Neutral.NEUTRAL00
  }
})