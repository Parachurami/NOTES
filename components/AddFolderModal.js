import { Dimensions, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import PrimaryButton from './PrimaryButton';

const AddFolderModal = ({forceUpdate, folders, addFolder, visible, setVisible}) => {
    const closeModal = () => setVisible(false);
    const [folderName, setFolderName] = useState(!folders?.length ? 'Folder 1' : `Folder ${folders.length + 1}`);
    const [duplicateError, setDuplicateError] = useState(false);

    const inputHandler = (text) =>{
        setFolderName(text);
    }

    const closeModalHandler = () => {
        forceUpdate()
        closeModal();
        setFolderName(!folders?.length ? 'Folder 1' : `Folder ${folders.length + 1}`)
    }

    const modalCloseHandler = () =>{
        closeModal();
        forceUpdate();
    }

    const addFolderHandler = () =>{
        addFolder(folderName);
        setFolderName(!folders?.length ? 'Folder 1' : `Folder ${folders.length + 1}`);
        forceUpdate()
        closeModal();
    }

    useLayoutEffect(() =>{
        if(folders?.find((folder) => folder?.title?.trim() === folderName.trim())){
            setDuplicateError(true);
        }else{
            setDuplicateError(false);
        }
        
    },[folderName, folders])

    const {height, width} = useWindowDimensions();
  return (
    <Modal onRequestClose={closeModal} visible={visible} animationType='fade' transparent={true}>
        <Pressable style={styles.modalBackground} onPress={modalCloseHandler}>
            <KeyboardAvoidingView style={[styles.modalView, height > width ? {width: height * 0.3,} : {width: width * 0.3}]}>
                <Text style={styles.modalLabel}>Folder Name</Text>
                <View style={[{borderRadius: 5, backgroundColor:'#F5F5F5', flexDirection: 'row', alignItems: 'center'}, duplicateError ? {borderColor: 'red', borderWidth: 1} : {}]}>
                    {/* <Feather style={{marginLeft: 10}} name='search' size={20} color={'grey'}/> */}
                    <TextInput onChangeText={inputHandler} style={{padding: 8, fontFamily:'quicksand', flex: 1}} value={folderName}/>
                </View>
                {duplicateError && <Text style={styles.errorMessage}>Name Already Exists</Text>}
                <View style={styles.bottomBtns}>
                    <View style={{flex: 1}}>
                        <PrimaryButton style={{alignItems: 'center', justifyContent: 'center'}} onPress={closeModalHandler} title='Cancel' icon={''} fontStyle={styles.buttonFont}/>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={{flex: 1}}>
                        <PrimaryButton disabled={duplicateError ? true : false} onPress={addFolderHandler} style={{alignItems: 'center', justifyContent: 'center'}} title='Save' icon={''} fontStyle={styles.buttonFont}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Pressable>
    </Modal>
  )
}

export default AddFolderModal

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        width: 50,
        backgroundColor: 'yellow'
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        elevation: 5,
        height: 230,
        width: height * 0.3,
        // position: 'fixed',
    },
    modalLabel:{
        fontSize: 18,
        fontFamily:'quicksand-bold',
        marginBottom: 12
    },
    bottomBtns:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        gap: width / 40,
        marginTop: 30,
        width: '100%'
        
    },
    separator:{
        width: 1,
        height: 15,
        borderWidth: 0.5,
        borderColor: 'black',

    },
    buttonFont:{
        fontFamily: 'quicksand-bold', 
    },
    errorMessage:{
        fontSize: 10,
        color: 'red',
        margin: 3
    }
})