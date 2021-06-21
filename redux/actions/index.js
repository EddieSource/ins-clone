import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, USERS_DATA_STATE_CHANGE } from '../constants/index'
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
                                
                for ( let i = 0; i < following.length; i++){
                    dispatch(fetchUsersData(following[i])); 
                }
            })
    })
}


const fetchUsersFollowingPosts = (uid) => {
    return((dispatch, getState) => {
        firebase.firestore()
            .collection("post")
            .doc(uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                // if(snapshot.exists) returns false, can try
                const uid = snapshot.query.EP.path.segments[1]
                console.log({snapshot, uid})
                const user = getState().usersState.users.find(el => el.uid)
                
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data()
                    const id = doc.id; 
                    return{id, ...data, user}
                })

                console.log(posts)
                dispatch({type: USERS_POSTS_STATE_CHANGE, posts: posts})
                console.log(getState())
            })
    })
}


export function fetchUsersData(uid){
    return((dispatch, getState) => {
        // see if some of the usesState.users match the passing in uid
        const found = getState().usersState.users.some(elem => elem.uid === uid)
        if(!found){
            firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                // if(snapshot.exists) returns false, can try
                if(snapshot.exists){
                    let user = snapshot.data(); 
                    user.uid = snapshot.id; 

                    dispatch({type: USERS_DATA_STATE_CHANGE, user: user})
                    dispatch(fetchUsersFollowingPosts(user.id)); 
                }
                else {
                    console.log('does not exist')
                }
            })
        }
    })
}

export { fetchUser, fetchUserPosts, fetchUserFollowing, fetchUsersFollowingPosts }
