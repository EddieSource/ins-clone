import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, FlatList, Button } from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux'
import { clearData } from '../../redux/actions'

 
const Profile = (props) => {
    const [userPosts, setUserPosts] = useState([])
    const [user, setUser] = useState(null)
    const [following, setFollowing] = useState(false)
    
    useEffect(() => {
        const { currentUser, posts } = props
        if(props.route.params.uid === firebase.auth().currentUser.uid){
            setUser(currentUser)
            setUserPosts(posts)
        }
        else {
            firebase.firestore()
            .collection("users")
            .doc(props.route.params.uid)
            .get()
            .then((snapshot) => {
                // if(snapshot.exists) returns false, can try
                if(snapshot.exists){
                    setUser(snapshot.data())
                }
                else {
                    console.log('does not exist')
                }
            })             
        }

        firebase.firestore()
            .collection("post")
            .doc(props.route.params.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data()
                    const id = doc.id; 
                    return{id, ...data}
                })
                setUserPosts(posts)
        })

        if(props.following.indexOf(props.route.params.uid) > -1){
            // the current user follows search user
            setFollowing(true); 
        } else {
            setFollowing(false); 

        }
    }, [props.route.params.uid, props.following])

    if(user === null) {
        return <View />
    }

    const onFollow = () => {
        firebase.firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .set({})
    }

    const onUnfollow = () => {
        firebase.firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .delete()
    }

    const onLogout = () => {
        // props.clearData()

        
        firebase.auth().signOut()
    }

    return(
        <View style={styles.container}>

            <View style={styles.containerInfo}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>

                {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                    <View>
                        {following ? (
                            <Button 
                                title="Following"
                                onPress={() => onUnfollow()}
                            />
                        ):(
                            <Button
                                title="Follow"
                                onPress={() => onFollow()}
                            />
                        )}
                    </View>
                ) :                  
                <Button
                    title="Logout"
                    onPress={() => onLogout()}
                />}

            </View>

            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({item})=>{
                        return(
                            <View style = {styles.containerImage}>
                                <Image 
                                    style={styles.image}
                                    source={{uri: item.downloadURL}}
                                />
                            </View>
                        )
                    }}
                />
            </View>
        </View>

        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    containerInfo: {
        margin: 20
    }, 
    containerGallery: {
        flex: 1
    }, 
    image: {
        flex: 1, 
        aspectRatio: 1/1
    }, 
    containerImage: {
        flex: 1/3
    }

})

const mapStateToProps = (store) => {
    return { 
        currentUser: store.userState.currentUser, 
        posts: store.userState.posts, 
        following: store.userState.following, 

        userState: store.userState, 
        usersState: store.usersState
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({ clearData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)