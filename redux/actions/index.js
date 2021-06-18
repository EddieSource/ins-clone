import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE } from '../constants/index'
import firebase from 'firebase'


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
                dispatch({type: USER_FOLLOWING_STATE_CHANGE, following: following})
            })
    })
}



export { fetchUser, fetchUserPosts, fetchUserFollowing }
