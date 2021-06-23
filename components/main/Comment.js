import React, { useEffect, useState } from 'react'
import {View, Text, FlatList, Button, TextInput} from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')

const Comment = (props) => {
    const [comments, setComments] = useState([])    // spcific to the current post
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {
        if(props.route.params.postId !== postId){
            firebase.firestore()
            .collection('post')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .get()
            .then((snapshot) => {
                let comments = snapshot.docs.map(doc => {
                    const data = doc.data()
                    const id = doc.id
                    return {id, ...data}
                })
                setComments(comments)
            })

        }
        setPostId(props.route.params.postId)

    }, [props.route.params.postId])

    const onCommentSend = () => {
        firebase.firestore()
        .collection('post')
        .doc(props.route.params.uid)
        .collection('userPosts')
        .doc(props.route.params.postId)
        .collection('comments')
        .add({
            creator: firebase.auth().currentUser.uid, 
            text: text
        })

    }

    return(
        <View>
            <FlatList 
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.text}</Text>
                    </View>

                )}
            />
            <View>
                <TextInput 
                    placeholder='write a comment...'
                    onChangeText={(text) => setText(text)}/>
                <Button 
                    title='Send'
                    onPress={() => onCommentSend()}/>
            </View>
        </View>

    )
}

export default Comment