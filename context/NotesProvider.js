import {createContext, useEffect, useState} from "react";
import data from "../data/dummy";
import screenData from "../data/screendata";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import data from "../data/dummy";
// import data from "../data/dummy";


export const NotesContext = createContext();

const NotesProvider = ({children}) =>{
    const [folders, setFolders] = useState(data);
    const [screens, setScreens] = useState([]);
    const [, updateState] = useState();
    const forceUpdate = () => updateState(Math.random());
    const [firstLoaded, setFirstLoaded] = useState(true)
    // const [found, setFound] = useState(0);

    const addFolder = async (title) =>{
        if(!folders.find((folder) => folder.title === title)){
            const folder = {id:Math.random().toString(),title: title, data:[]};
            const updatedFolders = [...folders, folder];
            setFolders(updatedFolders);
    
            const screen = {name:title.replaceAll(' ', ''), title:title, isFolder: true};
            const updatedScreens = [...screens, screen]
            
            setScreens(updatedScreens)
            let data = {
                screens: updatedScreens,
                folders: updatedFolders
            };
            try {
                await AsyncStorage.setItem('notes', JSON.stringify(data));
                console.log('updated')
                console.log('done')
            } catch (error) {
                console.log(error)

            }
        }else{
            console.log(folders.find((folder) => folder.title === title))
        }
    };

    const editNote  = async (id, title, noteTitle, content, date) =>{
        const result = await AsyncStorage.getItem('notes');
        let folderDta = {};
        if(result !== null){
            folderDta = JSON.parse(result)
            const currentScreen = [...screenData, ...folderDta.screens].find(screen => screen.title === title).title;
            // console.log(currentScreen)
            // console.log(data.folders)
            const newData = folderDta.folders.find((folder) => folder.title === currentScreen).data.filter(d =>{
                if(d.id === id){
                    d.title = noteTitle;
                    d.content = content;
                    d.date = date;
                }
                return d
            });
            folderDta.folders.find((folder) => folder.title === currentScreen).data = newData;
            const newFolderData = folderDta;
            setFolders(newFolderData.folders);
            await AsyncStorage.setItem('notes', JSON.stringify(newFolderData));
        }
    }

    const deleteFolder = async (title) =>{
        try{
            const result = await AsyncStorage.getItem('notes');
            let data = {};
            if(result !== null){
                data = JSON.parse(result);
                const newFolders = data.folders.filter((folder) => folder.title !== title);
                setFolders(newFolders);
                const newScreens = data.screens.filter((screen) => screen.title !== title);
                setScreens(newScreens);
                console.log(newScreens);
                console.log(folders);
                const newData = {
                    screens: newScreens,
                    folders: newFolders
                };
                await AsyncStorage.setItem('notes', JSON.stringify(newData));
            }
        }catch(e){
            console.log(e)
        }

    }
    
    const fetchData = async () =>{
        let appData = {};
        try {
            const result = await AsyncStorage.getItem('notes');
            if(result !== null){
                appData = JSON.parse(result);
                setFolders(appData.folders);
                setScreens(appData.screens)
                console.log(`result: ${appData}`)
            }
            if(result === null){
                let initialData = {
                    screens: [],
                    folders: data
                }
                await AsyncStorage.setItem('notes', JSON.stringify(initialData));
                console.log('else fetch loaded!')
                setFirstLoaded(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const saveNote = async (prevRouteName, newNoteTitle, noteContent, date) =>{
        try{
            const result = await AsyncStorage.getItem('notes');
            if(result !== null){
                let data = JSON.parse(result);
                const currentScreen = [...screenData, ...data.screens].find(screen => screen.title === prevRouteName).title;
                console.log(currentScreen)
                const folderData = {
                    id: Math.random().toString(36).substring(2, 9),
                    title: newNoteTitle,
                    content: noteContent,
                    date: date
                }
                // console.log(data.folders)
                data.folders.find((folder) => folder.title === currentScreen).data.push(folderData);
                const currentData = data;
                setFolders(currentData.folders)
                await AsyncStorage.setItem('notes', JSON.stringify(currentData));
            }
        }catch(e){
            console.log(`Error: ${e}`)
        }
    }

    const editFolder = async () =>{
        try {
            const result = await AsyncStorage.getItem('notes');
            if(result !== null){
                let notesData = JSON.parse(result);

            }
        }catch (e) {
            console.log(`Error: ${e}`);
        }

    }

    const deleteNote = async (selectedItems, routeName) =>{
        try {
            const result = await AsyncStorage.getItem('notes');
            console.log(routeName)
            if(result !== null){
                let folderDta = JSON.parse(result);
                const currentScreen = [...screenData, ...folderDta.screens].find(screen => screen.name === routeName).title;
                // console.log(currentScreen)
                // console.log(data.folders)
                const newData = folderDta.folders.find((folder) => folder.title === currentScreen).data.filter(d => !selectedItems.includes(d.id));
                let foundId = folderDta.folders.find((folder) => folder.title === currentScreen).data.find(d => {
                    if (selectedItems.includes(d.id))
                        return d.id
                });
                // setFound(foundId);
                folderDta.folders.find((folder) => folder.title === currentScreen).data = newData;
                const newFolderData = folderDta;
                // console.log(newFolderData.folders)
                setFolders(newFolderData.folders);
                await AsyncStorage.setItem('notes', JSON.stringify(newFolderData));
            }
        }catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    useEffect(() =>{
        fetchData();
    },[])
    return(
        <NotesContext.Provider value={{fetchData,folders, screens, addFolder, forceUpdate, deleteFolder, saveNote, editNote, deleteNote}}>
            {children}
        </NotesContext.Provider>
    );
}

export default NotesProvider;
