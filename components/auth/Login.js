import React, { useState } from 'react'
import { View, Button, TextInput } from 'react-native'
import firebase from 'firebase'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSignIn = () => {
       
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res)
            // props.navigation.pop()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <View style={{
            flex: 1, 
            justifyContent: "center"
        }}>
            <TextInput
                placeholder='email'
                onChangeText={
                    (input) => setEmail(input)
                }
            />
            <TextInput
                placeholder='password'
                secureTextEntry={true}
                onChangeText={
                    (input) => setPassword(input)
                }
            />
            <Button title="Sign In" onPress={() => onSignIn()}/>
        </View>
        )
    
}

export default Login