import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import store from './src/redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <View>
        <Text>App</Text>
      </View>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})