import { USER_STATE_CHANGE } from '../constants/index'
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

export {fetchUser}
