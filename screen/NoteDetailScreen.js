import {BackHandler, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react'
import {useNavigation, useRoute} from '@react-navigation/native'
import {Feather, Ionicons} from '@expo/vector-icons';
import MyRichTextEditor from '../components/MyRichTextEditor';
import {NotesContext} from '../context/NotesProvider';

const NoteDetailScreen = () => {
    const {saveNote, folders, editNote} = useContext(NotesContext);
    const route = useRoute();
    const navigation = useNavigation();
    const routeName = route.name;
    const {prevRouteName, data} = route.params;
    const [newNoteTitle, setNewNoteTitle] = useState(data? data?.title :'');
    const [noteContent, setNoteContent] = useState('');
    const [isEdit, setIsEdit] = useState(true);
    const [forInput, setForInput] = useState(false);
    const [forEdit, setForEdit] = useState(false);
    const setTitle = (text) =>{
        setNewNoteTitle(text)
    }

    // console.log(prevRouteName)
    const editHandler = () =>{
        const date = getDate();
        editNote(data.id, prevRouteName, newNoteTitle, noteContent, date);
        setIsEdit(false);
    }

    const setContent = (text) =>{
        setNoteContent(text);
    }

    const saveHandler = () =>{
        const date = getDate();
        saveNote(prevRouteName, newNoteTitle, noteContent, date);
        setIsEdit(false);
    }

    const getDate = () =>{
        const date = Date.now();
        return formatDate(date);
    }

    const formatDate = ms =>{
        const date = new Date(ms);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hrs = date.getHours()
        const minutes = date.getMinutes();
        console.log(month);
        return `${day} ${formatMonth(month)} ${year}, ${hrs}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    const formatMonth = month =>{
        switch(month){
            case 0:
                return 'January';
            case 1:
                return 'February';
            case 2:
                return 'March';
            case 3:
                return 'April';
            case 4:
                return 'May';
            case 5:
                return 'June';
            case 6:
                return 'July';
            case 7:
                return 'August';
            case 8:
                return 'September';
            case 9:
                return 'October';
            case 10:
                return 'November';
            case 11:
                return 'December';
        }
    }
    const gobackHandler = () =>{
        data ? editHandler() : saveHandler();
        navigation.goBack();
        setNewNoteTitle('New note');

    }
    let title = data ? data.title : newNoteTitle

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          // Handle back button press
          // For example, you can show an alert or navigate back
          // Return true to prevent default behavior (e.g., exiting the app)
          navigation.goBack();
          console.log('back pressed')
          return true;
        });

        // Cleanup function
        return () => backHandler.remove();
      }, [navigation]);

    const setInputHandler = () =>{
        setForInput(prevState => !prevState);
        setForEdit(true);
    }

    const titleTextChangeHandler = (text) =>{
        setNewNoteTitle(text);
    }

    useLayoutEffect(() =>{
        navigation.setOptions({
            header:() => {
                return(
                    !forInput ? <View style={styles.headerContainer}>
                        <View style={styles.headerStyle}>
                            <Pressable style={{marginRight: 20}} onPress={() => navigation.goBack()}>
                                <Ionicons name={'chevron-back'} size={24}/>
                            </Pressable>
                            <Pressable style={{width:'90%'}} onPress={setInputHandler}>
                                <Text style={{fontSize: 24, fontFamily:'nunito',}} numberOfLines={1} lineBreakMode='tail'>{ newNoteTitle.trim() !== "" ? newNoteTitle : !data || data.title.trim() === "" ? <Text style={{color:'grey'}}>{"Title"}</Text> : data?.title }</Text>
                            </Pressable>
                            <Pressable disabled={noteContent?.length < 1} style={{marginLeft: -32}} onPress={gobackHandler}>
                                <Feather name='save' size={24} color={noteContent?.length < 1 ? 'grey' : 'black'}/>
                            </Pressable>
                        </View>
                    </View> : <View style={[styles.headerContainer, {alignItems:'flex-start'}]}>
                        <Pressable style={{alignItems: 'center', justifyContent: 'center'}} onPress={setInputHandler}>
                            <Ionicons name={'chevron-up'} size={24}/>
                        </Pressable>
                        <View style={{borderRadius: 5, backgroundColor:'transparent', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12}}>
                            <TextInput value={newNoteTitle} onChangeText={titleTextChangeHandler} style={{padding: 3, fontFamily:'nunito', flex: 1, fontSize: 30,}} multiline numberOfLines={2} cursorColor={'black'} placeholder='Title'/>
                        </View>
                    </View>
                );
            }
        })
    })

    // useEffect(()=>{
    //     fetchData();
    // })
    const lightColor = '#F5F5F5';
    const setEdit = value => setIsEdit(value)
    const focusHandler = () =>{
        setForInput(false)
    }
  return (
    <View style={styles.container}>
        <View style={styles.textEditor}>
            <MyRichTextEditor setInput={focusHandler} date={data?.date} setIsEdit={setEdit} isEdit={isEdit} content={data?.content} title={newNoteTitle} setContent={setContent}/>
        </View>
    </View>
  )
}

export default NoteDetailScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    headerContainer:{
        marginTop: 50,
        paddingBottom: 15,
        marginHorizontal: 25,
        borderBottomColor: '#D6D6D6',
        borderBottomWidth: 1,
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
    },
    headerStyle: {
        flexDirection: 'row',
        // gap: 20,
        alignItems: 'center',

    },
    prevRouteStyle:{
        fontSize: 24,
        fontFamily:'nunito-bold',
        opacity: 0.7
    },
    textEditor:{
        paddingTop: 5,
        height: '100%',

    },
    inputContainer:{
        marginTop: 50
    }
})