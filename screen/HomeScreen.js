import {
    BackHandler,
    Dimensions,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text, Touchable,
    TouchableOpacity, TouchableWithoutFeedback,
    useWindowDimensions,
    View
} from 'react-native'
import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import screenData from '../data/screendata';
import { NotesContext } from '../context/NotesProvider';
import DropdownMenu from '../components/DropdownMenu';
import SearchComponent from '../components/SearchComponent';
import FloatingAddButton from '../components/FloatingAddButton';
import {EvilIcons, Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {COLORS} from "../assets/misc/colors";
import Modal from "react-native-modal"
let noneSelectedIcon = <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color={COLORS.alternateColor}/>;
let selectedIcon = <MaterialCommunityIcons name="checkbox-marked-circle" size={24} color={COLORS.alternateColor} />
const HomeScreen = () => {
    const {screens, folders, fetchData, deleteNote} = useContext(NotesContext);
    const route = useRoute();
    const routeName = route.name;
    const notes = folders.find((item) => item.title.replace(' ', '') === routeName);
    const navigation = useNavigation();
    const prevTitle = [...screenData, ...screens].find((screen) => screen.name === routeName).title;
    const [noteTiles, setNoteTiles] = useState([]);
    const [selected, setSelected] = useState([]);
    const [deleteState, setDeleteState] = useState(false);
    const [selectedState, setSelectedState] = useState(false);
    const pressHandler = (data) =>{
        navigation.navigate('NoteDetails', {
            prevRouteName: prevTitle,
            data: data
        })
    }

    const newNoteHandler = () =>{
        setDeleteState(false)
        navigation.navigate('NoteDetails', {prevRouteName: prevTitle});
    }

    useEffect(()=>{
        notes ? setNoteTiles(notes?.data) : setNoteTiles([])
        console.log('first')
        // console.log(noteTiles)
    },[notes?.data])
    // console.log(noteTiles)
    // console.log(notes)

    const searchTextHandler = (text) =>{
        setNoteTiles(notes?.data.filter((note) => note.title?.toLowerCase().includes(text?.toLowerCase()) || note.content?.toLowerCase().includes(text?.toLowerCase()) || note.date?.toLowerCase().includes(text?.toLowerCase())))
    }

    const longPressHandler = (id) =>{
        // console.log(id)
        setDeleteState(true)
        checkHandler(id);
        openModal()
        // console.log(selected)
    }

    const isSelected = (id) =>{
        if(selected.includes(id))
            return true;
        else
            return false;
    }

    const checkHandler = (id) =>{
        if(selected.includes(id)){
            setSelected((prevSate) => prevSate.filter((item) => item !== id))
            setSelectedState(false);
        }
        else
            setSelected([...selected, id])
        // setSelectedState(false);
        // let currentSelected = selected;
        // setSelectedState(false);
        // setSelected(currentSelected);
    }

    const backPressHandler = () =>{
        setDeleteState(false);
        setSelected([]);
    }
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          // Handle back button press
          // For example, you can show an alert or navigate back
          // Return true to prevent default behavior (e.g., exiting the app)
            console.log('back pressed')
            backPressHandler()
            setVisible(false)
            // BackHandler.exitApp();
            return true;
        });
        
        // Cleanup function
        return () => backHandler.remove();
      }, [navigation, deleteState]);

    const lightColor = '#E0E0E0';
    const testPressHandler = () =>{
        deleteNote(selected, routeName)
        backPressHandler();
        setVisible(false);
        // console.log(found);
    }

    const selectAll = () =>{
        noteTiles.map(note => {
            if(!selected.includes(note.id))
                setSelected(prevState => [...prevState, note.id])
        });
        console.log(selected);
    }

    const deselectAll = () =>{
        setSelected([]);
    }

    const toggleSelectedState = () =>{
        if(selectedState){
            setSelectedState(false)
            deselectAll();
        }else{
            setSelectedState(true)
            selectAll()
        }

    }

    const openDrawer = () =>{
        navigation.openDrawer();
    }
    // console.log(selectedState)

    useEffect(() =>{
        if(selected.length === 0)
            setVisible(false);
        else
            setVisible(true)
    },[selected.length])
    const [isVisible, setVisible] = useState(false);

    const openModal = () => setVisible(true);
  return (
    <View style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View style={{padding: 50, alignItems: 'center', paddingTop: 84}}>
                <Text style={{fontSize: deleteState ? 27 : 38, fontFamily:'nunito-bold', marginBottom: 15, color:'#567568'}}>{deleteState && selected.length > 0 ? `${selected.length} selected` : deleteState && selected.length === 0 ? "Select Notes" : prevTitle}</Text>
                {!deleteState && <Text style={{fontSize: 14}}>{noteTiles.length} notes</Text>}
            </View>

        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <View style={{alignItems: 'center', justifyContent:'center', alignSelf:'flex-start', marginBottom: 20, borderRadius: 20, overflow:'hidden'}}>
                {!deleteState ? <TouchableOpacity onPress={openDrawer} style={{padding: 5}}>
                    <EvilIcons name='navicon' size={30}/>
                </TouchableOpacity> :
                    <TouchableOpacity onPress={toggleSelectedState} style={{padding: 5}}>
                        {selectedState ? selectedIcon : noneSelectedIcon}
                    </TouchableOpacity>}
                {deleteState && <Text>All</Text>}
            </View>
        </View>
        <SearchComponent onChangeText={searchTextHandler}/>
        <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>

            <View style={{flex: 1, height:'50%'}}>
                {noteTiles.map((item, index) =>{
                    return(
                        <View key={index} style={styles.noteContainer}>
                            <Pressable style={styles.notes} onPress={deleteState ? checkHandler.bind(this, item.id) : pressHandler.bind(this, item)} onLongPress={longPressHandler.bind(this, item.id)}>
                                {deleteState && <TouchableOpacity onPress={checkHandler.bind(this, item.id)}>
                                    {/*<Ionicons name={isSelected(item.id) ? 'radio-button-on' : 'radio-button-off'} size={24} color={*/}
                                    {/*    COLORS.alternateColor*/}
                                    {/*}/>*/}
                                    <MaterialCommunityIcons name={isSelected(item.id) ? 'checkbox-marked-circle':'checkbox-blank-circle-outline'} size={24} color={COLORS.alternateColor} />
                                </TouchableOpacity>}
                                <View>
                                    <Text style={[styles.noteDate]}>{item.date.split(" ").slice(0, 2).join(" ")}</Text>
                                    <Text style={[styles.noteTitle]}>{item.title.trim() !== "" ? item.title : "No title"}</Text>
                                    <Text numberOfLines={2} style={[styles.noteDesc]}>{item.content}</Text>
                                </View>
                            </Pressable>
                        </View>
                    );
                })}
                {/*<FlatList*/}
                {/*bouncesZoom={true}*/}
                {/*data={noteTiles}*/}
                {/*contentContainerStyle={{marginVertical: 40}}*/}
                {/*// style={}*/}
                {/*renderItem={({item, index}) =>{*/}
                {/*    return(*/}
                {/*        <View key={index} style={styles.noteContainer}>*/}
                {/*            <Pressable android_ripple={{color: "#BDC2C2"}} style={styles.notes} onPress={deleteState ? checkHandler.bind(this, item.id) : pressHandler.bind(this, item)} onLongPress={longPressHandler.bind(this, item.id)}>*/}
                {/*                {deleteState && <TouchableOpacity onPress={checkHandler.bind(this, item.id)}>*/}
                {/*                    <Ionicons name={isSelected(item.id) ? 'radio-button-on' : 'radio-button-off'} size={24}/>*/}
                {/*                </TouchableOpacity>}*/}
                {/*                <View>*/}
                {/*                    <Text style={styles.noteDate}>{item.date.split(" ").slice(0, 2).join(" ")}</Text>*/}
                {/*                    <Text style={styles.noteTitle}>{item.title.trim() !== "" ? item.title : "No title"}</Text>*/}
                {/*                    <Text numberOfLines={2} style={styles.noteDesc}>{item.content}</Text>*/}
                {/*                </View>*/}
                {/*            </Pressable>*/}
                {/*        </View>*/}
                {/*    );*/}
                {/*}}*/}
                {/*/>*/}
            </View>
        </ScrollView>
        {!deleteState && <FloatingAddButton color={'#567568'} onPress={newNoteHandler}/>}
        <View style={{zIndex: 999, width:Dimensions.get('window').width *0.6}}>
            <Modal
                isVisible={isVisible}
                onBackdropPress={() => setVisible(false)}
                backdropOpacity={0.3}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                coverScreen={false}
                // animationInTiming={1000}
                animationOutTiming={1500}
            >
                <View style={{position:'absolute', flexDirection:'row', bottom: 20, backgroundColor:'white', flex: 1, padding: 20, borderTopLeftRadius: 5, alignSelf:'center',borderTopRightRadius: 5, width:'130%'}}>
                    <TouchableOpacity onPress={testPressHandler} style={{alignItems:'center', flex: 1}}>
                        <MaterialIcons color={'#6e6c6c'} name='delete' size={20}/>
                        <Text style={{fontFamily:'quicksand-bold', color:'#6e6c6c'}}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{}} style={{alignItems:'center', flex: 1}}>
                        <MaterialCommunityIcons color={'#6e6c6c'} name='file-move' size={20}/>
                        <Text style={{fontFamily:'quicksand-bold', color:'#6e6c6c'}}>Move</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{}} style={{alignItems:'center', flex: 1}}>
                        <MaterialCommunityIcons color={'#6e6c6c'} name='content-duplicate' size={20}/>
                        <Text style={{fontFamily:'quicksand-bold', color:'#6e6c6c'}}>Duplicate</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    </View>
  )
}

export default HomeScreen
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        flex: 1,
        // backgroundColor: COLORS.azureWeb,
        zIndex: 0
    },
    title:{
        fontSize: 26,
        marginBottom: 45
    },
    addBtnContainer:{
        overflow: 'hidden', 
        borderRadius: 10, 
        backgroundColor: '#EBEBEB',
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
        fontSize: 16
    },
    noteContainer:{
        overflow: 'hidden',
        height: 100,
        borderRadius: 10,
        backgroundColor: '#EBEBEB',
        elevation: 1,
        // backgroundColor:COLORS.semiWhite,
        marginVertical: 15,
    },
    notes:{
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    noteDate:{
        fontSize: 14,
        color: '#000000A1',
        fontFamily:'nunito-bold'
    },
    noteTitle:{
        fontSize: 20,
        fontFamily:'nunito-bold'
    },
    noteDesc:{
        color: '#000000A1',
        fontFamily:'nunito-semibold'
    }
})