import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawerContent from './components/CustomDrawerContent';
import WideCustomDrawerContent from './components/WideCustomDrawerContent';
import {useFonts} from 'expo-font'
import NoteDetailScreen from './screen/NoteDetailScreen';
import screenData from './data/screendata';
import HomeScreen from './screen/HomeScreen';
import NotesProvider, { NotesContext } from './context/NotesProvider';
import { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyRichTextEditor from './components/MyRichTextEditor';
import { MenuProvider } from 'react-native-popup-menu';
import {Provider} from "react-native-paper";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// const {width} = Dimensions.get('window');
export default function App() {
  const DrawerNavigation = () =>{
    const {screens, addFolder, folders, forceUpdate, deleteFolder} = useContext(NotesContext);

    return <Drawer.Navigator drawerContent={props => <CustomDrawerContent deleteFolder={deleteFolder} forceUpdate={forceUpdate} folders={folders} addFolder={addFolder} screenData={[...screenData, ...screens]} {...props}/>} screenOptions={
        { 
          drawerType:'slide', 
          swipeEdgeWidth: 80 ,
          headerStyle:{
            backgroundColor: 'transparent'
          },
          headerTitleStyle:{fontSize: 24, fontFamily:'nunito-bold'}, 
          headerShadowVisible:false,
          headerShown:false
        }
      }
      >
      {[...screenData, ...screens]?.map((screen, id) =>{
        return <Drawer.Screen key={id} name={screen?.name} component={HomeScreen} options={{headerTitle:screen.title, drawerLabel:screen.title}}/>
      })}
    </Drawer.Navigator>
  }
  
  const WideDrawerNavigation = ({route}) =>{
    const {screens, addFolder, fetchData, folders, forceUpdate, deleteFolder} = useContext(NotesContext);
    useEffect(() =>{
      fetchData()
    },[])
    // console.log(screens)
    return <Drawer.Navigator drawerContent={props => <CustomDrawerContent deleteFolder={deleteFolder} forceUpdate={forceUpdate} folders={folders}  addFolder={addFolder} screenData={[...screenData, ...screens]} {...props}/>} screenOptions={
      { 
        drawerType:'permanent', 
        swipeEdgeWidth: 80 ,
        headerStyle:{
          backgroundColor: 'transparent',
        },
        headerTitleStyle:{fontSize: 24, fontFamily:'nunito-bold'}, 
        headerShadowVisible:false,
        headerShown: false,
        headerLeft: () => <></>
      }
      }
      >
      {[...screenData, ...screens].map((screen, id) =>{
        return <Drawer.Screen key={id} name={screen?.name} component={HomeScreen} options={{headerTitle:screen?.title, drawerLabel:screen?.title}}/>
      })}
    </Drawer.Navigator>
  }
  const {width} = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    'quicksand': require('./assets/fonts/Quicksand/static/Quicksand-Regular.ttf'),
    'quicksand-bold': require('./assets/fonts/Quicksand/static/Quicksand-Bold.ttf'),
    'nunito':require('./assets/fonts/Nunito/static/Nunito-Regular.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito/static/Nunito-Bold.ttf'),
    'nunito-semibold': require('./assets/fonts/Nunito/static/Nunito-SemiBold.ttf'),
    'roboto': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf')
  });
  if(!fontsLoaded){
    return null
  }
  // AsyncStorage.clear()
  return (
    <>
      <StatusBar backgroundColor={'transparent'}/>
    <NotesProvider>
      <GestureHandlerRootView>
      <Provider>
        <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{headerShown: false, customProp: 'hello'}} component={width >= 800 ? WideDrawerNavigation : DrawerNavigation} name='Drawer'/>
            <Stack.Screen component={NoteDetailScreen} name='NoteDetails'/>
          </Stack.Navigator>
        </NavigationContainer>
        </MenuProvider>
      </Provider>
      </GestureHandlerRootView>
    </NotesProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
