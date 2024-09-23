import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import PrimaryButton from './PrimaryButton';


const MyRichTextEditor = ({setInput,date, setIsEdit, isEdit, content, setContent}) => {
  const [noteContent, setNoteContent] = useState('');
  const contentTextChangeHandler = (text) =>{
    setNoteContent(text)
  }

  useEffect(() =>{
      setContent(noteContent)
  },[noteContent])

  useEffect(() =>{
    if(isEdit){
      setNoteContent(content)
    }
    setIsEdit(false);
  },[isEdit])
  return (
    <View style={{ flex: 1,}}>
      {/*<View style={{borderRadius: 5, backgroundColor:'#F5F5F5', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12}}>*/}
      {/*  <TextInput value={title} onChangeText={titleTextChangeHandler} style={{padding: 3, fontFamily:'nunito', flex: 1, fontSize: 30,}} multiline numberOfLines={2} cursorColor={'black'} placeholder='Title'/>*/}
      {/*</View>*/}
      {date &&
        <View>
          <Text style={styles.dateStyle}>{date}</Text>
        </View>}
      <View style={{flex: 1,}}>
        <View style={{backgroundColor:'transparent', height: '100%', paddingHorizontal: 10}}>
          <TextInput onPress={setInput} value={noteContent} onChangeText={contentTextChangeHandler} style={{padding: 8, fontFamily:'quicksand', height: '100%', fontSize: 24,}} selectionColor={'grey'} multiline cursorColor={'black'} textAlignVertical='top' placeholder='Write something😁...'/>
        </View>
      </View>
    </View>
  );
}

export default MyRichTextEditor;

const styles = StyleSheet.create({
  timeStamp:{
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    alignSelf: 'flex-end',
    marginRight: 60
  },
  timeStampLabel:{
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5
  },
  labelText:{
    fontSize: 18,
    fontFamily: 'nunito-bold',
  },
  dateStyle:{
    fontFamily: 'nunito-bold',
    color:'grey',
    marginLeft: 20
  }
});