import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'

const PrimaryButton = ({ icon, title = '', color = '', onPress, fontStyle, style, disabled}) => {
  return (
    <View style={[styles.addBtnContainer, {backgroundColor: color,}]}>
        <Pressable disabled={disabled} style={[styles.addBtn, style]} android_ripple={{color: "#BDC2C2"}} onPress={disabled ? () =>{} : onPress}>
            {icon ? icon : icon === ''? <></>  : <FontAwesome6 name="add" size={20} color="black" />}
            <Text style={[styles.addBtnText, fontStyle, disabled ? { opacity: 0.4} : {}]}>{title}</Text>
        </Pressable>
    </View>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
    addBtnContainer:{
        overflow: 'hidden', 
        borderRadius: 10, 
        backgroundColor: '#E0E0E0', 
        height: 55, 
        justifyContent: 'center'
    },
    addBtn:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
        padding: 12
    },
    addBtnText:{
        fontSize: 16,
        fontFamily:'nunito-semibold'
    },
})