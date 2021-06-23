import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, FlatList, Button } from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux' 

 
const Feed = (props) => {
    const[posts, setPosts] = useState([])
    // console.group('.......')
    // console.log(props.following)
    // console.log('usersFollowingLoaded:')
    // console.log(props.usersFollowingLoaded)
    useEffect(() => {
        let posts = []
        if(props.usersFollowingLoaded == props.following.length){
            for(let i = 0; i < props.following.length; i++){
                // console.log(props.users[i].uid)
                const user = props.users.find(el => el.uid === props.following[i])  
                // console.log("user")
                // console.log(user)
                if(user != undefined){
                    // console.log("user.posts")
                    // console.log(user.posts)
                    posts = [...posts, ...user.posts]
                }
            }

            // pass a comparator in
            posts.sort((post1, post2) => {
                // small time presents first
                return -(post1.creation - post2.creation)
            })

            setPosts(posts)
        }
    }, [props.usersFollowingLoaded])

    // console.log('props.users: ')
    // console.log(props.users)
    
    // console.log(props.following[0])
    

    // console.log('posts: ')
    // console.log(posts)
    return(
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({item})=>{
                        // console.log('item')
                        // console.log(item)
                        return(
                            <View style = {styles.containerImage}>
                                <Text style = {styles.container}>{item.user.name}</Text>
                                <Image 
                                    style={styles.image}
                                    source={{uri: item.downloadURL}}
                                />
                                <Button
                                    title = 'View Comments'
                                    onPress = {() => props.navigation.navigate('Comment', 
                                    { postId: item.id, uid: item.user.uid})
                                
                                }>   
                                </Button>
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
        users: store.usersState.users, 
        usersFollowingLoaded: store.usersState.usersFollowingLoaded, 
        following: store.userState.following
    }
}

export default connect(mapStateToProps, null)(Feed)