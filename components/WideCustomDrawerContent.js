import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SearchComponent from './SearchComponent';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import PrimaryButton from './PrimaryButton';
import { FontAwesome6, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import AddFolderModal from './AddFolderModal';
import Divider from './Divider';

const WideCustomDrawerContent = ({forceUpdate, folders, addFolder, navigation, screenData, state }) => {
  const [visible, setVisible] = useState(false);
  const pressHandler = () =>{
    forceUpdate();
    setVisible(true);
  }
    return (
        <View style={{height: '100%', paddingVertical: 40}}>
          <View style={{marginHorizontal: 18, marginBottom: 30, overflow: 'hidden', borderRadius: 5, elevation: 1, backgroundColor: '#F5F5F5'}}>
              <Pressable android_ripple={{color:'#EBEBEB'}} style={{flexDirection: 'row', alignItems: 'center', gap: 10, padding: 5}}>
                  <View style={{borderRadius: 5, width: 50, height: 50, overflow: 'hidden'}}>
                      <Image resizeMode='cover' style={{width: '100%', height: '100%'}} source={require('../assets/images/charlie-green-3JmfENcL24M-unsplash.jpg')}/>
                  </View>
                  <Text style={{fontSize: 18, fontFamily:'nunito-semibold'}}>Floyd Lawton</Text>
              </Pressable>
          </View>
          <SearchComponent/>
          <DrawerContentScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            {screenData.filter((screen) => !screen.isFolder).map((screen, index) =>{
              return(
              <DrawerItem
                key={index}
                icon={() => !screen.icon ? state.index === index ? <FontAwesome6 name='folder' size={24} color={'black'}/> : <FontAwesome6 name='folder' size={24} color={'grey'}/> : state.index === index ? screen.icon : screen.inactiveIcon}
                labelStyle={{fontSize: 18, margin: 0, padding: 0, color: state.index === index ? 'black' : 'grey', fontFamily:'nunito-bold'}}
                label={screen.title}
                onPress={() => navigation.navigate(screen.name)}
              />
              )
            })}
          </DrawerContentScrollView>
          <Divider margin={1}/>
          <DrawerContentScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            {screenData.filter((screen) => screen.isFolder === true)?.map((screen, index) =>{
              return(
                <View key={index} style={styles.folderItem}>
                  <DrawerItem
                    style={{flex: 1}}
                    icon={() => <FontAwesome6 name='folder' size={24} color={ state.index === screenData?.indexOf(screen) ?'black':'grey'}/>}
                    labelStyle={{fontSize: 18, margin: 0, padding: 0, color: state.index === screenData?.indexOf(screen) ? 'black' : 'grey', fontFamily:'nunito-bold'}}
                    label={screen.title}
                    onPress={() => navigation.navigate(screen.name)}
                  />
                  <Pressable style={{marginRight: 20}}>
                    <SimpleLineIcons size={20} name='options' color={state.index === screenData?.indexOf(screen) ? 'black' : 'grey'}/>
                  </Pressable>
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
        </View>
      );
}

export default WideCustomDrawerContent

const styles = StyleSheet.create({
  folderItem:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  }
})