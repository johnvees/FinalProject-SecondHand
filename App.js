import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Input from './src/components/TextInput'
import Gap from './src/components/Gap'
import { ms } from 'react-native-size-matters'

const App = () => {
  return (
    <View style={{ paddingHorizontal: ms(16) }}>
      <Input title={"Email"} placeholder={"Contoh: johndee@gmail.com"} />
      <Gap height={ms(16)} />
      <Input secure={true} title={"Password"} placeholder={"Masukkan password"} />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})