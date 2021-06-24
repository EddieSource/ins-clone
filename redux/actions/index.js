import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_LIKES_STATE_CHANGE, CLEAR_DATA } from '../constants/index'
import firebase from 'firebase'
require('firebase/firestore')

const clearData = () => {
    console.log('clearData1') 
    return((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}

const fetchUser = () => {
    return((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                // if(snapshot.exists) returns false, can try
                if(snapshot.exists){
                    dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
                }
                else {
                    console.log('does not exist')
                }
            })
    })
}

const fetchUserPosts = () => {
    return((dispatch) => {
        firebase.firestore()
            .collection("post")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                // if(snapshot.exists) returns false, can try
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data()
                    const id = doc.id; 
                    return{id, ...data}
                })
                dispatch({type: USER_POSTS_STATE_CHANGE, posts: posts})
            })
    })
}

const fetchUserFollowing = () => {
    return((dispatch) => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .onSnapshot((snapshot) => {
                // if(snapshot.exists) returns false, can try
                // it's a listner, each time the collection changes we get()
                let following = snapshot.docs.map(doc => {
                    const id = doc.id; 
                    return id
                })
                console.log("following: ")
                console.log(following)
                dispatch({type: USER_FOLLOWING_STATE_CHANGE, following: following})
                             
                for ( let i = 0; i < following.length; i++){
                    dispatch(fetchUsersData(following[i], true)); 
                }
            })
    })
}


export function fetchUsersData(uid, getPosts){
    return((dispatch, getState) => {
        // see if some of the usesState.users match the passing in uid
        console.log("current usersState.users: ")
        console.log(getState().usersState.users)
        const found = getState().usersState.users.some(elem => elem.uid === uid)
        // if the uid is not in our array
        if(!found){
            firebase.firestore()
            .collection("users")
            .doc(uid)
            .get()
            .then((snapshot) => {
                // if(snapshot.exists) returns false, can try
                if(snapshot.exists){
                    let user = snapshot.data(); 
                    user.uid = snapshot.id; 

                    dispatch({type: USERS_DATA_STATE_CHANGE, user: user})

                }
                else {
                    console.log('does not exist')
                }
            })
            if(getPosts){
                dispatch(fetchUsersFollowingPosts(uid)); 
            }
        }
    })
}

const fetchUsersFollowingPosts = (uid) => {
    console.log('....')
    console.log(uid)
    return((dispatch, getState) => {
        firebase.firestore()
            .collection("post")
            .doc(uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                // if(snapshot.exists) returns false, can try
                try {const uid = snapshot.docs[0].ref.path.split('/')[1]
                console.log('.......')
                console.log(uid)
                const user = getState().usersState.users.find(el => el.uid === uid)
                
                // attach the post of the user to the founded user
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data()
                    const id = doc.id; 
                    return{id, ...data, user}
                })

                console.log(posts)
                console.log('posts done')
                
                for(let i = 0; i < posts.length; i++){
                    console.log(posts[i].id)
                    dispatch(fetchUsersFollowingLikes(uid, posts[i].id))
                }
                dispatch({type: USERS_POSTS_STATE_CHANGE, posts: posts, uid: uid})
                console.log(getState())
                }
                finally {}
            })
    })
}


const fetchUsersFollowingLikes = (uid, postId) => {
    console.log('uid: ')
    console.log(uid)
    console.log('postid: ')
    console.log(postId)
    return((dispatch, getState) => {
        firebase.firestore()
            .collection("post")
            .doc(uid)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot((snapshot) => {
                // if(snapshot.exists) returns false, can try
                console.log('likeHandler')
                // const postId = snapshot.ZE.path.segments[3]
                console.log('impossible postId')
                console.log(postId)
                let currentUserLike = false; 
                if(snapshot.exists){
                    currentUserLike = true; 
                }

                dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike})
            })
    })
}


export { fetchUser, fetchUserPosts, fetchUserFollowing, fetchUsersFollowingPosts, fetchUsersFollowingLikes, clearData }
