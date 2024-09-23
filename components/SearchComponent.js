import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
import {COLORS} from "../assets/misc/colors";

const SearchComponent = ({onChangeText}) => {
  return (
    <View style={{marginHorizontal: 0, borderRadius: 5, backgroundColor:COLORS.halfWhite, flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <Feather style={{marginLeft: 10}} name='search' size={20} color={'grey'}/>
        <TextInput style={{padding: 8, fontFamily:'quicksand', flex: 1}} placeholder='Search notes'onChangeText={onChangeText}/>
    </View>
  )
}

export default SearchComponent

const styles = StyleSheet.create({})