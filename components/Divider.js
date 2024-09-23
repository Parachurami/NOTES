import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Divider = ({margin}) => {
  return (
    <View style={[styles.divider, {marginVertical: margin}]}></View>
  )
}

const styles = StyleSheet.create({
    divider:{
        borderWidth: 0.7,
        borderColor: 'white',
        justifyContent: 'flex-start',
        marginHorizontal: 20,
        marginVertical: 20,
        borderStyle: 'dashed',
      }
});

export default Divider