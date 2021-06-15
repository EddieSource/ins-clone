import React, {useState} from 'react';
import { View, Button, TextInput, Image } from 'react-native'

import firebase from 'firebase'
require("firebase/firestore")
require("firebase/firebase-storage")

const Save = (props, {navigation}) => {
    const [caption, setCaption] = useState("")

    const uploadImage = async () => {
        const uri = props.route.params.image
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
        console.log('1st')
        console.log(uri)
        const response = await fetch(uri)
        console.log('2nd')
        const blob = await response.blob()  // returns a file-like object
        console.log('3rd')
    
        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob)
    
        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }
    
        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot)
                console.log(snapshot)
            })
        }
    
        const taskError = snapshot => {
            console.log(snapshot)
        }
    
        task.on("state_change", taskProgress, taskError, taskCompleted)
    }
    
    const savePostData = (downloadURL) => {
        firebase.firestore().collection('post')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add( {
                downloadURL, 
                caption, 
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then(()=>{
                props.navigation.popToTop()
            })
    }

    return (
        <View>
            <Image source={{uri: props.route.params.Image}}/>
            <TextInput
                placeholder="Write a Caption ..."
                onChangeText={(captions) => setCaption(caption)}
            />
            <Button title="Save" onPress={() => uploadImage()} />

        </View>
    )
}

export default Save;