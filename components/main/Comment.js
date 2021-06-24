import React, { useEffect, useState } from 'react'
import {View, Text, FlatList, Button, TextInput} from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsersData } from '../../redux/actions/index'

const Comment = (props) => {
    const [comments, setComments] = useState([])    // spcific to the current post
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {
        matchUserToComment = (comments) => {
            for(let i = 0; i < comments.length; i++){
                // if the current comments has an owner
                if(comments[i].hasOwnProperty('user')){
                    continue
                }

                const user = props.users.find(x => x.uid === comments[i].creator)
                if (user == undefined) {
                    props.fetchUsersData(comments[i].creator, false)
                }
                else {
                    comments[i].user = user 
                }
                setComments(comments)
                
            }

        }


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
                // setComments(comments)
                matchUserToComment(comments)   
            })
        }

        else {
            matchUserToComment(comments)
        }

        setPostId(props.route.params.postId)
        return ()=>{}
    }, [props.route.params.postId, props.users])

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
        .then(
            ()=>props.navigation.popToTop()
        )
    }

    return(
        <View>
            <FlatList 
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({item}) => (
                    <View>
                        {item.user !== undefined ? 
                        <Text>
                            {item.user.name}: {item.text}
                        </Text>
                        : null
                        }
                        {/* <Text>{item.text}</Text> */}
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

const mapStateToProps = (store) => {
    return { users: store.usersState.users }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUsersData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Comment)