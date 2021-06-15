import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE } from '../constants/index'
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
                console.log('.......')
                console.log(posts)
                dispatch({type: USER_POSTS_STATE_CHANGE, posts: posts})
            })
    })
}



export { fetchUser, fetchUserPosts }
