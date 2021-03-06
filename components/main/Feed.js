import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Button,
  RefreshControl,
} from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import {
  fetchUserFollowing,
  resetFollowingLoad,
} from '../../redux/actions/index'
const Feed = (props) => {
  const [posts, setPosts] = useState([])
  // console.group('.......')
  // console.log(props.following)
  // console.log('usersFollowingLoaded:')
  // console.log(props.usersFollowingLoaded)
  useEffect(() => {
    // console.log('feed')
    // console.log('afterClear')
    // console.log(props.userState)
    // console.log('.....')
    // console.log(props.usersState)

    if (
      props.usersFollowingLoaded == props.following.length &&
      props.following.length !== 0
    ) {
      // pass a comparator in
      props.feed.sort((post1, post2) => {
        // small time presents first
        return -(post1.creation - post2.creation)
      })

      setPosts(props.feed)
      // console.log('props.feed: ')
      // console.log(props.feed)
      // console.log('posts: ')a
      // console.log(posts)
    }

    if (props.following.length == 0) setPosts([])
  }, [props.usersFollowingLoaded, props.feed])

  // console.log('props.users: ')
  // console.log(props.users)

  // console.log(props.following[0])

  // console.log('posts: ')
  // console.log(posts)
  const onLikepress = (uid, postId) => {
    firebase
      .firestore()
      .collection('post')
      .doc(uid)
      .collection('userPosts')
      .doc(postId)
      .collection('likes')
      .doc(firebase.auth().currentUser.uid)
      .set({})
  }

  const onDisLikepress = (uid, postId) => {
    firebase
      .firestore()
      .collection('post')
      .doc(uid)
      .collection('userPosts')
      .doc(postId)
      .collection('likes')
      .doc(firebase.auth().currentUser.uid)
      .delete({})
  }

  const [isRefreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    props.fetchUserFollowing()
    setTimeout(() => {
      setRefreshing(false)
    }, 3000)
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          //   refreshControl={
          //     <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          //   }
          renderItem={({ item }) => {
            // console.log('item')
            // console.log(item)
            return (
              <View style={styles.containerImage}>
                <Text style={styles.container}>{item.user.name}</Text>
                <Image
                  style={styles.image}
                  source={{ uri: item.downloadURL }}
                />
                {item.currentUserLike ? (
                  <Button
                    title="Dislike"
                    onPress={() => onDisLikepress(item.user.uid, item.id)}
                  />
                ) : (
                  <Button
                    title="Like"
                    onPress={() => onLikepress(item.user.uid, item.id)}
                  />
                )}
                <Button
                  title="View Comments"
                  onPress={() =>
                    props.navigation.navigate('Comment', {
                      postId: item.id,
                      uid: item.user.uid,
                    })
                  }
                ></Button>
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
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
})

const mapStateToProps = (store) => {
  return {
    currentUser: store.userState.currentUser,
    feed: store.usersState.feed,
    posts: store.userState.posts,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,
    following: store.userState.following,

    userState: store.userState,
    usersState: store.usersState,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchUserFollowing: () => dispatch(fetchUserFollowing()),
    resetFollowingLoad: () => dispatch(resetFollowingLoad()),
  }
}
export default connect(mapStateToProps, mapDispatch)(Feed)
