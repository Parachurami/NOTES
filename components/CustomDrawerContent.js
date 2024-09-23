import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SearchComponent from './SearchComponent';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import PrimaryButton from './PrimaryButton';
import { FontAwesome6, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import AddFolderModal from './AddFolderModal';
import Divider from './Divider';
import DropdownMenu from './DropdownMenu';
import {COLORS} from "../assets/misc/colors";

const CustomDrawerContent = ({deleteFolder, forceUpdate, folders, addFolder, navigation, screenData, state }) => {
  const [visible, setVisible] = useState(false);
  const [optionVisible, setOptionVisible] = useState(false);
  const pressHandler = () =>{
    forceUpdate()
    setVisible(true);
  }
  const {darkRipple} = COLORS;
  const optionPressHandler = () =>{
    setOptionVisible(true);
  }
    return (
      <ScrollView style={{height: '100%', paddingVertical: 40, backgroundColor:COLORS.white}}>
        <View style={{marginHorizontal: 18, marginBottom: 0, overflow: 'hidden', borderRadius: 5, elevation: 4, backgroundColor: COLORS.white}}>
            <Pressable android_ripple={{color:darkRipple}} style={{flexDirection: 'row', alignItems: 'center', gap: 10, padding: 5}}>
                <View style={{borderRadius: 5, width: 50, height: 50, overflow: 'hidden'}}>
                    <Image resizeMode='cover' style={{width: '100%', height: '100%'}} source={require('../assets/images/charlie-green-3JmfENcL24M-unsplash.jpg')}/>
                </View>
                <Text style={{fontSize: 18, fontFamily:'nunito-semibold'}}>Floyd Lawton</Text>
            </Pressable>
        </View>
        <DrawerContentScrollView style={{flex: 1}}>
          {screenData.filter((screen) => !screen.isFolder).map((screen, index) =>{
            return(
            <DrawerItem
              key={index}
              icon={() => !screen?.icon ? state.index === index ? <FontAwesome6 name='folder' size={24} color={'black'}/> : <FontAwesome6 name='folder' size={24} color={'grey'}/> : state.index === index ? screen.icon : screen.inactiveIcon}
              labelStyle={{fontSize: 18, margin: 0, padding: 0, color: state.index === index ? COLORS.primaryColor : COLORS.black, fontFamily:'quicksand-bold'}}
              label={screen?.title}
              onPress={() => navigation.navigate(screen?.name)}
            />
            )
          })}
          {/* Define more DrawerItems for other screens */}
        </DrawerContentScrollView>
        <Divider/>
        <DrawerContentScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          {screenData.filter((screen) => screen.isFolder === true)?.map((screen, index) =>{
            return(
              <View key={index} style={styles.folderItem}>
                <DrawerItem
                  style={{flex: 1}}
                  icon={() => <FontAwesome6 name='folder' size={24} color={ state.index === screenData?.indexOf(screen) ?COLORS.alternateColor:COLORS.black}/>}
                  labelStyle={{fontSize: 18, margin: 0, padding: 0, color: state.index === screenData?.indexOf(screen) ? COLORS.alternateColor : COLORS.black, fontFamily:'nunito-bold'}}
                  label={screen.title}
                  onPress={() => navigation.navigate(screen.name)}
                />
                <DropdownMenu pressHandler={pressHandler} title={screen.title} deleteFolder={deleteFolder} color={'white'} size={18}/>
              </View>
            )
          })}
        </DrawerContentScrollView>
        <View style={{paddingHorizontal: 15, marginVertical: 20}}>
            <PrimaryButton onPress={pressHandler} title='Add new folder' color='#F5F5F5'/>
        </View>
        <View style={{paddingHorizontal: 15}}>
            <PrimaryButton title='Settings' color='#F5F5F5' icon={<Ionicons name='settings-outline' size={24} color={'black'}/>}/>
        </View>
        <AddFolderModal forceUpdate={forceUpdate} folders={folders} addFolder={addFolder} setVisible={setVisible} visible={visible}/>
      </ScrollView>
    );
  };

export default CustomDrawerContent

const styles = StyleSheet.create({
  folderItem:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8
  }
})