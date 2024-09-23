import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'

const FloatingAddButton = ({color, onPress, icon, style={}}) => {
    return (
        <View style={[styles.addBtnContainer, {backgroundColor: color,}]}>
            <Pressable style={[styles.addBtn, style]} android_ripple={{color: "#C2C2C2"}} onPress={onPress}>
                {icon ? icon : icon === ''? <></>  : <FontAwesome6 name="add" size={24} color="white" />}
            </Pressable>
        </View>
      )
    }
    
    export default FloatingAddButton
    
    const styles = StyleSheet.create({
        addBtnContainer:{
            overflow: 'hidden',
            borderRadius: 20, 
            // backgroundColor: '#4B4B4B',
            justifyContent: 'center',
            alignItems: 'center',
            position:'absolute',
            bottom: 30,
            right: 30,
            elevation: 1
        },
        addBtn:{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            flex: 1,
            padding: 20
        },
        addBtnText:{
            fontSize: 16,
            fontFamily:'nunito-semibold'
        },
    })