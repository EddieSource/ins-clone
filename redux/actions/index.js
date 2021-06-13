import { USER_STATE_CHANGE } from '../constants/index'
import firebase from 'firebase'

const fetchUser = () => {
    return((dispatch) => {
        firebase.firestore()
            .collection("user")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                // if(snapshot.exists) returns false, can try
                if(snapshot){
                    console.log('______')
                    console.log(snapshot)
                    console.log(firebase.auth().currentUser.uid)
                    console.log(snapshot.data())
                    dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
                }
                else {
                    console.log('does not exist')
                }
            })
    })
}

export {fetchUser}
