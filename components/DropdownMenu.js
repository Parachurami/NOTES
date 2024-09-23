import React, { useRef } from 'react';
import { View, Pressable, StyleSheet, Text, Alert } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import PrimaryButton from './PrimaryButton';
import {COLORS} from "../assets/misc/colors";

const DropdownMenu = ({pressHandler,deleteFolder, title}) => {
  const menuRef = useRef(null);

  const handleMenuSelect = () => {
    // Handle menu item selection here
    // Close the menu after selection
    menuRef.current.close();
  };

  const handleBackdropPress = () => {
    // Close the menu when the backdrop is pressed
    menuRef.current.close();
  };

  const handleEditPress = () =>{
    handleBackdropPress();
    pressHandler();
  }

  const deleteHandler = (title) =>{
    Alert.alert(
      'Are You Sure',
      'This action will delete your note permanently',
      [
        {
          text:'Delete',
          onPress: () => deleteFolder(title)
        },
        {
          text:'No Thanks',
          onPress: handleMenuSelect
        }
      ]
    )
  }

  return (
    <View>
      <Pressable onPress={handleBackdropPress}>
        <View>
          <Menu ref={menuRef}>
            <MenuTrigger>
              <Pressable onPress={() => menuRef.current.open()}>
                <SimpleLineIcons name="options-vertical" size={18} color={COLORS.black} />
              </Pressable>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={{borderRadius: 5, width: 120}}>
              <PrimaryButton onPress={deleteHandler.bind(this, title)} title='Delete' icon={<MaterialIcons name='delete' size={18}/>}/>
              <PrimaryButton onPress={handleEditPress} title='Edit' icon={<MaterialIcons name='edit' size={18}/>}/>
            </MenuOptions>
          </Menu>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  menuOption:{
    fontFamily: 'quicksand',
    marginVertical: 5,
    flex: 1,
    padding: 8,
  }
})

export default DropdownMenu;
