import React from 'react'
import { View, Text, Image, StyleSheet, FlatList, Button } from 'react-native'
import firebase from 'firebase'
import { connect } from 'react-redux' 

const Profile = ({currentUser, posts}) => {
    return(
        <View style={styles.container}>

            <View style={styles.containerInfo}>
                <Text>{currentUser.name}</Text>
                <Text>{currentUser.email}</Text>
            </View>

            <Button title="logout" onPress={async () => 
                {
                    console.log("start")
                    await firebase.auth().signOut
                    console.log('done')
                }
            }/>

            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={posts}
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
        flex: 1, 
        marginTop: 100
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
        posts: store.userState.posts
    }
}

export default connect(mapStateToProps, null)(Profile)

